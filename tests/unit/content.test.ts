import { describe, expect, it } from "vitest";
import { z } from "zod";
import { courses } from "@/content/catalog";
import { hiragana, katakana } from "@/content/kana";
import { lessons } from "@/content/lessons";
import { CourseSchema, LessonSchema } from "@/content/schema";

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

  it("every lesson parses", () => {
    for (const l of lessons) expect(() => LessonSchema.parse(l)).not.toThrow();
  });
});
