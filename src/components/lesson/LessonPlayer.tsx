"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { courses } from "@/content/catalog";
import type { Exercise, Lesson } from "@/content/schema";
import { clampStep, nextLessonId, stepLabel, testPassed } from "@/lib/lessons";
import { completeLesson, setLessonStep } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";
import { Choice } from "./exercises/Choice";
import { btnDark, btnPrimary, btnSecondary } from "./exercises/buttons";
import { LessonAside } from "./LessonAside";
import { LessonTitle } from "./LessonTitle";
import { StepView } from "./Steps";

function Breadcrumb({ lesson }: { lesson: Lesson }) {
  const course = courses.find((c) => c.id === lesson.course)!;
  const section = course.sections.find((s) => s.id === lesson.section);
  return (
    <p className="text-base text-mu">
      <Link href={`/kursy#${course.id}`} className="text-mu underline underline-offset-4">
        {course.title}
      </Link>
      {section && <> / {section.title}</>}
    </p>
  );
}

function useFinish(lesson: Lesson) {
  const { update } = useProgress();
  const router = useRouter();
  return () => {
    let next: string | undefined;
    update((p) => {
      const done = completeLesson(p, lesson, new Date());
      next = nextLessonId(done);
      return done;
    });
    router.push(next ? `/kursy/${next}` : "/kursy");
  };
}

function TestRunner({ lesson }: { lesson: Lesson }) {
  const items = lesson.steps.flatMap((s) => (s.kind === "exercise" ? s.items : []));
  const choices = items.filter((e): e is Extract<Exercise, { type: "choice" }> => e.type === "choice");
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const { update } = useProgress();
  const answered = Object.keys(answers).length;
  const correct = Object.values(answers).filter(Boolean).length;
  const finished = answered === choices.length;
  const passed = finished && testPassed(correct, choices.length);

  useEffect(() => {
    if (passed) update((p) => completeLesson(p, lesson, new Date()));
  }, [passed, lesson, update]);

  return (
    <div className="mt-6 bg-sf px-6 py-8 min-[760px]:px-11">
      {choices.map((ex, i) => (
        <Choice key={i} exercise={ex} onAnswer={(ok) => setAnswers((a) => ({ ...a, [i]: ok }))} />
      ))}
      <div role="status" className="mt-8 min-h-12">
        {finished && (
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-[24px] font-bold">
              Wynik: {correct} z {choices.length}. {passed ? "Test zaliczony." : "Do zaliczenia potrzeba 80%."}
            </p>
            <Link href="/kursy" className={btnDark}>
              Spis kursów
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/** Reads ?krok= from the address. Must sit inside <Suspense>; its fallback is LessonPlayer with no address. */
export function LessonPlayerFromAddress({ lesson }: { lesson: Lesson }) {
  const params = useSearchParams();
  return <LessonPlayer lesson={lesson} krok={params.get("krok")} paramStr={params.toString()} />;
}

export function LessonPlayer({ lesson, krok = null, paramStr = "" }: { lesson: Lesson; krok?: string | null; paramStr?: string }) {
  const router = useRouter();
  const { update } = useProgress();
  const finish = useFinish(lesson);
  const top = useRef<HTMLHeadingElement>(null);
  const total = lesson.steps.length;
  // A click updates the step at once; the address catches up a moment later. A request made
  // under an older address (e.g. before the browser's back button) is ignored.
  const [requested, setRequested] = useState<{ from: string; step: number } | null>(null);
  const step = requested?.from === paramStr ? requested.step : clampStep(krok, total);
  const current = lesson.steps[step - 1];

  const goTo = (n: number) => {
    setRequested({ from: paramStr, step: n });
    router.replace(`?krok=${n}`, { scroll: false });
    update((p) => setLessonStep(p, lesson.id, n, new Date()));
    top.current?.scrollIntoView({ block: "start" });
  };

  if (lesson.kind === "test") {
    return (
      <div className="mx-auto max-w-[900px] px-4 pt-12 pb-20 min-[1000px]:px-10">
        <Breadcrumb lesson={lesson} />
        <h1 ref={top} className="mt-2 text-[42px] leading-tight font-bold tracking-[-0.02em]">
          <LessonTitle title={lesson.title} />
        </h1>
        <TestRunner lesson={lesson} />
      </div>
    );
  }

  const nextLabel = step === total ? "Zakończ lekcję" : step === total - 1 ? "Podsumowanie" : "Dalej";

  return (
    <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-4 pt-12 pb-20 min-[1000px]:grid-cols-[minmax(0,1fr)_320px] min-[1000px]:px-10">
      <div className="min-w-0">
        <Breadcrumb lesson={lesson} />
        <h1 ref={top} className="mt-2 scroll-mt-24 text-[42px] leading-tight font-bold tracking-[-0.02em]">
          <LessonTitle title={lesson.title} />
        </h1>
        <div role="tablist" aria-label="Kroki lekcji" className="mt-7 flex gap-3.5">
          {lesson.steps.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Krok ${i + 1}: ${stepLabel(s.kind)}`}
              aria-selected={i + 1 === step}
              onClick={() => goTo(i + 1)}
              className={`flex min-w-0 flex-1 cursor-pointer flex-col gap-2 py-2.5 text-left text-base ${
                i + 1 === step ? "font-bold" : ""
              }`}
            >
              <span
                className={`block h-1 w-full ${i + 1 < step ? "bg-ink" : i + 1 === step ? "bg-ac" : "bg-ln"}`}
              />
              <span className="hidden truncate min-[760px]:block">{stepLabel(s.kind)}</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" aria-label={stepLabel(current.kind)} className="mt-6 min-h-[540px] bg-sf px-6 py-10 min-[760px]:px-11">
          <StepView key={step} step={current} />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className={`${btnSecondary} ${step === 1 ? "invisible" : ""}`}
          >
            Wstecz
          </button>
          <span className="text-base">
            Krok {step} z {total}
          </span>
          <button type="button" onClick={() => (step === total ? finish() : goTo(step + 1))} className={btnPrimary}>
            {nextLabel}
          </button>
        </div>
      </div>
      <div className="min-[1000px]:pt-32">
        <LessonAside lesson={lesson} />
      </div>
    </div>
  );
}
