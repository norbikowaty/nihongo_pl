import { lessons } from "@/content/lessons";
import type { Word } from "@/content/schema";

/** Every N5 word taught in a lesson, once, in course order. */
export function allWords(): Word[] {
  const seen = new Map<string, Word>();
  for (const l of lessons)
    for (const s of l.steps) if (s.kind === "summary") for (const w of s.words) if (!w.beyondN5) seen.set(w.id, w);
  return [...seen.values()];
}

/** Lower case without Latin accents (ą → a, ō → o, ł → l); kana and kanji are left alone. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .normalize("NFC");
}

export function searchWords(words: Word[], query: string): Word[] {
  const q = normalize(query.trim());
  if (!q) return words;
  const fields = (w: Word) =>
    [w.ja.segs.map((s) => s.t).join(""), w.ja.segs.map((s) => s.r ?? s.t).join(""), w.ja.romaji, w.pl].map(normalize);
  const exact = (w: Word) => (fields(w).includes(q) ? 0 : 1);
  // Exact matches first (本 before 日本語), then course order.
  return words.filter((w) => fields(w).some((f) => f.includes(q))).sort((a, b) => exact(a) - exact(b));
}
