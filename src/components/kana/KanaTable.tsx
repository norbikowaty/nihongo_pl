"use client";

import { useState } from "react";
import { hiragana, hiraganaDakuten, hiraganaYoon, type KanaRow, katakana, katakanaDakuten, katakanaYoon } from "@/content/kana";

const tables = {
  hiragana: { label: "Hiragana", base: hiragana, dakuten: hiraganaDakuten, yoon: hiraganaYoon },
  katakana: { label: "Katakana", base: katakana, dakuten: katakanaDakuten, yoon: katakanaYoon },
} as const;

type Script = keyof typeof tables;

function Cell({ kana, romaji }: { kana: string; romaji: string }) {
  return (
    <div data-testid="kana-cell" className="flex aspect-square flex-col items-center justify-center bg-sf">
      <span lang="ja" className="jp text-[clamp(24px,3vw,40px)] leading-tight font-semibold">
        {kana}
      </span>
      <span className="text-[14px] text-mu">{romaji}</span>
    </div>
  );
}

/** Columns of the gojūon table read right to left, as in Japanese textbooks: あ, か, さ… */
function Gojuon({ rows }: { rows: readonly KanaRow[] }) {
  return (
    <div className="grid grid-cols-11 gap-1.5 [direction:rtl] max-[760px]:grid-cols-6">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col gap-1.5 [direction:ltr]">
          {row.cells.map((c, j) =>
            c ? <Cell key={j} {...c} /> : <div key={j} aria-hidden="true" className="aspect-square bg-sf opacity-40" />,
          )}
        </div>
      ))}
    </div>
  );
}

function Extra({ title, rows }: { title: string; rows: readonly KanaRow[] }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-5 gap-1.5 min-[760px]:grid-cols-10">
        {rows.flatMap((r) => r.cells).map((c, i) =>
          c ? (
            <div key={i} className="flex flex-col items-center bg-sf py-3">
              <span lang="ja" className="jp text-[26px] font-semibold">
                {c.kana}
              </span>
              <span className="text-[14px] text-mu">{c.romaji}</span>
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
}

export function KanaTable() {
  const [script, setScript] = useState<Script>("hiragana");
  const t = tables[script];
  return (
    <div>
      <div role="group" aria-label="Pismo" className="mb-8 flex gap-1.5">
        {(Object.keys(tables) as Script[]).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={s === script}
            onClick={() => setScript(s)}
            className={`min-h-11 cursor-pointer px-5 font-semibold ${s === script ? "bg-ink text-bg" : "bg-sf text-ink"}`}
          >
            {tables[s].label}
          </button>
        ))}
      </div>
      <h2 className="sr-only">{t.label}: podstawowe znaki</h2>
      <Gojuon rows={t.base} />
      <Extra title="Znaki dźwięczne" rows={t.dakuten} />
      <Extra title="Połączenia z małymi znakami" rows={t.yoon} />
    </div>
  );
}
