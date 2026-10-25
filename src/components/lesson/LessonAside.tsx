"use client";

import { useEffect, useRef, useState } from "react";
import { Ja } from "@/components/ja/Ja";
import { allKana } from "@/content/kana";
import type { Lesson } from "@/content/schema";
import { newKanji } from "@/lib/kanji";
import { setNote } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";

const romajiOf = (kana: string) => allKana.find((k) => k.kana === kana)?.romaji ?? "";

/** What the learner has met in the steps opened so far: characters, kanji, patterns, then words. */
function CheatSheet({ lesson, reached, covered }: { lesson: Lesson; reached: number; covered: boolean }) {
  const [peek, setPeek] = useState<string | null>(null);
  const seen = lesson.steps.slice(0, reached);
  const chars = seen.flatMap((s) => (s.kind === "newKana" ? s.chars : []));
  const kanji = seen.some((s) => s.kind === "intro") ? newKanji(lesson) : [];
  const patterns = seen.flatMap((s) => (s.kind === "pattern" ? s.blocks : []));
  // Words join once the examples have shown them in use.
  const words = seen.some((s) => s.kind === "examples") ? lesson.steps.flatMap((s) => (s.kind === "summary" ? s.words : [])) : [];
  const empty = chars.length + kanji.length + patterns.length + words.length === 0;
  const hidden = covered && peek !== `${lesson.id}:${reached}`;

  return (
    <section className="bg-sf px-6 py-6" aria-labelledby="sciaga">
      <h2 id="sciaga" className="mb-2 text-xl font-bold">
        Ściąga z lekcji
      </h2>
      {empty ? (
        <p className="text-base text-mu">Tu zbierze się to, co poznasz w kolejnych krokach.</p>
      ) : hidden ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-base text-mu">Zakryta na czas ćwiczenia, żeby nie podglądać.</p>
          <button
            type="button"
            className="cursor-pointer text-base underline underline-offset-4"
            onClick={() => setPeek(`${lesson.id}:${reached}`)}
          >
            Pokaż mimo to
          </button>
        </div>
      ) : (
        <div className="rise flex flex-col gap-4">
          {chars.length > 0 && (
            <ul className="grid grid-cols-5 gap-1.5">
              {chars.map((c) => (
                <li key={c} className="flex flex-col items-center bg-bg py-1.5">
                  <span lang="ja" className="jp text-[24px] leading-tight font-semibold">
                    {c}
                  </span>
                  <span className="text-[14px]">{romajiOf(c)}</span>
                </li>
              ))}
            </ul>
          )}
          {kanji.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {kanji.map((k) => (
                <li key={k.kanji} className="flex items-baseline gap-2">
                  <span lang="ja" className="jp text-[22px] font-semibold">
                    {k.kanji}
                  </span>
                  <span className="truncate text-[15px]">{k.meaning.split(/[,;]/)[0]}</span>
                </li>
              ))}
            </ul>
          )}
          {patterns.length > 0 && (
            <ul className="flex flex-col gap-2">
              {patterns.map((b, i) => (
                <li key={i} className="border-l-[3px] border-ac pl-3">
                  <Ja text={b.pattern} size="sm" className="font-semibold" />
                  <span className="block text-[15px]">{b.meaning}</span>
                </li>
              ))}
            </ul>
          )}
          {words.length > 0 && (
            <ul>
              {words.map((w) => (
                <li key={w.id} className="flex items-center justify-between gap-3 border-b border-ln py-1.5">
                  <Ja text={w.ja} size="sm" className="font-semibold" />
                  <span className="text-right text-base">{w.pl}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export function LessonAside({ lesson, reached = 1, covered = false }: { lesson: Lesson; reached?: number; covered?: boolean }) {
  const { progress, update } = useProgress();
  const saved = progress.notes[lesson.id]?.text ?? "";
  // The draft belongs to one lesson; Next may reuse this component for the next lesson.
  const [draft, setDraft] = useState<{ lessonId: string; text: string } | null>(null);
  const value = draft?.lessonId === lesson.id ? draft.text : saved;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = (text: string) => {
    const lessonId = lesson.id;
    setDraft({ lessonId, text });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => update((p) => setNote(p, lessonId, text, new Date())), 500);
  };

  return (
    <aside className="flex flex-col gap-5">
      <CheatSheet lesson={lesson} reached={reached} covered={covered} />
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
