import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { allKana } from "@/content/kana";
import { kanjivgFile } from "@/lib/kanjivg";

describe("stroke order drawings", () => {
  it("file name is the 5-digit hex code point", () => {
    expect(kanjivgFile("あ")).toBe("03042.svg");
    expect(kanjivgFile("ア")).toBe("030a2.svg");
  });

  it("kanjivg file exists for every kana", () => {
    const missing = allKana
      .filter((k) => [...k.kana].length === 1)
      .filter((k) => !existsSync(join(process.cwd(), "public", "kanjivg", kanjivgFile(k.kana))))
      .map((k) => k.kana);
    expect(missing).toEqual([]);
  });
});
