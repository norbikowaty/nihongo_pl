// Checks every lesson word against JMdict (EDRDG, CC BY-SA 4.0) via the jmdict-simplified release.
// Usage: npx tsx scripts/verify-words.ts
// Prints the JMdict id and English glosses next to our Polish meaning; exits 1 if a word or reading is not in JMdict.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lessons } from "../src/content/lessons";
import { w } from "../src/content/lessons/words";
import type { Word } from "../src/content/schema";

type Entry = {
  id: string;
  kanji: { text: string; common: boolean }[];
  kana: { text: string; common: boolean }[];
  sense: { gloss: { text: string }[] }[];
};

// Kana-only words match many homophones; the entry whose matching reading is marked common comes first.
const commonScore = (e: Entry, read: string) => (e.kana.some((k) => k.text === read && k.common) ? 1 : 0);

const cache = join(process.cwd(), ".cache", "jmdict");

async function loadJmdict(): Promise<Entry[]> {
  mkdirSync(cache, { recursive: true });
  let json = readdirSync(cache).find((f) => f.startsWith("jmdict-eng-") && f.endsWith(".json"));
  if (!json) {
    const release = await (await fetch("https://api.github.com/repos/scriptin/jmdict-simplified/releases/latest")).json();
    const asset = release.assets.find((a: { name: string }) => /^jmdict-eng-\d.*\.json\.tgz$/.test(a.name));
    if (!asset) throw new Error("No jmdict-eng .json.tgz asset in the latest release");
    console.log(`downloading ${asset.name}`);
    const tgz = join(cache, asset.name);
    writeFileSync(tgz, Buffer.from(await (await fetch(asset.browser_download_url)).arrayBuffer()));
    execFileSync("tar", ["-xzf", asset.name], { cwd: cache });
    json = readdirSync(cache).find((f) => f.startsWith("jmdict-eng-") && f.endsWith(".json"));
    if (!json) throw new Error("Extracted archive has no JSON file");
  }
  return JSON.parse(readFileSync(join(cache, json), "utf8")).words;
}

const written = (word: Word) => word.ja.segs.map((s) => s.t).join("");
const reading = (word: Word) => word.ja.segs.map((s) => s.r ?? s.t).join("");

async function main() {
  const words = new Map<string, Word>();
  for (const word of Object.values(w)) words.set(word.id, word);
  for (const l of lessons) for (const s of l.steps) if (s.kind === "summary") for (const word of s.words) words.set(word.id, word);

  const dict = await loadJmdict();
  let missing = 0;
  for (const word of words.values()) {
    const text = written(word);
    const read = reading(word);
    const hits = dict
      .filter(
        (e) =>
          e.kana.some((k) => k.text === read) &&
          (text === read ? true : e.kanji.some((k) => k.text === text)),
      )
      .sort((a, b) => commonScore(b, read) - commonScore(a, read))
      // A word pinned to a JMdict entry (homophones) must match exactly that entry.
      .filter((e, _, all) => !word.jmdict || (all.some((x) => x.id === word.jmdict) ? e.id === word.jmdict : true));
    if (word.jmdict && !hits.some((h) => h.id === word.jmdict)) {
      missing++;
      console.log(`WRONG ID ${word.id}: ${text} 【${read}】 is not JMdict entry ${word.jmdict}`);
      continue;
    }
    if (hits.length === 0) {
      missing++;
      console.log(`MISSING  ${word.id}: ${text} 【${read}】 — ${word.pl}`);
      continue;
    }
    const glosses = hits[0].sense.flatMap((s) => s.gloss.map((g) => g.text)).slice(0, 4).join("; ");
    console.log(`ok       ${word.id}: ${text} 【${read}】 jmdict ${hits.map((h) => h.id).join(",")}  pl: ${word.pl}  en: ${glosses}`);
  }
  console.log(`\n${words.size - missing} of ${words.size} words found in JMdict`);
  if (missing) process.exit(1);
}

main();
