"use client";

import { useState } from "react";
import type { Exercise } from "@/content/schema";
import { btnDark } from "./buttons";

type KanaExercise = Extract<Exercise, { type: "kana" }>;

/** Deterministic answer options: the right one plus neighbours from the same set, rotated by position. */
export function kanaOptions(items: { romaji: string }[], index: number, count: number): string[] {
  const pool = [...new Set(items.map((i) => i.romaji))];
  const right = items[index].romaji;
  const others = pool.filter((r) => r !== right);
  const picked = Array.from({ length: Math.min(count - 1, others.length) }, (_, k) => others[(index + k) % others.length]);
  const slot = index % (picked.length + 1);
  return [...picked.slice(0, slot), right, ...picked.slice(slot)];
}

export function KanaQuiz({ exercise, onDone }: { exercise: KanaExercise; onDone?: (score: number, total: number) => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const total = exercise.items.length;
  const item = exercise.items[index];
  const last = index === total - 1;

  if (finished) {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <p role="status" className="text-[26px] font-bold">
          Wynik: {score} z {total}
        </p>
        <button
          type="button"
          className={btnDark}
          onClick={() => {
            setIndex(0);
            setScore(0);
            setPicked(null);
            setFinished(false);
          }}
        >
          Jeszcze raz
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <p className="text-[15px] text-mu">
        Znak {index + 1} z {total}
      </p>
      <p className="my-4 text-center">
        <span data-testid="kana-quiz-char" lang="ja" className="jp text-[120px] leading-none font-semibold">
          {item.kana}
        </span>
      </p>
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
        {kanaOptions(exercise.items, index, exercise.choices).map((o) => {
          const tone = !picked
            ? "bg-bg text-ink"
            : o === item.romaji
              ? "bg-ok text-sf"
              : o === picked
                ? "bg-ac text-aci"
                : "bg-bg text-mu";
          return (
            <button
              key={o}
              type="button"
              disabled={picked !== null}
              onClick={() => {
                setPicked(o);
                if (o === item.romaji) setScore(score + 1);
              }}
              className={`min-h-16 cursor-pointer text-[22px] font-semibold disabled:cursor-default ${tone}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex min-h-12 justify-center">
        {picked && (
          <button
            type="button"
            className={btnDark}
            onClick={() => {
              if (last) {
                setFinished(true);
                onDone?.(score, total);
              } else {
                setIndex(index + 1);
                setPicked(null);
              }
            }}
          >
            {last ? "Pokaż wynik" : "Dalej"}
          </button>
        )}
      </div>
    </div>
  );
}
