import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { japaneseCharsInSource } from "../../scripts/font-chars";

const fonts = join(process.cwd(), "public", "fonts");

describe("Japanese font subset", () => {
  it("covers every Japanese character used on the site", () => {
    const charset = readFileSync(join(fonts, "noto-serif-jp-charset.txt"), "utf8");
    const missing = [...japaneseCharsInSource()].filter((c) => !charset.includes(c));
    expect(missing, "run: npx tsx scripts/subset-font.ts").toEqual([]);
  });

  it("has both weights", () => {
    expect(existsSync(join(fonts, "noto-serif-jp-400.woff2"))).toBe(true);
    expect(existsSync(join(fonts, "noto-serif-jp-600.woff2"))).toBe(true);
  });
});
