"use client";

import { useEffect, useRef, useState } from "react";
import type { Exercise } from "@/content/schema";
import { answerTask, type KanaItem, startTrainer, type Trainer, trainerFinished } from "@/lib/trainer";
import { btnDark, btnPrimary } from "./buttons";

type KanaExercise = Extract<Exercise, { type: "kana" }>;

const ADVANCE_MS = 650;

const isTyping = (t: EventTarget | null) => t instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);

/**
 * Drill until every character is known: each new character both ways, a few from earlier lessons,
 * random order, and wrong answers come back. Keys 1–6 pick an option, Enter goes on.
 */
export function KanaTrainer({ exercise, onDone }: { exercise: KanaExercise; onDone?: (correct: number, total: number) => void }) {
  const review = exercise.review ?? [];
  const pool: KanaItem[] = [...exercise.items, ...review];
  const count = exercise.choices;
  const [t, setT] = useState<Trainer | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [planned, setPlanned] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nextButton = useRef<HTMLButtonElement>(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const task = t?.queue[0];
  const answer = task ? (task.dir === "read" ? task.item.romaji : task.item.kana) : "";

  const start = () => {
    const fresh = startTrainer(exercise.items, review, count, Math.random);
    setT(fresh);
    setPlanned(fresh.total);
    setPicked(null);
  };

  const advance = (from: Trainer, ok: boolean) => {
    clearTimeout(timer.current);
    const next = answerTask(from, ok, pool, count, Math.random);
    setT(next);
    setPicked(null);
    if (trainerFinished(next)) onDone?.(next.correct, next.total);
  };

  const pick = (option: string) => {
    if (!t || picked) return;
    setPicked(option);
    const ok = option === answer;
    if (ok) timer.current = setTimeout(() => advance(t, true), ADVANCE_MS);
    else requestAnimationFrame(() => nextButton.current?.focus());
  };

  useEffect(() => {
    if (!t || trainerFinished(t)) return;
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.altKey || e.ctrlKey || e.metaKey) return;
      const n = Number.parseInt(e.key, 10);
      if (!picked && n >= 1 && n <= t.options.length) {
        e.preventDefault();
        pick(t.options[n - 1]);
      } else if (picked && e.key === "Enter" && document.activeElement !== nextButton.current) {
        e.preventDefault();
        advance(t, picked === answer);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!t) {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center gap-4 py-6 text-center">
        <h2 className="text-[28px] font-bold">Trening znaków</h2>
        <p className="max-w-[46ch]">
          Każdy nowy znak zobaczysz dwa razy: raz odczytasz go, raz znajdziesz po rōmaji.
          {review.length > 0 && " Dojdzie kilka znaków z poprzednich lekcji."} Błędne odpowiedzi wracają, aż je opanujesz.
        </p>
        <button type="button" className={`${btnPrimary} mt-2`} onClick={start}>
          Zacznij trening
        </button>
      </div>
    );
  }

  if (trainerFinished(t)) {
    const mistakes = t.total - planned;
    const romaji = (kana: string) => pool.find((p) => p.kana === kana)?.romaji ?? "";
    return (
      <div className="rise flex min-h-[380px] flex-col items-center justify-center gap-4 py-6 text-center">
        <p role="status" className="text-[28px] font-bold">
          {mistakes === 0 ? "Bez pomyłki!" : "Trening ukończony"}
        </p>
        <p className="text-[19px]">
          {planned} pytań{mistakes > 0 && `, pomyłki: ${mistakes}`}
        </p>
        {t.missed.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-base text-mu">Te znaki sprawiły kłopot:</p>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {t.missed.map((k) => (
                <li key={k} className="flex min-w-16 flex-col items-center bg-bg px-3 py-2">
                  <span lang="ja" className="jp text-[32px] leading-tight font-semibold">
                    {k}
                  </span>
                  <span className="text-base">{romaji(k)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" className={`${btnDark} mt-2`} onClick={start}>
          Jeszcze raz
        </button>
      </div>
    );
  }

  const current = task!;
  const ok = picked === answer;
  const read = current.dir === "read";
  const chosen = picked && !ok ? pool.find((p) => (read ? p.romaji : p.kana) === picked) : undefined;

  return (
    <div className="py-2">
      <div className="flex items-center gap-3.5">
        <div className="h-[5px] flex-1 overflow-hidden bg-ln">
          <span
            className="block h-full bg-ac transition-[width] duration-300 ease-out"
            style={{ width: `${(t.done / t.total) * 100}%` }}
          />
        </div>
        <span className="text-[15px] text-mu">
          {t.done} / {t.total}
        </span>
      </div>

      <div key={`${t.done}`} className="rise flex min-h-[210px] flex-col items-center justify-center gap-1 pt-6 pb-4 text-center">
        <p className="text-[17px] text-mu">
          {read ? "Jak to czytasz?" : "Który to znak?"}
          {current.review && <span className="ml-2 bg-as px-2 py-0.5 text-[14px] text-ink">z poprzednich lekcji</span>}
        </p>
        {read ? (
          <span data-testid="trainer-prompt" lang="ja" className="jp text-[120px] leading-none font-semibold">
            {current.item.kana}
          </span>
        ) : (
          <span data-testid="trainer-prompt" className="text-[72px] leading-tight font-semibold">
            {current.item.romaji}
          </span>
        )}
      </div>

      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
        {t.options.map((o, i) => {
          const tone = !picked
            ? "bg-bg text-ink hover:bg-as"
            : o === answer
              ? "bg-ok text-sf"
              : o === picked
                ? "bg-ac text-aci"
                : "bg-bg text-mu opacity-60";
          return (
            <button
              key={o}
              type="button"
              disabled={picked !== null}
              onClick={() => pick(o)}
              className={`relative min-h-16 cursor-pointer font-semibold transition-colors duration-200 disabled:cursor-default ${
                read ? "text-[24px]" : "jp text-[36px]"
              } ${tone}`}
            >
              <span aria-hidden="true" className="absolute top-1.5 left-2.5 font-serif text-[12px] font-normal opacity-50">
                {i + 1}
              </span>
              <span lang={read ? undefined : "ja"}>{o}</span>
            </button>
          );
        })}
      </div>

      <div role="status" className="mx-auto mt-5 flex min-h-[88px] max-w-md flex-col items-center justify-center text-center">
        {picked && (
          <div className={`rise flex w-full flex-col items-center gap-1 px-4 py-3 ${ok ? "text-ok" : "bg-as text-ink"}`}>
            {ok ? (
              <p className="text-[20px] font-bold">
                Dobrze: <span lang="ja" className="jp">{current.item.kana}</span> = {current.item.romaji}
              </p>
            ) : (
              <>
                <p className="text-[20px]">
                  <strong className="text-ac">Nie.</strong>{" "}
                  <span lang="ja" className="jp text-[28px] font-semibold">
                    {current.item.kana}
                  </span>{" "}
                  czytasz <strong>{current.item.romaji}</strong>. Ten znak wróci za chwilę.
                </p>
                {chosen && (
                  <p className="text-base text-mu">
                    Twój wybór:{" "}
                    <span lang="ja" className="jp">
                      {chosen.kana}
                    </span>{" "}
                    to {chosen.romaji}
                  </p>
                )}
                <button ref={nextButton} type="button" className={`${btnDark} mt-2`} onClick={() => advance(t, false)}>
                  Dalej
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
