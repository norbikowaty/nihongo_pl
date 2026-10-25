"use client";

import { useState } from "react";
import type { Exercise, JaText } from "@/content/schema";
import { order, useClientSeed } from "@/lib/random";
import { btnPrimary, btnSecondary, jaText } from "./buttons";

type Build = Extract<Exercise, { type: "build" }>;

// The server renders a fixed mixed order; the browser then shuffles the tiles anew on every visit.
function tileOrder(n: number, seed: number, salt: string, answer: number[]): number[] {
  if (seed === 0) return Array.from({ length: n }, (_, i) => i).sort((a, b) => ((a * 7 + 3) % n) - ((b * 7 + 3) % n));
  const ids = order(n, seed, salt);
  // Never lay the tiles out already solved.
  return answer.every((a, i) => ids[i] === a) ? ids.reverse() : ids;
}

function Tile({ ja, filled, label, onClick }: { ja: JaText; filled: boolean; label: string; onClick: () => void }) {
  const reading = ja.segs.map((s) => s.r ?? "").join("");
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex min-h-[72px] cursor-pointer flex-col items-center justify-center px-[18px] py-1 leading-tight transition-transform hover:-translate-y-0.5 motion-reduce:transition-none ${
        filled ? "bg-ink text-bg" : "bg-sf text-ink shadow-[inset_0_0_0_2px_var(--ink)]"
      }`}
    >
      <span className="rd jp min-h-[1.2em] text-xs opacity-70">{reading || " "}</span>
      <span lang="ja" className="jp text-[26px] font-semibold">
        {jaText(ja.segs)}
      </span>
      <span className="rm text-[13px] not-italic">{ja.romaji}</span>
    </button>
  );
}

export function SentenceBuilder({ exercise, onDone }: { exercise: Build; onDone?: (ok: boolean) => void }) {
  const [built, setBuilt] = useState<number[]>([]);
  const [result, setResult] = useState<"ok" | "bad" | null>(null);
  const tiles = tileOrder(exercise.tiles.length, useClientSeed(), exercise.prompt, exercise.answer);
  const ok = built.join(",") === exercise.answer.join(",");
  const first = jaText(exercise.tiles[exercise.answer[0]].ja.segs);
  const second = exercise.answer[1] !== undefined ? jaText(exercise.tiles[exercise.answer[1]].ja.segs) : "";

  return (
    <div>
      <p className="text-[22px]">
        Ułóż zdanie: <strong>{exercise.prompt}</strong>
      </p>
      <div className="mt-5 flex min-h-[100px] flex-wrap items-center gap-2.5 bg-bg p-3.5">
        {built.map((i, pos) => (
          <Tile
            key={`${i}-${pos}`}
            ja={exercise.tiles[i].ja}
            filled
            label={`Usuń ${jaText(exercise.tiles[i].ja.segs)}`}
            onClick={() => {
              setBuilt(built.filter((_, p) => p !== pos));
              setResult(null);
            }}
          />
        ))}
        {built.length === 0 && <span className="pl-2 text-[17px]">Kliknij słowa poniżej we właściwej kolejności.</span>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {tiles
          .filter((i) => !built.includes(i))
          .map((i) => (
            <Tile
              key={i}
              ja={exercise.tiles[i].ja}
              filled={false}
              label={jaText(exercise.tiles[i].ja.segs)}
              onClick={() => {
                setBuilt([...built, i]);
                setResult(null);
              }}
            />
          ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3.5">
        <button
          type="button"
          className={btnPrimary}
          onClick={() => {
            setResult(ok ? "ok" : "bad");
            onDone?.(ok);
          }}
        >
          Sprawdź
        </button>
        <button
          type="button"
          className={btnSecondary}
          onClick={() => {
            setBuilt([]);
            setResult(null);
          }}
        >
          Od nowa
        </button>
        <span role="status" className={`text-[19px] ${result === "ok" ? "text-ok" : "text-ac"}`}>
          {result && (
            <span key={result} className="rise block">
              {result === "ok"
                ? `Dobrze: ${exercise.answer.map((i) => jaText(exercise.tiles[i].ja.segs)).join("")}`
                : `Jeszcze nie. Zacznij od ${first}${second ? `, potem ${second}` : ""}.`}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
