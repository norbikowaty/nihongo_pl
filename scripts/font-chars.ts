import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Hiragana, katakana, CJK ideographs, Japanese punctuation and full-width forms.
const JA = /[　-〿぀-ヿ㐀-䶿一-鿿＀-￯]/gu;

// Always included, so new kana content never needs a font rebuild.
const ALWAYS = (() => {
  let s = "";
  for (let c = 0x3041; c <= 0x30ff; c++) s += String.fromCodePoint(c);
  return s + "。、・「」『』〜ー＿？！（）";
})();

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : /\.(tsx?|css)$/.test(name) ? [path] : [];
  });
}

/** Every Japanese character in src/ plus all kana: the characters the self-hosted font must contain. */
export function japaneseCharsInSource(root = process.cwd()): Set<string> {
  const chars = new Set<string>(ALWAYS);
  for (const file of walk(join(root, "src"))) for (const m of readFileSync(file, "utf8").matchAll(JA)) chars.add(m[0]);
  return chars;
}
