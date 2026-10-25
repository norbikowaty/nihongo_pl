import type { Lesson } from "../../../schema";
import { w } from "../../words";

export const ka: Lesson = {
  id: "gramatyka/pierwsze-zdania/ka",
  course: "gramatyka",
  section: "pierwsze-zdania",
  slug: "pierwsze-zdania/ka",
  title: "Pytania z か",
  minutes: 10,
  kind: "lesson",
  steps: [
    {
      kind: "intro",
      lead: "Pytanie tworzysz, dodając か na końcu zdania. Szyk słów się nie zmienia.",
      sentence: {
        ja: { segs: [{ t: "あなたは" }, { t: "学生", r: "がくせい" }, { t: "ですか。" }], romaji: "Anata wa gakusei desu ka." },
        pl: "Czy jesteś studentem?",
      },
      after: "か działa jak znak zapytania wypowiedziany na głos. Dlatego po japońsku często zamiast ? stoi zwykła kropka 。.",
    },
    {
      kind: "pattern",
      blocks: [
        { pattern: { segs: [{ t: "A は B ですか。" }], romaji: "A wa B desu ka." }, meaning: "Czy A jest B?" },
        { pattern: { segs: [{ t: "はい、そうです。" }], romaji: "Hai, sō desu." }, meaning: "Tak, zgadza się." },
        { pattern: { segs: [{ t: "いいえ、ちがいます。" }], romaji: "Iie, chigaimasu." }, meaning: "Nie, to nie tak." },
      ],
      explanation:
        "Na pytanie „tak albo nie” odpowiadasz はい albo いいえ.\n\nPytając o rzecz, używasz 何 (なん): これは何ですか。 znaczy „Co to jest?”.\n\nあなた znaczy „ty”, ale Japończycy rzadko go używają. Grzeczniej jest zwrócić się po nazwisku z さん, np. 田中さん.",
    },
    {
      kind: "examples",
      items: [
        {
          ja: { segs: [{ t: "田中", r: "たなか" }, { t: "さんは" }, { t: "先生", r: "せんせい" }, { t: "ですか。" }], romaji: "Tanaka-san wa sensei desu ka." },
          pl: "Czy pan Tanaka jest nauczycielem?",
        },
        { ja: { segs: [{ t: "はい、" }, { t: "先生", r: "せんせい" }, { t: "です。" }], romaji: "Hai, sensei desu." }, pl: "Tak, jest nauczycielem." },
        { ja: { segs: [{ t: "これは" }, { t: "何", r: "なん" }, { t: "ですか。" }], romaji: "Kore wa nan desu ka." }, pl: "Co to jest?" },
        { ja: { segs: [{ t: "いいえ、ちがいます。" }], romaji: "Iie, chigaimasu." }, pl: "Nie, to nie tak." },
      ],
    },
    {
      kind: "exercise",
      items: [
        {
          type: "build",
          prompt: "Co to jest?",
          tiles: [
            { ja: { segs: [{ t: "これ" }], romaji: "kore" } },
            { ja: { segs: [{ t: "は" }], romaji: "wa" } },
            { ja: { segs: [{ t: "何", r: "なん" }], romaji: "nan" } },
            { ja: { segs: [{ t: "です" }], romaji: "desu" } },
            { ja: { segs: [{ t: "か" }], romaji: "ka" } },
            { ja: { segs: [{ t: "の" }], romaji: "no" } },
          ],
          answer: [0, 1, 2, 3, 4],
        },
        {
          type: "choice",
          prompt: "Ktoś pyta: 学生ですか。 Nie jesteś studentem. Co odpowiesz?",
          options: ["はい、そうです。", "いいえ、ちがいます。", "学生です。"],
          answer: 1,
          why: "いいえ to „nie”, a ちがいます znaczy „to nie tak”.",
        },
        {
          type: "choice",
          prompt: "Jak zamienić 先生です。 w pytanie?",
          options: ["先生ですか。", "か先生です。", "先生かです。"],
          answer: 0,
          why: "か dodajesz na samym końcu, po です.",
        },
      ],
    },
    {
      kind: "summary",
      points: ["Pytasz, dodając か: 学生ですか。", "Odpowiadasz: はい、そうです。 albo いいえ、ちがいます。", "Pytasz o rzecz: これは何ですか。"],
      words: [w.anata, w.hai, w.iie, w.nan],
    },
  ],
};
