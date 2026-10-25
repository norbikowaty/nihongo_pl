import type { Lesson } from "@/content/schema";
import { type CardState, newCard } from "@/lib/srs";
import { type Progress, ProgressSchema, type ReadingContext, type ReadingLevel } from "./schema";

export type { Progress, ReadingContext, ReadingLevel } from "./schema";

export const STORAGE_KEY = "nihongo-pl:progress";

export function emptyProgress(): Progress {
  return { version: 1, lessons: {}, cards: {}, notes: {}, settings: { reading: { pismo: 2, reszta: 1 } } };
}

export function parseProgress(raw: string | null): Progress {
  if (!raw) return emptyProgress();
  try {
    const parsed = ProgressSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function loadProgress(storage: Storage | null): Progress {
  try {
    return parseProgress(storage?.getItem(STORAGE_KEY) ?? null);
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress, storage: Storage | null): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Private mode or full storage: progress stays in memory for this visit.
  }
}

export function setLessonStep(p: Progress, lessonId: string, step: number, now: Date): Progress {
  const status = p.lessons[lessonId]?.status === "done" ? "done" : "started";
  return { ...p, lessons: { ...p.lessons, [lessonId]: { status, step, updatedAt: now.toISOString() } } };
}

export function completeLesson(p: Progress, lesson: Lesson, now: Date): Progress {
  const ids = lesson.steps.flatMap((s) => {
    if (s.kind === "summary") return s.words.map((w) => `word:${w.id}`);
    if (s.kind === "newKana") return s.chars.map((c) => `kana:${c}`);
    return [];
  });
  const cards = { ...p.cards };
  for (const id of ids) {
    if (!cards[id]) cards[id] = { card: newCard(now), updatedAt: now.toISOString() };
  }
  const steps = lesson.steps.length;
  return {
    ...p,
    cards,
    lessons: { ...p.lessons, [lesson.id]: { status: "done", step: steps, updatedAt: now.toISOString() } },
  };
}

export function setReading(p: Progress, ctx: ReadingContext, level: ReadingLevel): Progress {
  return { ...p, settings: { ...p.settings, reading: { ...p.settings.reading, [ctx]: level } } };
}

export function setNote(p: Progress, lessonId: string, text: string, now: Date): Progress {
  return { ...p, notes: { ...p.notes, [lessonId]: { text, updatedAt: now.toISOString() } } };
}

export function applyReview(p: Progress, cardId: string, card: CardState, now: Date): Progress {
  return { ...p, cards: { ...p.cards, [cardId]: { card, updatedAt: now.toISOString() } } };
}
