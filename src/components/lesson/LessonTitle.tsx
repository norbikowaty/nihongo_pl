import { Ja } from "@/components/ja/Ja";
import type { Lesson } from "@/content/schema";
import { splitProse } from "@/lib/prose";

export function LessonTitle({ title }: { title: Lesson["title"] }) {
  if (typeof title !== "string") return <Ja text={title} size="xl" />;
  return (
    <>
      {splitProse(title).map((p, i) =>
        p.ja ? (
          <span key={i} lang="ja" className="jp">
            {p.text}
          </span>
        ) : (
          p.text
        ),
      )}
    </>
  );
}

export const titleText = (title: Lesson["title"]) =>
  typeof title === "string" ? title : title.segs.map((s) => s.t).join("");
