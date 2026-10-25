import { splitProse } from "@/lib/prose";

/** Plain lesson text: blank lines start paragraphs, Japanese runs get the Japanese font and lang. */
export function Prose({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className={`max-w-[60ch] ${className}`}>
          {splitProse(para).map((part, j) =>
            part.ja ? (
              <span key={j} lang="ja" className="jp">
                {part.text}
              </span>
            ) : (
              part.text
            ),
          )}
        </p>
      ))}
    </>
  );
}
