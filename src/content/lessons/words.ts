import type { Word } from "../schema";

const word = (id: string, segs: Word["ja"]["segs"], romaji: string, pl: string): Word => ({
  id,
  ja: { segs, romaji },
  pl,
});

/** Shared vocabulary; ids stay stable because review cards are keyed by them. */
export const w = {
  watashi: word("watashi", [{ t: "私", r: "わたし" }], "watashi", "ja"),
  gakusei: word("gakusei", [{ t: "学生", r: "がくせい" }], "gakusei", "uczeń, student"),
  sensei: word("sensei", [{ t: "先生", r: "せんせい" }], "sensei", "nauczyciel"),
  hon: word("hon", [{ t: "本", r: "ほん" }], "hon", "książka"),
  kore: word("kore", [{ t: "これ" }], "kore", "to (blisko mnie)"),
  porandojin: word("porandojin", [{ t: "ポーランド" }, { t: "人", r: "じん" }], "pōrandojin", "Polak, Polka"),
} satisfies Record<string, Word>;
