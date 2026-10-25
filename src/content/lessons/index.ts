import type { Lesson } from "../schema";
import { desu } from "./gramatyka/pierwsze-zdania/desu";
import { ka } from "./gramatyka/pierwsze-zdania/ka";
import { no } from "./gramatyka/pierwsze-zdania/no";
import { pierwszeZdaniaTest } from "./gramatyka/pierwsze-zdania/test";
import { waDesu } from "./gramatyka/pierwsze-zdania/wa-desu";
import { czasownikiMasuTest, masen, masenka, mashita, masu } from "./gramatyka/czasowniki-masu";
import { de, niE, o, partykulyTest, toMo } from "./gramatyka/partykuly";
import { i, na, przeczenie, przeszly, przymiotnikiTest } from "./gramatyka/przymiotniki";
import { arimasuImasu, istnienieTest, liczniki, ni, pozycje } from "./gramatyka/istnienie";
import { formaTeTest, kudasai, teimasu, temoii, tworzenie } from "./gramatyka/forma-te";
import { ceny, daty, godziny, liczby, liczbyICzasTest } from "./gramatyka/liczby-i-czas";
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
  liczby,
  godziny,
  daty,
  ceny,
  liczbyICzasTest,
  masu,
  masen,
  mashita,
  masenka,
  czasownikiMasuTest,
  o,
  niE,
  de,
  toMo,
  partykulyTest,
  i,
  na,
  przeczenie,
  przeszly,
  przymiotnikiTest,
  arimasuImasu,
  ni,
  pozycje,
  liczniki,
  istnienieTest,
  tworzenie,
  kudasai,
  teimasu,
  temoii,
  formaTeTest,
];

export function getLesson(course: string, slug: string): Lesson | undefined {
  return lessons.find((l) => l.course === course && l.slug === slug);
}
