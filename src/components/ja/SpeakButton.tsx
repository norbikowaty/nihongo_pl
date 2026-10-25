"use client";

import type { JaText } from "@/content/schema";
import { speak, spokenText, useCanSpeak } from "@/lib/speech";

/** Plays the text with the browser's Japanese voice; invisible (but keeping its place) on devices without one. */
export function SpeakButton({ text, size = "md", className = "" }: { text: JaText | string; size?: "sm" | "md"; className?: string }) {
  const can = useCanSpeak();
  const box = size === "sm" ? "h-8 w-8" : "h-[42px] w-[42px]";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label={`Odsłuchaj: ${spokenText(text)}`}
      aria-hidden={!can}
      tabIndex={can ? 0 : -1}
      className={`inline-flex ${box} shrink-0 cursor-pointer items-center justify-center rounded-full bg-as text-ink transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none ${
        can ? "" : "invisible"
      } ${className}`}
    >
      <svg width={size === "sm" ? 10 : 12} height={size === "sm" ? 12 : 14} viewBox="0 0 12 14" aria-hidden="true">
        <path d="M1 1l10 6-10 6z" fill="currentColor" />
      </svg>
    </button>
  );
}
