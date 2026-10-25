import { useSyncExternalStore } from "react";
import type { JaText } from "@/content/schema";

// Audio comes from the browser's own Japanese voice (Web Speech API). Everything goes through
// speak(), so recorded files can replace it later without touching the lessons.

const synth = () => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);

/** Natural (online) voices sound far better than the old desktop ones, so they come first. */
function bestVoice(): SpeechSynthesisVoice | undefined {
  const ja = (synth()?.getVoices() ?? []).filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
  const rank = (v: SpeechSynthesisVoice) => (/natural|online|neural/i.test(v.name) ? 0 : /google/i.test(v.name) ? 1 : 2);
  return ja.sort((a, b) => rank(a) - rank(b))[0];
}

function subscribe(onChange: () => void) {
  const s = synth();
  s?.addEventListener("voiceschanged", onChange);
  return () => s?.removeEventListener("voiceschanged", onChange);
}

/** True once the browser offers a Japanese voice; false on the server and on devices without one. */
export function useCanSpeak(): boolean {
  return useSyncExternalStore(subscribe, () => bestVoice() !== undefined, () => false);
}

/**
 * What to say for a piece of Japanese. A single word is read from its furigana, so 何 is なん as
 * taught; a sentence is given as written, because the voice reads particles like は (wa) right
 * only in context.
 */
export function spokenText(text: JaText | string): string {
  if (typeof text === "string") return text;
  if (text.segs.length === 1) return text.segs[0].r ?? text.segs[0].t;
  return text.segs.map((s) => s.t).join("");
}

export function speak(text: JaText | string) {
  const s = synth();
  const voice = bestVoice();
  if (!s || !voice) return;
  s.cancel();
  const u = new SpeechSynthesisUtterance(spokenText(text).replace(/[＿_]+/g, ""));
  u.voice = voice;
  u.lang = voice.lang;
  // A little slower than normal speech, for learners.
  u.rate = 0.85;
  s.speak(u);
}
