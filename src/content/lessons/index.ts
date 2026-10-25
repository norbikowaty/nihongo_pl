import type { Lesson } from "../schema";
import { desu } from "./gramatyka/pierwsze-zdania/desu";
import { ka } from "./gramatyka/pierwsze-zdania/ka";
import { no } from "./gramatyka/pierwsze-zdania/no";
import { pierwszeZdaniaTest } from "./gramatyka/pierwsze-zdania/test";
import { waDesu } from "./gramatyka/pierwsze-zdania/wa-desu";
import { dareDoreDoko, kokoSokoAsoko, konoSonoAno, koreSoreAre, toITamtoTest } from "./gramatyka/to-i-tamto";
import { hiraganaLessons } from "./pismo/hiragana";
import { katakanaLessons } from "./pismo/katakana";

export const lessons: Lesson[] = [
  ...hiraganaLessons,
  ...katakanaLessons,
  desu,
  waDesu,
  ka,
  no,
  pierwszeZdaniaTest,
  koreSoreAre,
  konoSonoAno,
  kokoSokoAsoko,
  dareDoreDoko,
  toITamtoTest,
];

export function getLesson(course: string, slug: string): Lesson | undefined {
  return lessons.find((l) => l.course === course && l.slug === slug);
}
