import { allKana } from "../../kana";
import type { Exercise, Lesson, Word } from "../../schema";

type ChoiceItem = Extract<Exercise, { type: "choice" }>;

const romajiOf = (kana: string) => {
  const hit = allKana.find((k) => k.kana === kana);
  if (!hit) throw new Error(`No romaji for ${kana}`);
  return hit.romaji;
};

/** "How do you read this word?" with rōmaji options; the first option is always the right one before shuffling. */
export function readQuestion(word: Word, wrong: [string, string], why: string): ChoiceItem {
  const options = [word.ja.romaji, ...wrong];
  // Rotate by word length so the right answer is not always in the same place.
  const shift = word.ja.romaji.length % 3;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return {
    type: "choice",
    prompt: "Jak czytasz to słowo?",
    ja: { segs: word.ja.segs, romaji: "" },
    options: rotated,
    answer: rotated.indexOf(word.ja.romaji),
    why,
  };
}

type Script = "hiragana" | "katakana";

type PismoDef = {
  slug: string;
  title: string;
  minutes: number;
  chars: string[];
  /** Characters for the drill when not all of `chars` (long lessons). */
  quiz?: string[];
  words: Word[];
  questions: ChoiceItem[];
  points: string[];
};

export function pismoLesson(o: PismoDef & { script: Script; review?: string[] }): Lesson {
  const item = (kana: string) => ({ kana, romaji: romajiOf(kana) });
  const quiz = (o.quiz ?? o.chars).map(item);
  return {
    id: `pismo/${o.script}/${o.slug}`,
    course: "pismo",
    section: o.script,
    slug: `${o.script}/${o.slug}`,
    title: o.title,
    minutes: o.minutes,
    kind: "lesson",
    steps: [
      { kind: "newKana", chars: o.chars },
      {
        kind: "exercise",
        items: [{ type: "kana", items: quiz, review: (o.review ?? []).map(item), choices: 4 }],
      },
      { kind: "examples", items: o.words.map((w) => ({ ja: w.ja, pl: w.pl })) },
      { kind: "exercise", items: o.questions },
      { kind: "summary", points: o.points, words: o.words },
    ],
  };
}

/** Lessons of one script in order; each drill also repeats characters from the lessons before it. */
export function pismoCourse(script: Script, defs: PismoDef[]): Lesson[] {
  const seen: string[] = [];
  return defs.map((d) => {
    const lesson = pismoLesson({ ...d, script, review: [...seen] });
    seen.push(...d.chars);
    return lesson;
  });
}
