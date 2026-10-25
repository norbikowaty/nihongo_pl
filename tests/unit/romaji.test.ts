import { describe, expect, it } from "vitest";
import { lessons } from "@/content/lessons";
import type { JaText } from "@/content/schema";

// Catches typos in hand-written rōmaji: the kana (or furigana) is turned into Hepburn and compared.
// Particles are loose (は may be wa, へ may be e), long vowels may be written with a macron or doubled.

const base: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko", が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to", だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho", ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo", や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", を: "o", ん: "n",
  ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゔ: "vu",
};
const small: Record<string, string> = { ゃ: "a", ゅ: "u", ょ: "o" };

export function hepburn(kana: string): string {
  const s = kana.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  let out = "";
  let double = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const next = s[i + 1];
    if (c === "っ") {
      double = true;
      continue;
    }
    let syl: string;
    if (c === "ー") syl = out.slice(-1);
    else if (base[c] && next && small[next]) {
      // き + ゃ → kya, し + ゃ → sha, ち + ゃ → cha, じ + ゃ → ja
      const head = base[c].slice(0, -1);
      syl = (/^(sh|ch|j)$/.test(head) ? head : `${head}y`) + small[next];
      i++;
    } else if (base[c] && next && /[ぁぃぅぇぉ]/.test(next)) {
      // ティ, ファ, ウィ…: drop the vowel of the first kana
      syl = base[c].slice(0, -1) + base[next];
      i++;
    } else syl = base[c] ?? "";
    if (double) syl = (syl.startsWith("ch") ? "t" : syl[0]) + syl;
    double = false;
    out += syl;
  }
  return out;
}

/** Both sides in one shape: no spaces or punctuation, macrons spelled out, loose particles. */
export function normalize(romaji: string): string {
  return romaji
    .toLowerCase()
    .replace(/ā/g, "aa").replace(/ī/g, "ii").replace(/ū/g, "uu").replace(/ē/g, "ee").replace(/ō/g, "ou")
    .replace(/[^a-z]/g, "")
    .replace(/oo/g, "ou")
    .replace(/wa/g, "ha")
    .replace(/he/g, "e");
}

const reading = (t: JaText) => t.segs.map((s) => s.r ?? s.t).join("");

function texts(): { where: string; text: JaText }[] {
  const out: { where: string; text: JaText }[] = [];
  for (const l of lessons) {
    for (const s of l.steps) {
      if (s.kind === "intro") out.push({ where: l.id, text: s.sentence.ja });
      if (s.kind === "examples") s.items.forEach((e) => out.push({ where: l.id, text: e.ja }));
      if (s.kind === "summary") s.words.forEach((w) => out.push({ where: `${l.id} ${w.id}`, text: w.ja }));
      if (s.kind === "exercise")
        for (const e of s.items) {
          if (e.type === "build") e.tiles.forEach((t) => out.push({ where: `${l.id} (kafelek)`, text: t.ja }));
          if (e.type === "choice" && e.ja?.romaji) out.push({ where: l.id, text: e.ja });
        }
    }
  }
  // Pattern blocks hold placeholders like "A の B" and are left out.
  return out.filter((x) => x.text.romaji && /^[\p{Script=Hiragana}\p{Script=Katakana}ー、。？！ 　＿]+$/u.test(reading(x.text)));
}

describe("rōmaji", () => {
  it("hepburn handles small kana, doubling and long marks", () => {
    expect(hepburn("きっぷ")).toBe("kippu");
    expect(hepburn("ちょっと")).toBe("chotto");
    expect(hepburn("しゃしん")).toBe("shashin");
    expect(hepburn("コーヒー")).toBe("koohii");
    expect(hepburn("まっちゃ")).toBe("matcha");
  });

  it("matches the kana of every sentence, word and tile", () => {
    expect(texts().length).toBeGreaterThan(200);
    const bad = texts()
      .filter((x) => normalize(hepburn(reading(x.text))) !== normalize(x.text.romaji))
      .map((x) => `${x.where}: ${reading(x.text)} ≠ ${x.text.romaji}`);
    expect(bad).toEqual([]);
  });
});
