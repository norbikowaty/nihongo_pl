/** Kanji sets; readings use KANJIDIC2 notation (okurigana after "."). Checked with scripts/verify-kanji.ts. */
export type Kanji = { kanji: string; on: string[]; kun: string[]; meaning: string; strokes: number };

const k = (kanji: string, on: string[], kun: string[], meaning: string, strokes: number): Kanji => ({
  kanji,
  on,
  kun,
  meaning,
  strokes,
});

export const kanjiSets: { id: string; title: string; kanji: Kanji[] }[] = [
  {
    id: "liczby",
    title: "Liczby",
    kanji: [
      k("一", ["イチ"], ["ひと.つ"], "jeden", 1),
      k("二", ["ニ"], ["ふた.つ"], "dwa", 2),
      k("三", ["サン"], ["みっ.つ"], "trzy", 3),
      k("四", ["シ"], ["よん", "よっ.つ"], "cztery", 5),
      k("五", ["ゴ"], ["いつ.つ"], "pięć", 4),
      k("六", ["ロク"], ["むっ.つ"], "sześć", 4),
      k("七", ["シチ"], ["なな.つ"], "siedem", 2),
      k("八", ["ハチ"], ["やっ.つ"], "osiem", 2),
      k("九", ["キュウ", "ク"], ["ここの.つ"], "dziewięć", 2),
      k("十", ["ジュウ"], ["とお"], "dziesięć", 2),
    ],
  },
];

/** "ひと.つ" → "ひと(つ)": the part after the dot is written in kana after the kanji. */
export const kunLabel = (r: string) => r.replace(/\.(.+)$/, "($1)");
