import type { JaText } from "@/content/schema";

const sizes = { sm: "text-xl", md: "text-[26px]", lg: "text-[34px]", xl: "text-[44px]" } as const;

export type JaSize = keyof typeof sizes;

/** Japanese text with furigana (ruby) and an optional rōmaji line; visibility follows the reading-aid level. */
export function Ja({ text, size = "md", className = "" }: { text: JaText; size?: JaSize; className?: string }) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span lang="ja" className={`jp ${sizes[size]} leading-[1.9]`}>
        {text.segs.map((s, i) =>
          s.r ? (
            <ruby key={i}>
              {s.t}
              <rt>{s.r}</rt>
            </ruby>
          ) : (
            <span key={i}>{s.t}</span>
          ),
        )}
      </span>
      <span className="rm">{text.romaji}</span>
    </span>
  );
}
