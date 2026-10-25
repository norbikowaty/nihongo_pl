// Hiragana, katakana, CJK ideographs and the Japanese punctuation used in lessons.
const JA = /[぀-ヿ㐀-䶿一-鿿ｦ-ﾟ。、・ー〜「」]+/g;

export function splitProse(text: string): { ja: boolean; text: string }[] {
  const parts: { ja: boolean; text: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(JA)) {
    if (m.index > last) parts.push({ ja: false, text: text.slice(last, m.index) });
    parts.push({ ja: true, text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ ja: false, text: text.slice(last) });
  return parts;
}
