// Checks every lesson word against the JLPT N5 vocabulary list (Tanos, via open-anki-jlpt-decks).
// JLPT has published no official list since 2010; the Tanos lists are what most N5 materials follow.
// Usage: npx tsx scripts/verify-n5.ts
// Exits 1 if a word is neither on the list, nor a compound of N5 parts listed below, nor marked beyondN5.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lessons } from "../src/content/lessons";
import type { Word } from "../src/content/schema";

const LIST = "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n5.csv";

/** Words built from N5 parts that the list does not spell out; the reason is printed next to them. */
const compounds: Record<string, string> = {
  日本人: "日本 + 〜人",
  ポーランド人: "ポーランド + 〜人",
  日本語: "日本 + 〜語",
  かいしゃいん: "会社 + 〜員, Minna no Nihongo lekcja 1",
  何時: "何 + 〜時 (godzina)",
  日本: "nazwa kraju; w N5 są 日本語 i 日本人",
  ゆっくり: "na liście jako ゆっくりと",
};

const cache = join(process.cwd(), ".cache", "jlpt");

async function load(): Promise<{ written: string; reading: string }[]> {
  mkdirSync(cache, { recursive: true });
  const file = join(cache, "n5.csv");
  if (!existsSync(file)) writeFileSync(file, await (await fetch(LIST)).text());
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map((row) => row.match(/^([^,]*),([^,]*),/))
    .filter((m) => m !== null)
    // "行く,いく; ゆく" and "足; 脚,あし" list several spellings in one row; "～人" is a suffix.
    .flatMap((m) => m[1].split(/;\s*/).flatMap((written) => m[2].split(/;\s*/).map((reading) => ({ written: written.replace(/^[～〜]/, ""), reading }))));
}

// A word taught conjugated (行きます) is checked by its dictionary form (行く).
const written = (word: Word) => word.lemma?.written ?? word.ja.segs.map((s) => s.t).join("");
const reading = (word: Word) => word.lemma?.reading ?? word.ja.segs.map((s) => s.r ?? s.t).join("");

async function main() {
  const words = new Map<string, Word>();
  for (const l of lessons) for (const s of l.steps) if (s.kind === "summary") for (const word of s.words) words.set(word.id, word);

  const n5 = await load();
  let problems = 0;
  for (const word of words.values()) {
    const text = written(word);
    const read = reading(word);
    // Same reading and no kanji beyond the listed spelling: わたし for 私, 友だち for 友達.
    const listed = n5.some((e) => e.written === text || (e.reading === read && (text.match(/\p{Script=Han}/gu) ?? []).every((c) => e.written.includes(c))));
    if (word.beyondN5) {
      if (listed) {
        problems++;
        console.log(`MARKED   ${word.id}: ${text} is on the N5 list; remove beyondN5`);
      } else console.log(`extra    ${word.id}: ${text} (tylko do czytania)`);
    } else if (listed) console.log(`ok       ${word.id}: ${text} 【${read}】`);
    else if (compounds[text]) console.log(`ok       ${word.id}: ${text} — ${compounds[text]}`);
    else {
      problems++;
      console.log(`NOT N5   ${word.id}: ${text} 【${read}】 — ${word.pl}`);
    }
  }
  console.log(`\n${words.size - problems} of ${words.size} words ok`);
  if (problems) process.exit(1);
}

main();
