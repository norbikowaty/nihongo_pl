import type { Lesson } from "../../../schema";
import { w } from "../../words";

export const waDesu: Lesson = {
  id: "gramatyka/pierwsze-zdania/wa-desu",
  course: "gramatyka",
  section: "pierwsze-zdania",
  slug: "pierwsze-zdania/wa-desu",
  title: "Partykuła は i です",
  minutes: 12,
  kind: "lesson",
  steps: [
    {
      kind: "intro",
      lead: "Najczęstsze zdanie w japońskim ma dwie części gramatyczne: は i です.",
      sentence: {
        ja: { segs: [{ t: "わたし" }, { t: "は" }, { t: "学生", r: "がくせい" }, { t: "です。" }], romaji: "Watashi wa gakusei desu." },
        pl: "Jestem studentem.",
      },
      after: "W tej lekcji zbudujesz takie zdanie, zaprzeczysz je i przedstawisz siebie oraz innych.",
    },
    {
      kind: "pattern",
      blocks: [
        { pattern: { segs: [{ t: "A は B です。" }], romaji: "A wa B desu." }, meaning: "A to B. A jest B." },
        {
          pattern: { segs: [{ t: "A は B じゃありません。" }], romaji: "A wa B ja arimasen." },
          meaning: "A nie jest B. Tak wygląda przeczenie.",
        },
      ],
      explanation:
        "Gdy は jest partykułą, czytasz je „wa”, a nie „ha”. Stoi po słowie, o którym mówisz.\n\nです zamyka zdanie i sprawia, że brzmi grzecznie. Zwykle czytasz je jak „des”, z ledwo słyszalnym u na końcu.\n\nGdy wiadomo, o kim mowa, Japończycy często pomijają わたしは. Samo 学生です。 też znaczy „Jestem studentem”.",
    },
    {
      kind: "examples",
      items: [
        {
          ja: { segs: [{ t: "わたし" }, { t: "は" }, { t: "学生", r: "がくせい" }, { t: "です。" }], romaji: "Watashi wa gakusei desu." },
          pl: "Jestem studentem.",
        },
        { ja: { segs: [{ t: "これは" }, { t: "本", r: "ほん" }, { t: "です。" }], romaji: "Kore wa hon desu." }, pl: "To jest książka." },
        {
          ja: { segs: [{ t: "たなか" }, { t: "さんは" }, { t: "先生", r: "せんせい" }, { t: "です。" }], romaji: "Tanaka-san wa sensei desu." },
          pl: "Pan Tanaka jest nauczycielem.",
        },
        {
          ja: {
            segs: [{ t: "わたし" }, { t: "は" }, { t: "先生", r: "せんせい" }, { t: "じゃありません。" }],
            romaji: "Watashi wa sensei ja arimasen.",
          },
          pl: "Nie jestem nauczycielem.",
        },
      ],
    },
    {
      kind: "exercise",
      items: [
        {
          type: "build",
          prompt: "Jestem studentem.",
          tiles: [
            { ja: { segs: [{ t: "わたし" }], romaji: "watashi" } },
            { ja: { segs: [{ t: "は" }], romaji: "wa" } },
            { ja: { segs: [{ t: "学生", r: "がくせい" }], romaji: "gakusei" } },
            { ja: { segs: [{ t: "です" }], romaji: "desu" } },
            { ja: { segs: [{ t: "を" }], romaji: "o" } },
          ],
          answer: [0, 1, 2, 3],
        },
        {
          type: "choice",
          prompt: "Uzupełnij: To jest książka.",
          ja: { segs: [{ t: "これ ＿ " }, { t: "本", r: "ほん" }, { t: "です。" }], romaji: "Kore ___ hon desu." },
          options: ["は", "を", "の"],
          answer: 0,
          why: "は wskazuje, o czym jest zdanie: o tym, co mam przed sobą (これ).",
        },
        {
          type: "choice",
          prompt: "Jak powiesz: Nie jestem nauczycielem.",
          options: ["わたしは先生です。", "わたしは先生じゃありません。", "わたしは先生ですか。"],
          answer: 1,
          why: "じゃありません to przeczenie です.",
        },
      ],
    },
    {
      kind: "summary",
      points: ["Mówisz, kim jesteś: わたしは学生です。", "Nazywasz przedmiot: これは本です。", "Zaprzeczasz: 先生じゃありません。"],
      words: [w.watashi, w.gakusei, w.sensei, w.hon, w.kore, w.porandojin],
    },
  ],
};
