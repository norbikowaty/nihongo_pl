import { shuffle } from "./random";

export type KanaItem = { kana: string; romaji: string };
/** "read": the character is shown, pick its rōmaji. "find": the rōmaji is shown, pick the character. */
export type Direction = "read" | "find";
export type Task = { item: KanaItem; dir: Direction; review: boolean };

export type Trainer = {
  queue: Task[];
  /** Options for the task at the head of the queue. */
  options: string[];
  total: number;
  done: number;
  correct: number;
  /** Characters answered wrong at least once, in the order they were missed. */
  missed: string[];
};

/** Characters from earlier lessons mixed into one session. */
export const REVIEW_COUNT = 4;
/** A wrong answer comes back after this many other questions. */
export const RETRY_GAP = 2;

export function taskOptions(task: Task, pool: KanaItem[], count: number, rand: () => number): string[] {
  const answer = task.dir === "read" ? task.item.romaji : task.item.kana;
  // Two characters can share a reading (じ and ぢ); such a pair would make two right answers.
  const others = pool.filter((p) => p.romaji !== task.item.romaji);
  const values = [...new Set(others.map((p) => (task.dir === "read" ? p.romaji : p.kana)))];
  return shuffle([answer, ...shuffle(values, rand).slice(0, count - 1)], rand);
}

function withOptions(t: Omit<Trainer, "options">, pool: KanaItem[], count: number, rand: () => number): Trainer {
  return { ...t, options: t.queue[0] ? taskOptions(t.queue[0], pool, count, rand) : [] };
}

/**
 * Every new character is asked both ways, first all "read", then all "find" mixed with a few
 * characters from earlier lessons. The order is random each time.
 */
export function startTrainer(items: KanaItem[], review: KanaItem[], count: number, rand: () => number): Trainer {
  const task = (item: KanaItem, dir: Direction, isReview = false): Task => ({ item, dir, review: isReview });
  const reads = shuffle(items, rand).map((i) => task(i, "read"));
  const old = shuffle(review, rand)
    .slice(0, REVIEW_COUNT)
    .map((i) => task(i, rand() < 0.5 ? "read" : "find", true));
  const finds = shuffle([...items.map((i) => task(i, "find")), ...old], rand);
  const queue = [...reads, ...finds];
  return withOptions({ queue, total: queue.length, done: 0, correct: 0, missed: [] }, [...items, ...review], count, rand);
}

/** Moves to the next question; a wrong answer puts the same question back a little later. */
export function answerTask(t: Trainer, ok: boolean, pool: KanaItem[], count: number, rand: () => number): Trainer {
  const [task, ...rest] = t.queue;
  if (!task) return t;
  if (ok) return withOptions({ ...t, queue: rest, done: t.done + 1, correct: t.correct + 1 }, pool, count, rand);
  const at = Math.min(RETRY_GAP, rest.length);
  const queue = [...rest.slice(0, at), task, ...rest.slice(at)];
  const missed = t.missed.includes(task.item.kana) ? t.missed : [...t.missed, task.item.kana];
  return withOptions({ ...t, queue, total: t.total + 1, done: t.done + 1, missed }, pool, count, rand);
}

export const trainerFinished = (t: Trainer) => t.queue.length === 0;
