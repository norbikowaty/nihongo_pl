"use client";

import Link from "next/link";
import { useState } from "react";
import { Ja } from "@/components/ja/Ja";
import { titleText } from "@/components/lesson/LessonTitle";
import { cardFace } from "@/lib/cards";
import { nextLesson } from "@/lib/lessons";
import { applyReview } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";
import { dueNow, intervalLabel, type Rating, rate } from "@/lib/srs";
import { btnDark, btnSecondary } from "@/components/lesson/exercises/buttons";

const ratings: { rating: Rating; label: string }[] = [
  { rating: "znowu", label: "Znowu" },
  { rating: "trudne", label: "Trudne" },
  { rating: "dobrze", label: "Dobrze" },
  { rating: "latwe", label: "Łatwe" },
];

export function ReviewSession() {
  const { progress, update } = useProgress();
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState(0);
  // Unknown ids (e.g. a word removed from the course) are skipped rather than shown blank.
  const queue = dueNow(progress.cards).filter((id) => cardFace(id));
  const id = queue[0];

  if (!id) {
    const next = nextLesson(progress);
    return (
      <div className="bg-sf px-6 py-10 min-[760px]:px-11">
        <p role="status" className="text-[24px] font-bold">
          {reviewed > 0 ? "Powtórki na dziś zrobione." : "Nie masz dziś nic do powtórki."}
        </p>
        <p className="mt-3 max-w-[52ch]">
          Słowa i znaki trafiają tu po ukończeniu lekcji i wracają tuż przed chwilą, w której byś je zapomniał.
        </p>
        {next && (
          <Link href={`/kursy/${next.id}`} className={`${btnDark} mt-6 no-underline`}>
            Następna lekcja: {titleText(next.title)}
          </Link>
        )}
      </div>
    );
  }

  const now = new Date();
  const face = cardFace(id)!;
  const card = progress.cards[id].card;
  const revealed = revealedId === id;

  return (
    <div className="bg-sf px-6 py-8 min-[760px]:px-11">
      <p className="text-base text-mu">{queue.length} do powtórki</p>
      <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 py-8 text-center">
        <Ja text={face.front} size="xl" className="[&_.jp]:text-[72px] font-semibold" />
        {revealed && (
          <>
            <p className="text-[24px] text-mu">{face.reading}</p>
            <p className="text-[26px] font-semibold">{face.meaning}</p>
          </>
        )}
      </div>
      {!revealed ? (
        <div className="flex justify-center">
          <button type="button" className={btnDark} onClick={() => setRevealedId(id)}>
            Pokaż odpowiedź
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 min-[760px]:grid-cols-4">
          {ratings.map((r) => (
            <button
              key={r.rating}
              type="button"
              className={`${r.rating === "dobrze" ? btnDark : btnSecondary} flex-col py-2`}
              onClick={() => {
                const at = new Date();
                update((p) => applyReview(p, id, rate(card, r.rating, at), at));
                setReviewed(reviewed + 1);
                setRevealedId(null);
              }}
            >
              <span>{r.label}</span>
              <span className="text-[13px] font-normal opacity-75">{intervalLabel(card, r.rating, now)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
