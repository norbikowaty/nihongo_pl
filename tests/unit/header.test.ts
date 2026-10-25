import { describe, expect, it } from "vitest";
import { initialHeader, nextHeader } from "@/lib/header-visibility";
import { readingContextFor } from "@/lib/reading";

const run = (start: Parameters<typeof nextHeader>[0], ys: number[]) => ys.reduce(nextHeader, start);

describe("header visibility", () => {
  it("stays visible near top", () => {
    expect(nextHeader({ lastY: 600, acc: 0, hidden: true }, 50).hidden).toBe(false);
  });

  it("hides only after 140px down", () => {
    const start = { ...initialHeader, lastY: 100 };
    expect(run(start, [200, 239]).hidden).toBe(false);
    expect(run(start, [200, 239, 241]).hidden).toBe(true);
  });

  it("shows after 70px up without going to the top", () => {
    const hidden = { lastY: 600, acc: 200, hidden: true };
    expect(run(hidden, [560]).hidden).toBe(true);
    expect(run(hidden, [560, 529]).hidden).toBe(false);
  });

  it("direction change resets accumulation", () => {
    expect(nextHeader({ lastY: 300, acc: -50, hidden: false }, 400).acc).toBe(100);
  });
});

describe("reading context", () => {
  it("writing course uses its own setting", () => {
    expect(readingContextFor("/kursy/pismo/hiragana/a-ko")).toBe("pismo");
  });

  it("everything else shares one setting", () => {
    expect(readingContextFor("/kursy/gramatyka/pierwsze-zdania/wa-desu")).toBe("reszta");
    expect(readingContextFor("/")).toBe("reszta");
    expect(readingContextFor("/kursy/pismowo")).toBe("reszta");
  });
});
