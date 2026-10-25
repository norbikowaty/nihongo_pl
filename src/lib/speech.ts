import { useSyncExternalStore } from "react";
import recordings from "@/content/audio.json";
import type { JaText } from "@/content/schema";

// Lesson texts play from recordings in public/audio/ (made with scripts/make-audio.ts), so audio works in
// every browser. Anything without a recording falls back to the browser's own Japanese voice, if it has one.

const recorded = new Set<string>(recordings.files);

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

/** The text sent to the voice: gaps (＿) in exercise sentences are not read. */
export const speechText = (text: JaText | string) => spokenText(text).replace(/[＿_]+/g, "");

/** File name of a recording: FNV-1a of the text, so the script and the page agree without a lookup table. */
export function audioKey(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(16).padStart(8, "0");
}

export const hasRecording = (text: JaText | string) => recorded.has(audioKey(speechText(text)));

/** True when the text can be played: it has a recording, or the browser offers a Japanese voice. */
export function useCanSpeak(text: JaText | string): boolean {
  const voice = useSyncExternalStore(subscribe, () => bestVoice() !== undefined, () => false);
  return hasRecording(text) || voice;
}

let playing: HTMLAudioElement | null = null;

export function speak(text: JaText | string) {
  const say = speechText(text);
  playing?.pause();
  synth()?.cancel();
  if (recorded.has(audioKey(say))) {
    playing = new Audio(`/audio/${audioKey(say)}.mp3`);
    playing.play().catch(() => {});
    return;
  }
  const s = synth();
  const voice = bestVoice();
  if (!s || !voice) return;
  const u = new SpeechSynthesisUtterance(say);
  u.voice = voice;
  u.lang = voice.lang;
  // A little slower than normal speech, for learners.
  u.rate = 0.85;
  s.speak(u);
}
