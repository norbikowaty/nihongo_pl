import { hiragana, hiraganaDakuten, hiraganaYoon, katakana, katakanaDakuten, katakanaYoon } from "@/content/kana";
import { lessons } from "@/content/lessons";
import type { JaText, Word } from "@/content/schema";

export type CardFace = { front: JaText; reading: string; meaning: string };

const words = new Map<string, Word>();
for (const l of lessons) for (const s of l.steps) if (s.kind === "summary") for (const w of s.words) words.set(w.id, w);

const scriptOf = new Map<string, { romaji: string; script: string }>();
for (const [rows, script] of [
  [[hiragana, hiraganaDakuten, hiraganaYoon].flat(), "znak hiragany"],
  [[katakana, katakanaDakuten, katakanaYoon].flat(), "znak katakany"],
] as const) {
  for (const c of rows.flatMap((r) => r.cells)) if (c) scriptOf.set(c.kana, { romaji: c.romaji, script });
}

/** What a review card shows: "word:<id>" from lesson vocabulary, "kana:<char>" from the kana tables. */
export function cardFace(id: string): CardFace | undefined {
  const [kind, key] = [id.slice(0, id.indexOf(":")), id.slice(id.indexOf(":") + 1)];
  if (kind === "word") {
    const w = words.get(key);
    if (!w) return undefined;
    const kana = w.ja.segs.map((s) => s.r ?? s.t).join("");
    const written = w.ja.segs.map((s) => s.t).join("");
    return {
      front: { segs: w.ja.segs.map((s) => ({ t: s.t })), romaji: "" },
      reading: kana === written ? w.ja.romaji : `${kana} · ${w.ja.romaji}`,
      meaning: w.pl,
    };
  }
  if (kind === "kana") {
    const k = scriptOf.get(key);
    return k ? { front: { segs: [{ t: key }], romaji: "" }, reading: k.romaji, meaning: k.script } : undefined;
  }
  return undefined;
}
