import { describe, expect, it } from "vitest";
import { z } from "zod";
import { courses } from "@/content/catalog";
import { hiragana, katakana } from "@/content/kana";
import { lessons } from "@/content/lessons";
import { kanjiInfo, kanjiSets, lessonKanji, n5Kanji } from "@/content/kanji";
import { CourseSchema, LessonSchema } from "@/content/schema";
import { kanjiIn, newKanji } from "@/lib/kanji";

const baseCount = (rows: typeof hiragana) => rows.flatMap((r) => r.cells).filter(Boolean).length;

const romajiOf = (kana: string) =>
  hiragana.flatMap((r) => r.cells).find((c) => c?.kana === kana)?.romaji;

const summary = { kind: "summary", points: ["x"], words: [] } as const;
const intro = {
  kind: "intro",
  lead: "x",
  sentence: { ja: { segs: [{ t: "これ" }], romaji: "kore" }, pl: "to" },
  after: "x",
} as const;

describe("course catalog", () => {
  it("parses", () => {
    expect(() => z.array(CourseSchema).parse(courses)).not.toThrow();
  });

  it("has the six N5 courses in order", () => {
    expect(courses.map((c) => c.id)).toEqual([
      "pismo",
      "gramatyka",
      "slownictwo",
      "kanji",
      "czytanie",
      "egzamin",
    ]);
  });

  it("vocabulary topic labels sum to 771", () => {
    const vocab = courses.find((c) => c.id === "slownictwo")!;
    const total = vocab.sections
      .flatMap((s) => s.items)
      .reduce((sum, item) => sum + parseInt(item.label, 10), 0);
    expect(total).toBe(771);
  });
});

describe("kana", () => {
  it("hiragana has 46 base characters", () => {
    expect(baseCount(hiragana)).toBe(46);
  });

  it("katakana has 46 base characters", () => {
    expect(baseCount(katakana)).toBe(46);
  });

  it("romaji is Hepburn", () => {
    expect(romajiOf("し")).toBe("shi");
    expect(romajiOf("ち")).toBe("chi");
    expect(romajiOf("つ")).toBe("tsu");
    expect(romajiOf("ふ")).toBe("fu");
    expect(romajiOf("を")).toBe("o");
    expect(romajiOf("ん")).toBe("n");
  });
});

describe("lesson schema", () => {
  const lesson = {
    id: "gramatyka/x/y",
    course: "gramatyka",
    section: "x",
    slug: "x/y",
    title: "Test",
    minutes: 10,
    kind: "lesson",
    steps: [intro, intro, intro, intro, summary],
  };

  it("accepts a 5-step lesson ending with a summary", () => {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
  });

  it("rejects 4-step lesson", () => {
    expect(LessonSchema.safeParse({ ...lesson, steps: [intro, intro, intro, summary] }).success).toBe(false);
  });

  it("rejects build answer index out of range", () => {
    const exercise = {
      kind: "exercise",
      items: [
        {
          type: "build",
          prompt: "x",
          tiles: [{ ja: { segs: [{ t: "は" }], romaji: "wa" } }],
          answer: [0, 3],
        },
      ],
    };
    expect(
      LessonSchema.safeParse({ ...lesson, steps: [intro, exercise, intro, intro, summary] }).success,
    ).toBe(false);
  });

  it("every lesson is listed in the catalog", () => {
    for (const l of lessons) {
      const course = courses.find((c) => c.id === l.course)!;
      const slugs = course.sections.flatMap((s) => s.items.map((i) => i.slug));
      expect(slugs).toContain(l.slug);
    }
  });

  it("writing lessons only use kana taught so far", () => {
    const small = new Set([..."ゃゅょっャュョッ"]);
    for (const script of ["hiragana", "katakana"]) {
      const known = new Set<string>(script === "katakana" ? ["ー"] : []);
      for (const l of lessons.filter((x) => x.section === script)) {
        for (const s of l.steps) if (s.kind === "newKana") s.chars.forEach((c) => known.add(c));
        const words = l.steps.flatMap((s) => (s.kind === "summary" ? s.words : []));
        for (const word of words) {
          const chars = [...word.ja.segs.map((g) => g.t).join("")];
          // Small ゃ ゅ ょ っ come with the last lesson of each script.
          const unknown = chars.filter((c) => !known.has(c) && !(l.slug.endsWith("handakuten") && small.has(c)));
          expect(unknown, `${l.id}: ${chars.join("")}`).toEqual([]);
        }
      }
    }
  });

  it("writing lessons teach every base character once, a row or two at a time", () => {
    for (const [script, table] of [
      ["hiragana", hiragana],
      ["katakana", katakana],
    ] as const) {
      const taught = lessons
        .filter((l) => l.section === script)
        .flatMap((l) => l.steps.flatMap((s) => (s.kind === "newKana" ? s.chars : [])));
      const base = table.flatMap((r) => r.cells).filter(Boolean).map((c) => c!.kana);
      for (const k of base) expect(taught.filter((t) => t === k), k).toHaveLength(1);
      for (const l of lessons.filter((x) => x.section === script && !x.slug.includes("dakuten"))) {
        const chars = l.steps.flatMap((s) => (s.kind === "newKana" ? s.chars : []));
        expect(chars.length, l.id).toBeLessThanOrEqual(10);
      }
    }
  });

  it("kana drills repeat characters from earlier lessons only", () => {
    for (const script of ["hiragana", "katakana"]) {
      const seen = new Set<string>();
      for (const l of lessons.filter((x) => x.section === script)) {
        for (const s of l.steps) {
          if (s.kind !== "exercise") continue;
          for (const ex of s.items) if (ex.type === "kana") for (const r of ex.review ?? []) expect(seen.has(r.kana), `${l.id} ${r.kana}`).toBe(true);
        }
        for (const s of l.steps) if (s.kind === "newKana") s.chars.forEach((c) => seen.add(c));
      }
    }
  });

  it("every lesson parses", () => {
    for (const l of lessons) expect(() => LessonSchema.parse(l)).not.toThrow();
  });
});

describe("kanji in lessons", () => {
  it("every kanji used in a lesson has readings and a meaning", () => {
    for (const l of lessons) for (const c of kanjiIn(l)) expect(kanjiInfo(c), `${l.id}: ${c}`).toBeDefined();
  });

  it("a kanji is introduced at the start of the first lesson that uses it", () => {
    for (const l of lessons) {
      const fresh = newKanji(l);
      if (fresh.length === 0) continue;
      expect(l.kind, `${l.id} is a test and cannot introduce ${fresh.map((k) => k.kanji).join("")}`).toBe("lesson");
      expect(l.steps[0].kind, l.id).toBe("intro");
      for (const k of fresh) expect(k.example, `${l.id}: ${k.kanji} has no word with a reading`).toBeDefined();
    }
  });

  it("the first grammar lesson introduces its kanji, later lessons only the new ones", () => {
    const desu = lessons.find((l) => l.id === "gramatyka/pierwsze-zdania/desu")!;
    const waDesu = lessons.find((l) => l.id === "gramatyka/pierwsze-zdania/wa-desu")!;
    const no = lessons.find((l) => l.id === "gramatyka/pierwsze-zdania/no")!;
    expect(newKanji(desu).map((k) => k.kanji)).toContain("学");
    expect(newKanji(waDesu)).toEqual([]);
    expect(newKanji(no).map((k) => k.kanji)).toEqual(["車", "語", "友"]);
  });

  it("lessons and kanji sets use only N5 kanji", () => {
    for (const l of lessons) for (const c of kanjiIn(l)) expect(n5Kanji, `${l.id}: ${c}`).toContain(c);
    for (const k of [...kanjiSets.flatMap((s) => s.kanji), ...lessonKanji]) expect(n5Kanji).toContain(k.kanji);
  });

  it("words outside N5 appear only in the writing course", () => {
    for (const l of lessons)
      for (const s of l.steps)
        if (s.kind === "summary") for (const x of s.words) if (x.beyondN5) expect(l.course, `${l.id}: ${x.id}`).toBe("pismo");
  });
});
