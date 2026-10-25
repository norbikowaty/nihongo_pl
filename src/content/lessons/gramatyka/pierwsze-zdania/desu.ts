import type { Lesson } from "../../../schema";
import { w } from "../../words";

export const desu: Lesson = {
  id: "gramatyka/pierwsze-zdania/desu",
  course: "gramatyka",
  section: "pierwsze-zdania",
  slug: "pierwsze-zdania/desu",
  title: "です — to jest",
  minutes: 10,
  kind: "lesson",
  steps: [
    {
      kind: "intro",
      lead: "Najprostsze zdanie po japońsku to rzeczownik i です na końcu.",
      sentence: { ja: { segs: [{ t: "学生", r: "がくせい" }, { t: "です。" }], romaji: "Gakusei desu." }, pl: "Jestem studentem." },
      after: "Nie trzeba mówić „ja”: z rozmowy zwykle wiadomo, o kim mowa. To samo zdanie może też znaczyć „On jest studentem” albo „To student”.",
    },
    {
      kind: "pattern",
      blocks: [{ pattern: { segs: [{ t: "B です。" }], romaji: "B desu." }, meaning: "To (jest) B. Jestem B." }],
      explanation:
        "です stawiasz zawsze na końcu zdania. Zwykle czytasz je jak „des”.\n\nJapoński nie ma rodzajników ani liczby mnogiej. 本です。 znaczy „To książka” albo „To książki”, zależnie od sytuacji.\n\nZdanie kończy kropka 。, a nie zwykła kropka.",
    },
    {
      kind: "examples",
      items: [
        { ja: { segs: [{ t: "本", r: "ほん" }, { t: "です。" }], romaji: "Hon desu." }, pl: "To książka." },
        { ja: { segs: [{ t: "先生", r: "せんせい" }, { t: "です。" }], romaji: "Sensei desu." }, pl: "Jestem nauczycielem." },
        { ja: { segs: [{ t: "日本人", r: "にほんじん" }, { t: "です。" }], romaji: "Nihonjin desu." }, pl: "Jestem Japończykiem." },
        { ja: { segs: [{ t: "医者", r: "いしゃ" }, { t: "です。" }], romaji: "Isha desu." }, pl: "Jestem lekarzem." },
      ],
    },
    {
      kind: "exercise",
      items: [
        {
          type: "build",
          prompt: "Jestem pracownikiem firmy.",
          tiles: [
            { ja: { segs: [{ t: "会社員", r: "かいしゃいん" }], romaji: "kaishain" } },
            { ja: { segs: [{ t: "です" }], romaji: "desu" } },
            { ja: { segs: [{ t: "は" }], romaji: "wa" } },
          ],
          answer: [0, 1],
        },
        {
          type: "choice",
          prompt: "Jak powiesz: To książka.",
          options: ["本です。", "です本。", "本は。"],
          answer: 0,
          why: "です zawsze stoi na końcu zdania.",
        },
        {
          type: "choice",
          prompt: "Co znaczy ポーランド人です。",
          options: ["Jestem Polakiem.", "Jestem Japończykiem.", "Jestem studentem."],
          answer: 0,
          why: "ポーランド人 to Polak albo Polka.",
        },
      ],
    },
    {
      kind: "summary",
      points: ["Mówisz, kim jesteś: 学生です。", "Nazywasz rzecz: 本です。", "です stoi na końcu zdania i brzmi jak „des”."],
      words: [w.nihonjin, w.kaishain, w.isha, w.gakusei, w.hon],
    },
  ],
};
