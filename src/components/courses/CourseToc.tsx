"use client";

import Link from "next/link";
import { useEffect } from "react";
import { lessons as allLessons } from "@/content/lessons";
import type { Course, Lesson } from "@/content/schema";
import { courseSummary, lessonState, nextLessonId } from "@/lib/lessons";
import type { Progress } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";

const marks = { done: "✓", current: "●", open: "", soon: "" } as const;

export function CourseToc({
  courses,
  progress,
  available = allLessons,
}: {
  courses: Course[];
  progress: Progress;
  available?: Lesson[];
}) {
  const next = nextLessonId(progress, available);
  const openCourse = next?.split("/")[0];

  // /kursy#gramatyka opens and shows that course.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (el instanceof HTMLDetailsElement) {
      el.open = true;
      el.scrollIntoView();
    }
  }, []);

  return (
    <div>
      {courses.map((c) => {
        const summary = courseSummary(c, progress, available);
        return (
          <details key={c.id} id={c.id} open={c.id === openCourse} className="group border-t-2 border-ink scroll-mt-20">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
              <span lang="ja" className="jp w-10 shrink-0 text-3xl leading-none min-[760px]:w-[52px] min-[760px]:text-4xl">
                {c.glyph}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <h2 className="text-[21px] leading-tight font-bold min-[760px]:text-2xl">{c.title}</h2>
                <span className="text-[17px] text-mu">{c.meta}</span>
              </span>
              <span className={`text-[17px] whitespace-nowrap ${summary.includes("/") ? "text-ac" : "text-mu"}`}>
                {summary}
              </span>
              <svg
                className="shrink-0 transition-transform group-open:rotate-180"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                aria-hidden="true"
              >
                <path d="M1 1l8 8 8-8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </summary>
            <div className="grid gap-x-10 gap-y-5 pb-8 min-[1000px]:grid-cols-3 min-[1000px]:pl-[72px]">
              {c.sections.map((s) => (
                <section key={s.id}>
                  <h3 className="mb-1 text-lg font-bold">{s.title}</h3>
                  <ul>
                    {s.items.map((item) => {
                      const state = lessonState(c.id, item.slug, progress, available);
                      const body = (
                        <>
                          <span className="w-[18px] shrink-0 text-ac" aria-hidden="true">
                            {marks[state]}
                          </span>
                          <span className={`min-w-0 flex-1 ${state === "current" ? "font-bold" : ""}`}>
                            {item.title}
                            {state === "done" && <span className="sr-only"> (ukończona)</span>}
                          </span>
                          <span className="text-[15px] whitespace-nowrap text-mu">
                            {state === "soon" ? "wkrótce" : item.label}
                          </span>
                        </>
                      );
                      return (
                        <li key={item.slug}>
                          {state === "soon" ? (
                            <span className="flex items-baseline gap-3 py-1.5 text-[17px] text-mu">{body}</span>
                          ) : (
                            <Link
                              href={`/kursy/${c.id}/${item.slug}`}
                              className="flex items-baseline gap-3 py-1.5 text-[17px] no-underline"
                            >
                              {body}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export function CourseTocLive({ courses }: { courses: Course[] }) {
  const { progress } = useProgress();
  return <CourseToc courses={courses} progress={progress} />;
}
