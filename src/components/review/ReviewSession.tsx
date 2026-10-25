"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Ja } from "@/components/ja/Ja";
import { SpeakButton } from "@/components/ja/SpeakButton";
import { btnDark, btnPrimary, btnSecondary } from "@/components/lesson/exercises/buttons";
import { titleText } from "@/components/lesson/LessonTitle";
import { cardFace } from "@/lib/cards";
import { nextLesson } from "@/lib/lessons";
import { applyReview } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";
import { hash, useClientSeed } from "@/lib/random";
import {
  type CardState,
  dueNow,
  dueSoon,
  formatInterval,
  intervalLabel,
  LADDER,
  LEARNED,
  type Rating,
  RELEARN,
  rate,
  stageLabel,
  stageOf,
  untilNextDue,
} from "@/lib/srs";

const ratings: { rating: Rating; label: string }[] = [
  { rating: "znowu", label: "Znowu" },
  { rating: "trudne", label: "Trudne" },
  { rating: "dobrze", label: "Dobrze" },
  { rating: "latwe", label: "Łatwe" },
];

const stages = [RELEARN, ...LADDER.map((_, i) => i), LEARNED];
/** Cards answered "Znowu" come back within this time; the session offers to take them at once. */
const SOON = 10 * 60_000;

const isTyping = (t: EventTarget | null) => t instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);

/** The thresholds as steps going up: how many cards wait on each one. */
function Ladder({ cards, current }: { cards: Record<string, { card: CardState }>; current?: number }) {
  const counts = new Map<number, number>();
  for (const { card } of Object.values(cards)) counts.set(stageOf(card), (counts.get(stageOf(card)) ?? 0) + 1);
  return (
    <section aria-labelledby="progi" className="bg-sf px-6 py-6 min-[760px]:px-11">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id="progi" className="text-[22px] font-bold">
          Progi powtórek
        </h2>
        <p className="text-base text-mu">„Dobrze” przesuwa kartę o próg wyżej, „Znowu” cofa ją na początek.</p>
      </div>
      <ol className="mt-5 grid grid-cols-3 items-end gap-2 min-[760px]:grid-cols-6">
        {stages.map((s, i) => (
          <li key={s} className="flex flex-col items-start gap-1.5">
            <span className="text-[28px] leading-none font-semibold">{counts.get(s) ?? 0}</span>
            <span
              aria-hidden="true"
              className={`block w-full transition-colors duration-300 ${s === current ? "bg-ac" : s === LEARNED ? "bg-ok" : "bg-ln"}`}
              style={{ height: `${10 + i * 9}px` }}
            />
            <span className={`text-[15px] ${s === current ? "font-bold" : ""}`}>
              {s === RELEARN || s === LEARNED ? stageLabel(s) : `za ${stageLabel(s)}`}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ReviewSession() {
  const { progress, update } = useProgress();
  const seed = useClientSeed();
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState(0);
  const [takeSoon, setTakeSoon] = useState(false);
  const cards = progress.cards;
  const known = (id: string) => cardFace(id) !== undefined;

  // Unknown ids (e.g. a word removed from the course) are skipped rather than shown blank.
  const due = dueNow(cards).filter(known);
  const soon = due.length === 0 && Object.keys(cards).length > 0 ? dueSoon(cards, new Date(), SOON).filter(known) : [];
  // A random but steady order for this visit, so cards are not remembered by their position.
  const queue = [...due, ...(takeSoon ? soon : [])].sort((a, b) => hash(a + seed) - hash(b + seed));
  const id = queue[0];
  const revealed = id !== undefined && revealedId === id;

  const answer = (r: Rating) => {
    const at = new Date();
    const card = cards[id].card;
    update((p) => applyReview(p, id, rate(card, r, at), at));
    setReviewed((n) => n + 1);
    setRevealedId(null);
  };

  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.altKey || e.ctrlKey || e.metaKey) return;
      if (!revealed && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setRevealedId(id);
      } else if (revealed && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        answer(ratings[Number(e.key) - 1].rating);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!id) {
    const next = nextLesson(progress);
    const total = Object.keys(cards).length;
    const wait = total > 0 ? untilNextDue(cards, new Date()) : undefined;
    return (
      <div className="flex flex-col gap-5">
        <div className="rise bg-sf px-6 py-10 min-[760px]:px-11">
          <p role="status" className="text-[26px] font-bold">
            {total === 0 ? "Nie masz jeszcze nic do powtórki." : reviewed > 0 ? "Na teraz wszystko powtórzone." : "Teraz nic nie czeka na powtórkę."}
          </p>
          {reviewed > 0 && <p className="mt-2 text-[19px]">Powtórzone karty: {reviewed}.</p>}
          {soon.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <p>Za chwilę wrócą karty z odpowiedzią „Znowu”: {soon.length}.</p>
              <button type="button" className={btnPrimary} onClick={() => setTakeSoon(true)}>
                Powtórz je teraz
              </button>
            </div>
          ) : (
            wait !== undefined && (
              <p className="mt-3 text-[19px]">
                Następna powtórka za <strong>{formatInterval(wait)}</strong>.
              </p>
            )
          )}
          <p className="mt-4 max-w-[60ch] text-mu">
            Słowa i znaki trafiają tu po ukończeniu lekcji. Pierwszy raz wracają po 30 minutach, potem po 3 godzinach, po dniu
            i po 3 dniach. Dalej odstępy rosną same, tuż przed chwilą, w której byś je zapomniał.
          </p>
          {next && (
            <Link href={`/kursy/${next.id}`} className={`${btnDark} mt-6 no-underline`}>
              Następna lekcja: {titleText(next.title)}
            </Link>
          )}
        </div>
        {total > 0 && <Ladder cards={cards} />}
      </div>
    );
  }

  const face = cardFace(id)!;
  const card = cards[id].card;
  const now = new Date();

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-sf px-6 py-8 min-[760px]:px-11">
        <div className="flex flex-wrap items-center justify-between gap-3 text-base">
          <span className="text-mu">Zostało: {queue.length}</span>
          <span className="bg-as px-2.5 py-0.5">
            {face.tag} · próg: {stageLabel(stageOf(card))}
          </span>
        </div>

        <div key={id} className="rise flex min-h-[200px] flex-col items-center justify-center py-6 text-center">
          <Ja text={face.front} size="xl" className="font-semibold [&_.jp]:text-[80px] [&_.jp]:leading-tight" />
        </div>

        <div className="min-h-[124px]">
          {revealed ? (
            <>
              <div className="rise -mt-4 mb-4 flex justify-center">
                <SpeakButton text={face.speech} />
              </div>
              <dl className="rise grid border-t-2 border-ink min-[760px]:grid-cols-2">
                <div className="flex flex-col gap-1 border-b border-ln py-4 min-[760px]:border-r min-[760px]:border-b-0 min-[760px]:pr-6">
                  <dt className="text-[15px] text-mu">{face.readingLabel}</dt>
                  <dd lang={face.tag === "kanji" ? "ja" : undefined} className="jp text-[26px] font-semibold">
                    {face.reading}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-4 min-[760px]:pl-6">
                  <dt className="text-[15px] text-mu">{face.meaningLabel}</dt>
                  <dd className="text-[26px] font-semibold">{face.meaning}</dd>
                </div>
              </dl>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 pt-4">
              <button type="button" className={btnDark} onClick={() => setRevealedId(id)}>
                Pokaż odpowiedź
              </button>
              <span className="hidden text-[14px] text-mu min-[1000px]:block">albo spacja</span>
            </div>
          )}
        </div>

        {revealed && (
          <div className="rise mt-2 grid grid-cols-2 gap-2.5 min-[760px]:grid-cols-4">
            {ratings.map((r, i) => (
              <button
                key={r.rating}
                type="button"
                className={`${r.rating === "dobrze" ? btnDark : btnSecondary} relative flex-col py-2`}
                onClick={() => answer(r.rating)}
              >
                <span aria-hidden="true" className="absolute top-1 left-2 text-[12px] font-normal opacity-50 max-[999px]:hidden">
                  {i + 1}
                </span>
                <span>{r.label}</span>
                <span className="text-[13px] font-normal opacity-75">{intervalLabel(card, r.rating, now)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <Ladder cards={cards} current={stageOf(card)} />
    </div>
  );
}
