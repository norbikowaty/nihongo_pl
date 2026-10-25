import { lessons } from "@/content/lessons";
import { cardFace } from "@/lib/cards";
import { speechText } from "@/lib/speech";

/**
 * Every text that has a play button: lesson sentences, examples, new kana, the kana drill and the
 * word and kana review cards. Kanji cards are left out, since a lone kanji has several readings.
 * Used by scripts/make-audio.ts and the test that checks every text has a recording.
 */
export function spokenTexts(): string[] {
  const texts = new Set<string>();
  const add = (t: Parameters<typeof speechText>[0]) => texts.add(speechText(t));
  for (const l of lessons) {
    for (const s of l.steps) {
      if (s.kind === "intro") add(s.sentence.ja);
      if (s.kind === "examples") s.items.forEach((e) => add(e.ja));
      if (s.kind === "newKana") s.chars.forEach((c) => add(cardFace(`kana:${c}`)?.speech ?? c));
      if (s.kind === "summary") for (const w of s.words) if (!w.beyondN5) add(cardFace(`word:${w.id}`)!.speech);
      if (s.kind === "exercise")
        for (const ex of s.items) if (ex.type === "kana") [...ex.items, ...(ex.review ?? [])].forEach((k) => add(k.kana));
    }
  }
  texts.delete("");
  return [...texts].sort();
}
