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

/**
 * Kanji used in grammar and other lessons. Each is introduced in the first lesson (in study order)
 * that uses it, at the end of the lesson's introduction.
 */
export const lessonKanji: Kanji[] = [
  k("学", ["ガク"], ["まな.ぶ"], "nauka, uczyć się", 8),
  k("生", ["セイ", "ショウ"], ["い.きる", "う.まれる", "なま"], "życie, rodzić się", 5),
  k("本", ["ホン"], ["もと"], "książka; początek", 5),
  k("先", ["セン"], ["さき"], "przód, wcześniej", 6),
  k("日", ["ニチ", "ジツ"], ["ひ", "-か"], "dzień, słońce", 4),
  k("人", ["ジン", "ニン"], ["ひと"], "człowiek", 2),
  k("医", ["イ"], [], "medycyna, leczenie", 7),
  k("者", ["シャ"], ["もの"], "osoba", 8),
  k("会", ["カイ", "エ"], ["あ.う"], "spotkanie, spotykać", 6),
  k("社", ["シャ"], ["やしろ"], "firma; chram", 7),
  k("員", ["イン"], [], "członek, pracownik", 10),
  k("私", ["シ"], ["わたし", "わたくし"], "ja; prywatny", 7),
  k("田", ["デン"], ["た"], "pole ryżowe", 5),
  k("中", ["チュウ"], ["なか"], "środek, w środku", 4),
  k("何", ["カ"], ["なに", "なん"], "co", 7),
  k("車", ["シャ"], ["くるま"], "samochód, pojazd", 7),
  k("語", ["ゴ"], ["かた.る"], "język, słowo", 14),
  k("友", ["ユウ"], ["とも"], "przyjaciel", 4),
  k("達", ["タツ"], ["-たち"], "osiągać; po rzeczowniku: liczba mnoga osób", 12),
];

const byChar = new Map([...kanjiSets.flatMap((s) => s.kanji), ...lessonKanji].map((x) => [x.kanji, x]));

export const kanjiInfo = (char: string) => byChar.get(char);

/** "ひと.つ" → "ひと(つ)": the part after the dot is written in kana after the kanji. */
export const kunLabel = (r: string) => r.replace(/\.(.+)$/, "($1)");
