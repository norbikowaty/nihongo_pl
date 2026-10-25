import type { Lesson } from "../schema";
import { waDesu } from "./gramatyka/pierwsze-zdania/wa-desu";

export const lessons: Lesson[] = [waDesu];

export function getLesson(course: string, slug: string): Lesson | undefined {
  return lessons.find((l) => l.course === course && l.slug === slug);
}
