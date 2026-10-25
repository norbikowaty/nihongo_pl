import { kanjivgFile } from "@/lib/kanjivg";

/** Stroke-order drawing from KanjiVG (CC BY-SA 3.0); inverted in night mode so the strokes stay dark-on-light readable. */
export function KanaStrokes({ char }: { char: string }) {
  if ([...char].length !== 1) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no resizing needed
    <img
      src={`/kanjivg/${kanjivgFile(char)}`}
      alt={`Kolejność kresek znaku ${char}`}
      width={109}
      height={109}
      className="h-[109px] w-[109px] bg-sf dark:invert"
    />
  );
}
