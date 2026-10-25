/** Kanji sets; readings use KANJIDIC2 notation (okurigana after "."). Checked with scripts/verify-kanji.ts. */

/**
 * The N5 kanji (Tanos list, which most N5 materials follow; JLPT has published no official list since 2010).
 * Lessons use only these; a word whose kanji are beyond N5 is written in kana, as on the exam.
 */
export const n5Kanji =
  "日一国人年大十二本中長出三時行見月分後前生五間上東四今金九入学高円子外八六下来気小七山話女北午百書先名川千水半男西電校語土木聞食車何南万毎白天母火右読友左休父雨";

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
  k("何", ["カ"], ["なに", "なん"], "co", 7),
  k("車", ["シャ"], ["くるま"], "samochód, pojazd", 7),
  k("語", ["ゴ"], ["かた.る"], "język, słowo", 14),
  k("友", ["ユウ"], ["とも"], "przyjaciel", 4),
  k("大", ["ダイ", "タイ"], ["おお.きい"], "duży, wielki", 3),
  k("名", ["メイ", "ミョウ"], ["な"], "imię, nazwa", 6),
  k("前", ["ゼン"], ["まえ"], "przód, przed", 9),
  k("国", ["コク"], ["くに"], "kraj", 8),
  k("今", ["コン", "キン"], ["いま"], "teraz", 4),
  k("時", ["ジ"], ["とき"], "czas, godzina", 10),
  k("半", ["ハン"], ["なか.ば"], "połowa", 5),
  k("分", ["ブン", "フン", "ブ"], ["わ.ける"], "minuta; dzielić", 4),
  k("月", ["ゲツ", "ガツ"], ["つき"], "miesiąc; księżyc", 4),
  k("円", ["エン"], ["まる.い"], "jen; koło", 4),
  k("行", ["コウ", "ギョウ"], ["い.く", "ゆ.く", "おこな.う"], "iść; robić", 6),
  k("来", ["ライ"], ["く.る", "きた.る"], "przychodzić", 7),
  k("休", ["キュウ"], ["やす.む"], "odpoczywać", 6),
];

const byChar = new Map([...kanjiSets.flatMap((s) => s.kanji), ...lessonKanji].map((x) => [x.kanji, x]));

export const kanjiInfo = (char: string) => byChar.get(char);

/** "ひと.つ" → "ひと(つ)": the part after the dot is written in kana after the kanji. */
export const kunLabel = (r: string) => r.replace(/\.(.+)$/, "($1)");
