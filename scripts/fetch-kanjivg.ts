// Downloads KanjiVG stroke-order drawings (CC BY-SA 3.0) into public/kanjivg/.
// Usage: npx tsx scripts/fetch-kanjivg.ts [characters]   (default: every single kana in src/content/kana.ts)
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { allKana } from "../src/content/kana";
import { kanjivgFile } from "../src/lib/kanjivg";

const BASE = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/";
const out = join(process.cwd(), "public", "kanjivg");

async function main() {
  const arg = process.argv[2];
  const chars = arg ? [...new Set([...arg])] : [...new Set(allKana.map((k) => k.kana).filter((k) => [...k].length === 1))];
  mkdirSync(out, { recursive: true });
  let fetched = 0;
  const failed: string[] = [];
  for (const c of chars) {
    const file = kanjivgFile(c);
    if (existsSync(join(out, file))) continue;
    const res = await fetch(BASE + file);
    if (!res.ok) {
      failed.push(`${c} (${file}: HTTP ${res.status})`);
      continue;
    }
    writeFileSync(join(out, file), await res.text());
    fetched++;
  }
  console.log(`fetched ${fetched}, already present ${chars.length - fetched - failed.length}`);
  if (failed.length) {
    console.error(`missing: ${failed.join(", ")}`);
    process.exit(1);
  }
}

main();
