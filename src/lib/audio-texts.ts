import { lessons } from "@/content/lessons";
import type { JaText, Seg } from "@/content/schema";
import { cardFace } from "@/lib/cards";
import { speechText } from "@/lib/speech";

/**
 * A recording: `text` names the file (what the page plays), `say` is what the voice is given.
 * `segs` lets scripts/make-audio.ts swap a word the voice would misread (何 as なに) for its furigana.
 */
export type Spoken = { text: string; say: string; segs?: Seg[] };

/** ひ → ヒ. A lone は or へ in hiragana is read as the particle (wa, e); in katakana it is read ha, he. */
const toKatakana = (s: string) => s.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));

/**
 * Every text that has a play button: lesson sentences, examples, new kana, the kana drill and the
 * word and kana review cards. Kanji cards are left out, since a lone kanji has several readings.
 * Used by scripts/make-audio.ts and the test that checks every text has a recording.
 */
export function spokenTexts(): Spoken[] {
  const all = new Map<string, Spoken>();
  const add = (x: Spoken) => all.set(x.text, x);
  const addJa = (t: JaText) => add({ text: speechText(t), say: speechText(t), segs: t.segs.length > 1 ? t.segs : undefined });
  const addKana = (k: string) => add({ text: k, say: toKatakana(k) });
  for (const l of lessons) {
    for (const s of l.steps) {
      if (s.kind === "intro") addJa(s.sentence.ja);
      if (s.kind === "examples") s.items.forEach((e) => addJa(e.ja));
      if (s.kind === "newKana") s.chars.forEach(addKana);
      if (s.kind === "summary")
        for (const w of s.words) if (!w.beyondN5) add({ text: cardFace(`word:${w.id}`)!.speech, say: cardFace(`word:${w.id}`)!.speech });
      if (s.kind === "exercise")
        for (const ex of s.items) if (ex.type === "kana") [...ex.items, ...(ex.review ?? [])].forEach((k) => addKana(k.kana));
    }
  }
  all.delete("");
  return [...all.values()].sort((a, b) => a.text.localeCompare(b.text));
}
