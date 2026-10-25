import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { titleText } from "@/components/lesson/LessonTitle";
import { LessonPlayer, LessonPlayerFromAddress } from "@/components/lesson/LessonPlayer";
import { getLesson, lessons } from "@/content/lessons";

type Params = { kurs: string; lekcja: string[] };

export function generateStaticParams(): Params[] {
  return lessons.map((l) => ({ kurs: l.course, lekcja: l.slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kurs, lekcja } = await params;
  const lesson = getLesson(kurs, lekcja.join("/"));
  return { title: lesson ? titleText(lesson.title) : "Nie ma takiej lekcji" };
}

/** Placeholder of the lesson's size while its content streams in after a quick navigation. */
function LessonSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1240px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <div className="h-5 w-48 bg-sf" />
      <div className="mt-4 h-12 w-80 max-w-full bg-sf" />
      <div className="mt-16 min-h-[540px] bg-sf min-[1000px]:mr-[360px]" />
    </div>
  );
}

async function Lesson({ params }: { params: Promise<Params> }) {
  const { kurs, lekcja } = await params;
  const lesson = getLesson(kurs, lekcja.join("/"));
  if (!lesson) notFound();
  return (
    <Suspense fallback={<LessonPlayer lesson={lesson} />}>
      <LessonPlayerFromAddress key={lesson.id} lesson={lesson} />
    </Suspense>
  );
}

// The address is read inside Suspense, so the page frame can be shared by every lesson link.
export default function LessonPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <Lesson params={params} />
    </Suspense>
  );
}
