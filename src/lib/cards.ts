import { hiragana, hiraganaDakuten, hiraganaYoon, katakana, katakanaDakuten, katakanaYoon } from "@/content/kana";
import { kanjiInfo, kunLabel } from "@/content/kanji";
import { lessons } from "@/content/lessons";
import type { JaText, Word } from "@/content/schema";

export type CardFace = {
  front: JaText;
  /** What kind of card it is, shown above the card. */
  tag: string;
  reading: string;
  readingLabel: string;
  meaning: string;
  meaningLabel: string;
};

const words = new Map<string, Word>();
for (const l of lessons) for (const s of l.steps) if (s.kind === "summary") for (const w of s.words) words.set(w.id, w);

const scriptOf = new Map<string, { romaji: string; script: string }>();
for (const [rows, script] of [
  [[hiragana, hiraganaDakuten, hiraganaYoon].flat(), "hiragana"],
  [[katakana, katakanaDakuten, katakanaYoon].flat(), "katakana"],
] as const) {
  for (const c of rows.flatMap((r) => r.cells)) if (c) scriptOf.set(c.kana, { romaji: c.romaji, script });
}

/** What a review card shows: "word:<id>" from lesson vocabulary, "kana:<char>" from the kana tables, "kanji:<char>". */
export function cardFace(id: string): CardFace | undefined {
  const [kind, key] = [id.slice(0, id.indexOf(":")), id.slice(id.indexOf(":") + 1)];
  if (kind === "word") {
    const w = words.get(key);
    if (!w) return undefined;
    const kana = w.ja.segs.map((s) => s.r ?? s.t).join("");
    const written = w.ja.segs.map((s) => s.t).join("");
    return {
      front: { segs: w.ja.segs.map((s) => ({ t: s.t })), romaji: "" },
      tag: "słowo",
      reading: kana === written ? w.ja.romaji : `${kana} · ${w.ja.romaji}`,
      readingLabel: "Czytanie",
      meaning: w.pl,
      meaningLabel: "Znaczenie",
    };
  }
  if (kind === "kana") {
    const k = scriptOf.get(key);
    if (!k) return undefined;
    const front = { segs: [{ t: key }], romaji: "" };
    return { front, tag: `znak ${k.script.slice(0, -1)}y`, reading: k.romaji, readingLabel: "Czytanie", meaning: k.script, meaningLabel: "Alfabet" };
  }
  if (kind === "kanji") {
    const k = kanjiInfo(key);
    if (!k) return undefined;
    return {
      front: { segs: [{ t: key }], romaji: "" },
      tag: "kanji",
      reading: [...k.on, ...k.kun.map(kunLabel)].join("、"),
      readingLabel: "Czytania",
      meaning: k.meaning,
      meaningLabel: "Znaczenie",
    };
  }
  return undefined;
}
