import type { Exercise, Lesson } from "../../../schema";

type ChoiceItem = Extract<Exercise, { type: "choice" }>;

const q = (prompt: string, options: string[], answer: number, why: string): ChoiceItem => ({
  type: "choice",
  prompt,
  options,
  answer,
  why,
});

export const pierwszeZdaniaTest: Lesson = {
  id: "gramatyka/pierwsze-zdania/test",
  course: "gramatyka",
  section: "pierwsze-zdania",
  slug: "pierwsze-zdania/test",
  title: "Test działu: Pierwsze zdania",
  minutes: 10,
  kind: "test",
  steps: [
    {
      kind: "exercise",
      items: [
        q("Uzupełnij: 私＿学生です。", ["は", "の", "か"], 0, "は wskazuje, o kim jest zdanie."),
        q("Uzupełnij: これは私＿本です。", ["は", "の", "か"], 1, "の pokazuje, czyje coś jest."),
        q("Uzupełnij: 先生です＿。 (pytanie)", ["は", "の", "か"], 2, "か na końcu tworzy pytanie."),
        q("Jak czytasz は w zdaniu 私は学生です。", ["ha", "wa", "ba"], 1, "Partykułę は czytasz wa."),
        q("Co znaczy 日本人ですか。", ["Czy jesteś Japończykiem?", "Jestem Japończykiem.", "Nie jestem Japończykiem."], 0, "か na końcu oznacza pytanie."),
        q("Jak powiesz: Nie jestem lekarzem.", ["医者です。", "医者じゃありません。", "医者ですか。"], 1, "じゃありません to przeczenie です."),
        q("Ktoś pyta: 学生ですか。 Jesteś studentem. Co odpowiesz?", ["はい、そうです。", "いいえ、ちがいます。", "だれですか。"], 0, "はい、そうです znaczy „tak, zgadza się”."),
        q("Co znaczy これは何ですか。", ["Co to jest?", "Czyje to jest?", "Kto to jest?"], 0, "何 (なん) to „co”."),
        q("Jak powiesz: nauczyciel japońskiego?", ["先生の日本語", "日本語の先生", "日本語は先生"], 1, "Najpierw to, co opisuje, potem の i rzecz."),
        q("Co znaczy 田中さんの車です。", ["To samochód pana Tanaki.", "Pan Tanaka ma samochód?", "To nie jest samochód pana Tanaki."], 0, "田中さんの to „pana Tanaki”."),
      ],
    },
  ],
};
