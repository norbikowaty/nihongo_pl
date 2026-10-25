"use client";

import Link from "next/link";
import { Ja } from "@/components/ja/Ja";
import { btnPrimary, btnSecondary } from "@/components/lesson/exercises/buttons";
import { LessonTitle } from "@/components/lesson/LessonTitle";
import { courses } from "@/content/catalog";
import { nextLesson } from "@/lib/lessons";
import { useProgress } from "@/lib/progress/useProgress";
import { dueNow } from "@/lib/srs";

/** "Today": the next lesson and the reviews due. The server renders the new-visitor version; the browser swaps in saved progress. */
export function TodayBlock() {
  const { progress } = useProgress();
  const lesson = nextLesson(progress);
  const due = dueNow(progress.cards).length;
  const started = Object.keys(progress.lessons).length > 0;

  const course = lesson && courses.find((c) => c.id === lesson.course);
  const section = course?.sections.find((s) => s.id === lesson?.section);
  const saved = lesson && progress.lessons[lesson.id];
  const step = saved?.status === "started" ? saved.step : 1;
  const intro = lesson?.steps.find((s) => s.kind === "intro");

  return (
    <section className="bg-sf px-6 py-10 min-[760px]:px-11">
      <div className="grid gap-10 min-[760px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3.5">
          {lesson ? (
            <>
              <p className="text-base text-mu">
                {started ? "Twoja lekcja" : "Pierwsza lekcja"} · {course?.title}
                {section && ` · ${section.title}`}
              </p>
              <h1 className="text-[38px] leading-tight font-bold tracking-[-0.02em]">
                <LessonTitle title={lesson.title} />
              </h1>
              {intro && <Ja text={intro.sentence.ja} size="lg" />}
              <div className="flex items-center gap-3.5">
                <div className="h-[5px] flex-1 overflow-hidden bg-ln">
                  <span className="block h-full bg-ac transition-[width] duration-500 ease-out" style={{ width: `${((step - 1) / lesson.steps.length) * 100}%` }} />
                </div>
                <span className="text-[15px]">
                  krok {step} z {lesson.steps.length}
                </span>
              </div>
              <div>
                <Link href={`/kursy/${lesson.id}${step > 1 ? `?krok=${step}` : ""}`} className={`${btnPrimary} no-underline`}>
                  {started ? "Kontynuuj lekcję" : "Zacznij od hiragany"}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-[38px] leading-tight font-bold">Wszystkie lekcje ukończone</h1>
              <p>Nowe lekcje pojawią się w spisie kursów. Do tego czasu zostają powtórki.</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2.5 min-[760px]:border-l min-[760px]:border-ln min-[760px]:pl-10">
          <h2 className="text-[22px] font-bold">Powtórki</h2>
          <span className="text-[52px] leading-none font-semibold">{due}</span>
          <span className="text-[17px]">
            {due === 0 ? "Brak powtórek na dziś" : `około ${Math.max(1, Math.round(due / 2))} min`}
          </span>
          <div className="mt-auto">
            <Link href="/powtorki" className={`${btnSecondary} no-underline`}>
              Zacznij powtórkę
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
