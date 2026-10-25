"use client";

import { useState } from "react";
import { Ja } from "@/components/ja/Ja";
import { Prose } from "@/components/ja/Prose";
import type { Exercise } from "@/content/schema";

type ChoiceExercise = Extract<Exercise, { type: "choice" }>;

export function Choice({ exercise, onAnswer }: { exercise: ChoiceExercise; onAnswer?: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const ok = picked === exercise.answer;

  return (
    <div className="border-b border-ln py-6">
      <Prose text={exercise.prompt} className="text-[20px]" />
      {exercise.ja && <Ja text={exercise.ja} size="lg" className="mt-2" />}
      <div className="mt-4 grid grid-cols-2 gap-2.5 min-[760px]:grid-cols-4">
        {exercise.options.map((o, i) => {
          const tone = !answered
            ? "bg-bg text-ink"
            : i === exercise.answer
              ? "bg-ok text-sf"
              : i === picked
                ? "bg-ac text-aci"
                : "bg-bg text-mu";
          return (
            <button
              key={o}
              type="button"
              disabled={answered}
              onClick={() => {
                setPicked(i);
                onAnswer?.(i === exercise.answer);
              }}
              className={`jp min-h-14 cursor-pointer px-4 text-[22px] font-semibold disabled:cursor-default ${tone}`}
            >
              <span lang="ja">{o}</span>
            </button>
          );
        })}
      </div>
      <p role="status" className={`mt-3 min-h-[1.6em] ${ok ? "text-ok" : "text-ac"}`}>
        {answered && (
          <>
            <strong>{ok ? "Dobrze." : `Prawidłowo: ${exercise.options[exercise.answer]}.`}</strong> {exercise.why}
          </>
        )}
      </p>
    </div>
  );
}
