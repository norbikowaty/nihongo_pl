import { courses } from "@/content/catalog";
import { lessons } from "@/content/lessons";
import type { Course, CourseId, Lesson, Step } from "@/content/schema";
import type { Progress } from "@/lib/progress/store";

export type LessonState = "done" | "current" | "open" | "soon";

/** Every catalog item in study order: courses as listed, then sections, then items. */
export const catalogOrder = courses.flatMap((c) =>
  c.sections.flatMap((s) => s.items.map((i) => ({ course: c.id, slug: i.slug, id: `${c.id}/${i.slug}` }))),
);

const isListed = (list: Lesson[], course: CourseId, slug: string) =>
  list.some((l) => l.course === course && l.slug === slug);

export function nextLessonId(progress: Progress, list: Lesson[] = lessons): string | undefined {
  return catalogOrder.find(
    (i) => isListed(list, i.course, i.slug) && progress.lessons[i.id]?.status !== "done",
  )?.id;
}

export function lessonState(
  course: CourseId,
  slug: string,
  progress: Progress,
  list: Lesson[] = lessons,
): LessonState {
  if (!isListed(list, course, slug)) return "soon";
  const id = `${course}/${slug}`;
  if (progress.lessons[id]?.status === "done") return "done";
  return nextLessonId(progress, list) === id ? "current" : "open";
}

export function courseSummary(course: Course, progress: Progress): string {
  const ids = course.sections.flatMap((s) => s.items.map((i) => `${course.id}/${i.slug}`));
  const done = ids.filter((id) => progress.lessons[id]?.status === "done").length;
  if (done === 0) return "nie zaczęty";
  if (done === ids.length) return "ukończony";
  return `${done} / ${ids.length}`;
}

export function clampStep(raw: string | undefined | null, total: number): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, total);
}

export const PASS_RATIO = 0.8;

export function testPassed(correct: number, total: number): boolean {
  return total > 0 && correct / total >= PASS_RATIO;
}

const stepLabels: Record<Step["kind"], string> = {
  intro: "Wprowadzenie",
  newKana: "Nowe znaki",
  pattern: "Wzór",
  examples: "Przykłady",
  exercise: "Ćwiczenie",
  summary: "Podsumowanie",
};

export function stepLabel(kind: Step["kind"]): string {
  return stepLabels[kind];
}
