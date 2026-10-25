export type KanaCell = { kana: string; romaji: string };
export type KanaRow = { row: string; cells: (KanaCell | null)[] };

// Rows of the gojūon table, written as "kana:romaji" with "-" for an empty cell.
const parse = (rows: [string, string][]): KanaRow[] =>
  rows.map(([row, cells]) => ({
    row,
    cells: cells.split(" ").map((c) => {
      if (c === "-") return null;
      const [kana, romaji] = c.split(":");
      return { kana, romaji };
    }),
  }));

export const hiragana = parse([
  ["a", "あ:a い:i う:u え:e お:o"],
  ["k", "か:ka き:ki く:ku け:ke こ:ko"],
  ["s", "さ:sa し:shi す:su せ:se そ:so"],
  ["t", "た:ta ち:chi つ:tsu て:te と:to"],
  ["n", "な:na に:ni ぬ:nu ね:ne の:no"],
  ["h", "は:ha ひ:hi ふ:fu へ:he ほ:ho"],
  ["m", "ま:ma み:mi む:mu め:me も:mo"],
  ["y", "や:ya - ゆ:yu - よ:yo"],
  ["r", "ら:ra り:ri る:ru れ:re ろ:ro"],
  ["w", "わ:wa - - - を:o"],
  ["n", "ん:n - - - -"],
]);

export const katakana = parse([
  ["a", "ア:a イ:i ウ:u エ:e オ:o"],
  ["k", "カ:ka キ:ki ク:ku ケ:ke コ:ko"],
  ["s", "サ:sa シ:shi ス:su セ:se ソ:so"],
  ["t", "タ:ta チ:chi ツ:tsu テ:te ト:to"],
  ["n", "ナ:na ニ:ni ヌ:nu ネ:ne ノ:no"],
  ["h", "ハ:ha ヒ:hi フ:fu ヘ:he ホ:ho"],
  ["m", "マ:ma ミ:mi ム:mu メ:me モ:mo"],
  ["y", "ヤ:ya - ユ:yu - ヨ:yo"],
  ["r", "ラ:ra リ:ri ル:ru レ:re ロ:ro"],
  ["w", "ワ:wa - - - ヲ:o"],
  ["n", "ン:n - - - -"],
]);

export const hiraganaDakuten = parse([
  ["g", "が:ga ぎ:gi ぐ:gu げ:ge ご:go"],
  ["z", "ざ:za じ:ji ず:zu ぜ:ze ぞ:zo"],
  ["d", "だ:da ぢ:ji づ:zu で:de ど:do"],
  ["b", "ば:ba び:bi ぶ:bu べ:be ぼ:bo"],
  ["p", "ぱ:pa ぴ:pi ぷ:pu ぺ:pe ぽ:po"],
]);

export const katakanaDakuten = parse([
  ["g", "ガ:ga ギ:gi グ:gu ゲ:ge ゴ:go"],
  ["z", "ザ:za ジ:ji ズ:zu ゼ:ze ゾ:zo"],
  ["d", "ダ:da ヂ:ji ヅ:zu デ:de ド:do"],
  ["b", "バ:ba ビ:bi ブ:bu ベ:be ボ:bo"],
  ["p", "パ:pa ピ:pi プ:pu ペ:pe ポ:po"],
]);

// Combinations with small ゃ ゅ ょ.
export const hiraganaYoon = parse([
  ["ky", "きゃ:kya きゅ:kyu きょ:kyo"],
  ["sh", "しゃ:sha しゅ:shu しょ:sho"],
  ["ch", "ちゃ:cha ちゅ:chu ちょ:cho"],
  ["ny", "にゃ:nya にゅ:nyu にょ:nyo"],
  ["hy", "ひゃ:hya ひゅ:hyu ひょ:hyo"],
  ["my", "みゃ:mya みゅ:myu みょ:myo"],
  ["ry", "りゃ:rya りゅ:ryu りょ:ryo"],
  ["gy", "ぎゃ:gya ぎゅ:gyu ぎょ:gyo"],
  ["j", "じゃ:ja じゅ:ju じょ:jo"],
  ["by", "びゃ:bya びゅ:byu びょ:byo"],
  ["py", "ぴゃ:pya ぴゅ:pyu ぴょ:pyo"],
]);

export const katakanaYoon = parse([
  ["ky", "キャ:kya キュ:kyu キョ:kyo"],
  ["sh", "シャ:sha シュ:shu ショ:sho"],
  ["ch", "チャ:cha チュ:chu チョ:cho"],
  ["ny", "ニャ:nya ニュ:nyu ニョ:nyo"],
  ["hy", "ヒャ:hya ヒュ:hyu ヒョ:hyo"],
  ["my", "ミャ:mya ミュ:myu ミョ:myo"],
  ["ry", "リャ:rya リュ:ryu リョ:ryo"],
  ["gy", "ギャ:gya ギュ:gyu ギョ:gyo"],
  ["j", "ジャ:ja ジュ:ju ジョ:jo"],
  ["by", "ビャ:bya ビュ:byu ビョ:byo"],
  ["py", "ピャ:pya ピュ:pyu ピョ:pyo"],
]);

export const allKana = [hiragana, katakana, hiraganaDakuten, katakanaDakuten, hiraganaYoon, katakanaYoon]
  .flat()
  .flatMap((r) => r.cells)
  .filter((c): c is KanaCell => c !== null);

// Katakana and hiragana tables share their layout, so the same cell holds the same sound.
const twins = new Map<string, string>();
for (const [kata, hira] of [
  [katakana, hiragana],
  [katakanaDakuten, hiraganaDakuten],
  [katakanaYoon, hiraganaYoon],
] as const) {
  kata.forEach((row, r) => row.cells.forEach((c, i) => c && twins.set(c.kana, hira[r].cells[i]!.kana)));
}

/** The hiragana for a katakana character with the same sound (ア → あ). */
export const hiraganaTwin = (kana: string) => twins.get(kana);
