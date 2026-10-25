import type { Lesson } from "../schema";

export const lessons: Lesson[] = [];

export function getLesson(course: string, slug: string): Lesson | undefined {
  return lessons.find((l) => l.course === course && l.slug === slug);
}
