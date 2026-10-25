"use client";

import { useState } from "react";
import { Ja } from "@/components/ja/Ja";
import { Prose } from "@/components/ja/Prose";
import { SpeakButton } from "@/components/ja/SpeakButton";
import { allKana, hiraganaTwin } from "@/content/kana";
import { kunLabel } from "@/content/kanji";
import type { Exercise, Step } from "@/content/schema";
import type { NewKanji } from "@/lib/kanji";
import { Choice } from "./exercises/Choice";
import { KanaTrainer } from "./exercises/KanaTrainer";
import { SentenceBuilder } from "./exercises/SentenceBuilder";
import { KanaStrokes } from "./KanaStrokes";

const romajiOf = (kana: string) => allKana.find((k) => k.kana === kana)?.romaji ?? "";

/** All exercises of a step; reports once every one has been answered (sentences: built correctly). */
function ExerciseStep({ items, onComplete }: { items: Exercise[]; onComplete?: () => void }) {
  const [done, setDone] = useState<number[]>([]);
  const mark = (i: number) => {
    if (done.includes(i)) return;
    const next = [...done, i];
    setDone(next);
    if (next.length === items.length) onComplete?.();
  };
  return (
    <div className="flex flex-col gap-2">
      {items.map((ex, i) =>
        ex.type === "build" ? (
          <SentenceBuilder key={i} exercise={ex} onDone={(ok) => ok && mark(i)} />
        ) : ex.type === "choice" ? (
          <Choice key={i} exercise={ex} onAnswer={() => mark(i)} />
        ) : (
          <KanaTrainer key={i} exercise={ex} onDone={() => mark(i)} />
        ),
      )}
    </div>
  );
}

/** Kanji the lesson uses for the first time, shown before the lesson goes on. */
function KanjiIntro({ kanji }: { kanji: NewKanji[] }) {
  return (
    <section aria-labelledby="nowe-kanji" className="mt-10 border-t-2 border-ink pt-6">
      <h2 id="nowe-kanji" className="text-[24px] font-bold">
        Nowe kanji w tej lekcji
      </h2>
      <p className="mt-1 max-w-[60ch]">
        Te znaki zobaczysz w zdaniach. Nie musisz ich jeszcze umieć napisać: furigana nad nimi podpowie czytanie, a po
        lekcji trafią do powtórek.
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 min-[760px]:grid-cols-3">
        {kanji.map((k) => (
          <li key={k.kanji} className="flex gap-4 bg-bg p-4">
            <span lang="ja" className="jp text-[52px] leading-none font-semibold">
              {k.kanji}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-semibold">{k.meaning}</span>
              {k.example && (
                <span className="text-[16px]">
                  <span lang="ja" className="jp">
                    {k.example.word}
                  </span>{" "}
                  <span lang="ja" className="jp text-mu">
                    {k.example.reading}
                  </span>
                </span>
              )}
              <span lang="ja" className="jp text-[14px] text-mu">
                {[...k.on, ...k.kun.map(kunLabel)].join("、")}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StepView({ step, kanji = [], onComplete }: { step: Step; kanji?: NewKanji[]; onComplete?: () => void }) {
  switch (step.kind) {
    case "intro":
      return (
        <div>
          <Prose text={step.lead} className="text-[22px]" />
          <div className="mt-8 flex items-start gap-5 bg-bg px-9 py-8">
            <div className="min-w-0">
              <Ja text={step.sentence.ja} size="xl" className="font-semibold" />
              <p className="mt-1 text-[21px]">{step.sentence.pl}</p>
            </div>
            <SpeakButton text={step.sentence.ja} className="mt-4 ml-auto" />
          </div>
          <div className="mt-7">
            <Prose text={step.after} />
          </div>
          {kanji.length > 0 && <KanjiIntro kanji={kanji} />}
        </div>
      );
    case "newKana":
      return (
        <div className="grid grid-cols-2 gap-4 min-[760px]:grid-cols-3">
          {step.chars.map((c) => (
            <div key={c} className="relative flex flex-col items-center gap-2 bg-bg p-5">
              <SpeakButton text={c} size="sm" className="absolute top-2 right-2" />
              <span lang="ja" className="jp text-[72px] leading-none font-semibold">
                {c}
              </span>
              <span className="text-[22px] font-semibold">{romajiOf(c)}</span>
              {hiraganaTwin(c) && (
                <span className="text-base text-mu">
                  w hiraganie{" "}
                  <span lang="ja" className="jp text-ink">
                    {hiraganaTwin(c)}
                  </span>
                </span>
              )}
              <KanaStrokes char={c} />
            </div>
          ))}
        </div>
      );
    case "pattern":
      return (
        <div className="flex flex-col gap-6">
          {step.blocks.map((b, i) => (
            <div key={i} className={`px-9 py-7 ${i === 0 ? "bg-bg" : "bg-as"}`}>
              <Ja text={b.pattern} size={i === 0 ? "xl" : "lg"} className="font-semibold" />
              <p className="mt-1 text-[21px]">{b.meaning}</p>
            </div>
          ))}
          <Prose text={step.explanation} />
        </div>
      );
    case "examples":
      return (
        <ul>
          {step.items.map((e, i) => (
            <li key={i} className="flex items-center gap-5 border-b border-ln py-4">
              <SpeakButton text={e.ja} />
              <div className="flex flex-col">
                <Ja text={e.ja} className="font-semibold" />
                <span>{e.pl}</span>
              </div>
            </li>
          ))}
        </ul>
      );
    case "exercise":
      return <ExerciseStep items={step.items} onComplete={onComplete} />;
    case "summary":
      return (
        <div>
          <h2 className="mb-3.5 text-[26px] font-bold">Umiesz już</h2>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            {step.points.map((p, i) => (
              <li key={i}>
                <Prose text={p} className="inline" />
              </li>
            ))}
          </ul>
          {step.words.length > 0 && (
            <>
              <h2 className="mt-9 mb-2.5 text-[22px] font-bold">Nowe słowa</h2>
              <div className="grid grid-cols-2 gap-x-7 gap-y-2.5 min-[760px]:grid-cols-3">
                {step.words.map((w) => (
                  <div key={w.id} className="flex flex-col py-1.5">
                    <Ja text={w.ja} className="font-semibold" />
                    <span className="text-[17px]">{w.pl}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6">Po zakończeniu lekcji te słowa trafią do powtórek.</p>
            </>
          )}
        </div>
      );
  }
}
