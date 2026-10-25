"use client";

import { useEffect, useRef, useState } from "react";
import { Ja } from "@/components/ja/Ja";
import type { Lesson } from "@/content/schema";
import { setNote } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";

export function LessonAside({ lesson }: { lesson: Lesson }) {
  const { progress, update } = useProgress();
  const saved = progress.notes[lesson.id]?.text ?? "";
  // The draft belongs to one lesson; Next may reuse this component for the next lesson.
  const [draft, setDraft] = useState<{ lessonId: string; text: string } | null>(null);
  const value = draft?.lessonId === lesson.id ? draft.text : saved;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const words = lesson.steps.flatMap((s) => (s.kind === "summary" ? s.words : []));

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = (text: string) => {
    const lessonId = lesson.id;
    setDraft({ lessonId, text });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => update((p) => setNote(p, lessonId, text, new Date())), 500);
  };

  return (
    <aside className="flex flex-col gap-5">
      {words.length > 0 && (
        <section className="bg-sf px-6 py-6">
          <h2 className="mb-2 text-xl font-bold">Słowa w tej lekcji</h2>
          <ul>
            {words.map((w) => (
              <li key={w.id} className="flex items-center justify-between gap-3 border-b border-ln py-1.5">
                <Ja text={w.ja} size="sm" className="font-semibold" />
                <span className="text-right text-base">{w.pl}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="bg-sf px-6 py-6">
        <h2 className="mb-2.5 text-xl font-bold">
          <label htmlFor={`note-${lesson.id}`}>Twoja notatka</label>
        </h2>
        <textarea
          id={`note-${lesson.id}`}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Np. は czytam jako wa"
          className="max-h-[360px] min-h-[120px] w-full resize-y bg-bg p-3 text-[17px] text-ink"
        />
      </section>
    </aside>
  );
}
