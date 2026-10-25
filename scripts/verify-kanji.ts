// Checks readings and stroke counts in src/content/kanji.ts against KANJIDIC2 (EDRDG, CC BY-SA 4.0).
// Usage: npx tsx scripts/verify-kanji.ts   (expects the kanjidic2-en JSON from jmdict-simplified in .cache/kanjidic/)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { kanjiSets } from "../src/content/kanji";

type Char = {
  literal: string;
  misc: { strokeCounts: number[] };
  readingMeaning: { groups: { readings: { type: string; value: string }[]; meanings: { lang: string; value: string }[] }[] };
};

const cache = join(process.cwd(), ".cache", "kanjidic");

async function load(): Promise<Char[]> {
  mkdirSync(cache, { recursive: true });
  let json = readdirSync(cache).find((f) => f.endsWith(".json"));
  if (!json) {
    const release = await (await fetch("https://api.github.com/repos/scriptin/jmdict-simplified/releases/latest")).json();
    const asset = release.assets.find((a: { name: string }) => /^kanjidic2-en-.*\.json\.tgz$/.test(a.name));
    const file = join(cache, asset.name);
    if (!existsSync(file)) writeFileSync(file, Buffer.from(await (await fetch(asset.browser_download_url)).arrayBuffer()));
    execFileSync("tar", ["-xzf", asset.name], { cwd: cache });
    json = readdirSync(cache).find((f) => f.endsWith(".json"))!;
  }
  return JSON.parse(readFileSync(join(cache, json), "utf8")).characters;
}

async function main() {
  const dict = new Map((await load()).map((c) => [c.literal, c]));
  let problems = 0;
  for (const set of kanjiSets) {
    for (const k of set.kanji) {
      const c = dict.get(k.kanji);
      if (!c) {
        problems++;
        console.log(`MISSING  ${k.kanji}`);
        continue;
      }
      const readings = c.readingMeaning.groups.flatMap((g) => g.readings);
      const on = readings.filter((r) => r.type === "ja_on").map((r) => r.value);
      const kun = readings.filter((r) => r.type === "ja_kun").map((r) => r.value);
      const bad = [...k.on.filter((r) => !on.includes(r)), ...k.kun.filter((r) => !kun.includes(r))];
      const strokesOk = c.misc.strokeCounts[0] === k.strokes;
      if (bad.length || !strokesOk) problems++;
      const en = c.readingMeaning.groups.flatMap((g) => g.meanings.filter((m) => m.lang === "en").map((m) => m.value));
      console.log(
        `${bad.length || !strokesOk ? "PROBLEM" : "ok     "}  ${k.kanji} ${k.strokes}/${c.misc.strokeCounts[0]} kresek` +
          `${bad.length ? `, nieznane odczyty: ${bad.join(", ")}` : ""}  pl: ${k.meaning}  en: ${en.slice(0, 3).join("; ")}`,
      );
    }
  }
  if (problems) process.exit(1);
}

main();
