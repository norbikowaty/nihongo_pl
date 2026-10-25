"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { type ReadingLevel, setReading } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";
import { readingContextFor } from "@/lib/reading";

const levels: { level: ReadingLevel; label: string; title: string; jp: boolean }[] = [
  { level: 0, label: "漢字", title: "Bez pomocy: same kanji i kana", jp: true },
  { level: 1, label: "ふりがな", title: "Furigana nad kanji", jp: true },
  { level: 2, label: "rōmaji", title: "Furigana i rōmaji", jp: false },
];

function useReadingLevel() {
  const pathname = usePathname();
  const ctx = readingContextFor(pathname);
  const { progress, update } = useProgress();
  return { ctx, level: progress.settings.reading[ctx], update };
}

/** Keeps <html data-reading> in step with the saved level for the current part of the site. */
export function ReadingSync() {
  const { level } = useReadingLevel();
  useEffect(() => {
    document.documentElement.setAttribute("data-reading", String(level));
  }, [level]);
  return null;
}

export function ReadingSwitch() {
  const { ctx, level, update } = useReadingLevel();
  return (
    <div role="group" aria-label="Pomoc w czytaniu" className="inline-flex gap-0.5 bg-as p-[3px]">
      {levels.map((l) => (
        <button
          key={l.level}
          type="button"
          title={l.title}
          aria-pressed={level === l.level}
          onClick={() => update((p) => setReading(p, ctx, l.level))}
          className={`min-h-9 cursor-pointer px-3 text-[15px] ${
            level === l.level ? "bg-sf font-bold text-ac" : "text-ink"
          }`}
        >
          <span lang={l.jp ? "ja" : undefined} className={l.jp ? "jp" : undefined}>
            {l.label}
          </span>
        </button>
      ))}
    </div>
  );
}
