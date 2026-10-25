import type { Lesson } from "../../../schema";
import { w } from "../../words";

export const no: Lesson = {
  id: "gramatyka/pierwsze-zdania/no",
  course: "gramatyka",
  section: "pierwsze-zdania",
  slug: "pierwsze-zdania/no",
  title: "Partykuła の",
  minutes: 12,
  kind: "lesson",
  steps: [
    {
      kind: "intro",
      lead: "Partykuła の łączy dwa rzeczowniki. Najczęściej mówi, do kogo coś należy.",
      sentence: {
        ja: { segs: [{ t: "私", r: "わたし" }, { t: "の" }, { t: "本", r: "ほん" }, { t: "です。" }], romaji: "Watashi no hon desu." },
        pl: "To moja książka.",
      },
      after: "Szyk jest odwrotny niż w polskim: najpierw właściciel, potem rzecz. W 私の本 najpierw pada „ja”, a dopiero potem „książka”.",
    },
    {
      kind: "pattern",
      blocks: [{ pattern: { segs: [{ t: "A の B" }], romaji: "A no B" }, meaning: "B osoby A, B od A, B dotyczące A" }],
      explanation:
        "の pokazuje przynależność: 田中さんの車 to samochód pana Tanaki.\n\nMoże też opisywać rodzaj: 日本語の先生 to nauczyciel japońskiego, a nie nauczyciel należący do języka.\n\nPytając „czyje?”, używasz だれの: これはだれの本ですか。",
    },
    {
      kind: "examples",
      items: [
        {
          ja: { segs: [{ t: "私", r: "わたし" }, { t: "の" }, { t: "本", r: "ほん" }, { t: "です。" }], romaji: "Watashi no hon desu." },
          pl: "To moja książka.",
        },
        {
          ja: { segs: [{ t: "田中", r: "たなか" }, { t: "さんの" }, { t: "車", r: "くるま" }, { t: "です。" }], romaji: "Tanaka-san no kuruma desu." },
          pl: "To samochód pana Tanaki.",
        },
        {
          ja: { segs: [{ t: "日本語", r: "にほんご" }, { t: "の" }, { t: "先生", r: "せんせい" }, { t: "です。" }], romaji: "Nihongo no sensei desu." },
          pl: "Jestem nauczycielem japońskiego.",
        },
        {
          ja: { segs: [{ t: "これはだれの" }, { t: "本", r: "ほん" }, { t: "ですか。" }], romaji: "Kore wa dare no hon desu ka." },
          pl: "Czyja to książka?",
        },
      ],
    },
    {
      kind: "exercise",
      items: [
        {
          type: "build",
          prompt: "To mój przyjaciel.",
          tiles: [
            { ja: { segs: [{ t: "私", r: "わたし" }], romaji: "watashi" } },
            { ja: { segs: [{ t: "の" }], romaji: "no" } },
            { ja: { segs: [{ t: "友達", r: "ともだち" }], romaji: "tomodachi" } },
            { ja: { segs: [{ t: "です" }], romaji: "desu" } },
            { ja: { segs: [{ t: "は" }], romaji: "wa" } },
          ],
          answer: [0, 1, 2, 3],
        },
        {
          type: "choice",
          prompt: "Jak powiesz: nauczyciel japońskiego?",
          options: ["日本語の先生", "先生の日本語", "日本語は先生"],
          answer: 0,
          why: "Najpierw to, co opisuje (日本語), potem の, na końcu rzecz (先生).",
        },
        {
          type: "choice",
          prompt: "Co znaczy だれの本ですか。",
          options: ["Czyja to książka?", "Kto to jest?", "Co to za książka?"],
          answer: 0,
          why: "だれ to „kto”, a だれの to „czyj”.",
        },
      ],
    },
    {
      kind: "summary",
      points: ["Mówisz, czyje coś jest: 私の本です。", "Opisujesz rodzaj: 日本語の先生。", "Pytasz „czyje?”: だれの本ですか。"],
      words: [w.nihongo, w.dare, w.tomodachi, w.watashi],
    },
  ],
};
