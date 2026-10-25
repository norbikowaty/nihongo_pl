import { type Kanji, kanjiInfo } from "@/content/kanji";
import { lessons } from "@/content/lessons";
import type { JaText, Lesson, Seg } from "@/content/schema";
import { catalogOrder } from "@/lib/lessons";

const HAN = /\p{Script=Han}/gu;

/** Every kanji shown in a lesson, in order of first use (a word's dictionary form is not shown). */
export function kanjiIn(lesson: Lesson): string[] {
  const shown = JSON.stringify([lesson.title, lesson.steps], (key, value) => (key === "lemma" ? undefined : value));
  return [...new Set(shown.match(HAN) ?? [])];
}

export type NewKanji = Kanji & { example?: { word: string; reading: string } };

function segsOf(lesson: Lesson): Seg[][] {
  const texts: JaText[] = [];
  for (const s of lesson.steps) {
    if (s.kind === "summary") texts.push(...s.words.map((w) => w.ja));
    if (s.kind === "intro") texts.push(s.sentence.ja);
    if (s.kind === "examples") texts.push(...s.items.map((e) => e.ja));
  }
  return texts.map((t) => t.segs);
}

/** A word from the lesson with its reading, to show how the kanji is read there. */
function exampleFor(lesson: Lesson, char: string): NewKanji["example"] {
  for (const segs of segsOf(lesson)) {
    const seg = segs.find((g) => g.t.includes(char) && g.r);
    if (seg) return { word: seg.t, reading: seg.r! };
  }
  return undefined;
}

// Lessons in study order; a kanji is new in the first lesson that uses it.
const introducedIn = new Map<string, string>();
for (const item of catalogOrder) {
  const lesson = lessons.find((l) => l.id === item.id);
  if (lesson) for (const c of kanjiIn(lesson)) if (!introducedIn.has(c)) introducedIn.set(c, lesson.id);
}

/** Kanji a lesson uses for the first time in the course, with readings and a word from the lesson. */
export function newKanji(lesson: Lesson): NewKanji[] {
  return kanjiIn(lesson)
    .filter((c) => introducedIn.get(c) === lesson.id)
    .flatMap((c) => {
      const info = kanjiInfo(c);
      return info ? [{ ...info, example: exampleFor(lesson, c) }] : [];
    });
}

/** The lesson where a kanji is introduced. */
export const lessonIntroducing = (char: string) => introducedIn.get(char);
