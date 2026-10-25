// Builds the self-hosted Japanese font: Noto Serif JP (SIL OFL 1.1) cut down to the characters the site uses.
// Usage: npx tsx scripts/subset-font.ts   (run again after adding lessons with new kanji)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import subsetFont from "subset-font";
import { japaneseCharsInSource } from "./font-chars";

const SOURCE_URL = "https://github.com/google/fonts/raw/main/ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf";
const cache = join(process.cwd(), ".cache", "fonts");
const out = join(process.cwd(), "public", "fonts");

async function main() {
  mkdirSync(cache, { recursive: true });
  mkdirSync(out, { recursive: true });
  const source = join(cache, "NotoSerifJP.ttf");
  if (!existsSync(source)) writeFileSync(source, Buffer.from(await (await fetch(SOURCE_URL)).arrayBuffer()));
  const font = readFileSync(source);
  const chars = [...japaneseCharsInSource()].sort().join("");
  for (const weight of [400, 600]) {
    const woff2 = await subsetFont(font, chars, { targetFormat: "woff2", variationAxes: { wght: weight } });
    writeFileSync(join(out, `noto-serif-jp-${weight}.woff2`), woff2);
    console.log(`noto-serif-jp-${weight}.woff2: ${Math.round(woff2.length / 1024)} KB`);
  }
  writeFileSync(join(out, "noto-serif-jp-charset.txt"), chars);
  console.log(`${chars.length} characters`);
}

main();
