import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { titleText } from "@/components/lesson/LessonTitle";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
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

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { kurs, lekcja } = await params;
  const lesson = getLesson(kurs, lekcja.join("/"));
  if (!lesson) notFound();
  return (
    <Suspense>
      <LessonPlayer lesson={lesson} />
    </Suspense>
  );
}
