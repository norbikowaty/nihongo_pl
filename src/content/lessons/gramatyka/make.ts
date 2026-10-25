import type { Example, Exercise, JaText, Lesson, Seg, Word } from "../../schema";

// Short notation for grammar lessons: "わたしは{学生|がくせい}です。" — {kanji|reading} becomes furigana.

export function segs(text: string): Seg[] {
  return [...text.matchAll(/\{([^|}]+)\|([^}]+)\}|[^{]+/g)].map((m) => (m[1] ? { t: m[1], r: m[2] } : { t: m[0] }));
}

export const ja = (text: string, romaji: string): JaText => ({ segs: segs(text), romaji });

export const ex = (text: string, romaji: string, pl: string): Example => ({ ja: ja(text, romaji), pl });

type Choice = Extract<Exercise, { type: "choice" }>;
type Build = Extract<Exercise, { type: "build" }>;

/** A question; the right option is the one at `answer`. `show` puts a Japanese sentence under the prompt. */
export const choice = (prompt: string, options: string[], answer: number, why: string, show?: JaText): Choice => ({
  type: "choice",
  prompt,
  ...(show ? { ja: show } : {}),
  options,
  answer,
  why,
});

/** Put the tiles in order; `answer` lists tile indexes, tiles left out are distractors. */
export const build = (prompt: string, tiles: [text: string, romaji: string][], answer: number[]): Build => ({
  type: "build",
  prompt,
  tiles: tiles.map(([t, r]) => ({ ja: ja(t, r) })),
  answer,
});

type LessonDef = {
  section: string;
  slug: string;
  title: string;
  minutes: number;
  lead: string;
  sentence: Example;
  after: string;
  patterns: { pattern: JaText; meaning: string }[];
  explanation: string;
  examples: Example[];
  exercises: Exercise[];
  points: string[];
  words: Word[];
};

/** A grammar lesson in the five steps every lesson has. */
export function grammarLesson(o: LessonDef): Lesson {
  return {
    id: `gramatyka/${o.section}/${o.slug}`,
    course: "gramatyka",
    section: o.section,
    slug: `${o.section}/${o.slug}`,
    title: o.title,
    minutes: o.minutes,
    kind: "lesson",
    steps: [
      { kind: "intro", lead: o.lead, sentence: o.sentence, after: o.after },
      { kind: "pattern", blocks: o.patterns, explanation: o.explanation },
      { kind: "examples", items: o.examples },
      { kind: "exercise", items: o.exercises },
      { kind: "summary", points: o.points, words: o.words },
    ],
  };
}

/** The test closing a section: one step of questions, no new material. */
export function grammarTest(section: string, title: string, items: Exercise[]): Lesson {
  return {
    id: `gramatyka/${section}/test`,
    course: "gramatyka",
    section,
    slug: `${section}/test`,
    title: `Test działu: ${title}`,
    minutes: 10,
    kind: "test",
    steps: [{ kind: "exercise", items }],
  };
}
