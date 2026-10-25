import type { Metadata } from "next";
import { CourseTocLive } from "@/components/courses/CourseToc";
import { courses } from "@/content/catalog";

export const metadata: Metadata = { title: "Spis kursów" };

export default function KursyPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <h1 className="text-[46px] leading-tight font-bold tracking-[-0.02em]">Spis kursów N5</h1>
      <p className="mt-3 mb-8 max-w-[52ch] text-xl">
        Pismo idzie pierwsze, potem gramatyka, słownictwo i kanji równolegle.
      </p>
      <CourseTocLive courses={courses} />
    </div>
  );
}
