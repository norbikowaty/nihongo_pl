import { describe, expect, it } from "vitest";
import { hash, order, rng, shuffle } from "@/lib/random";
import { answerTask, REVIEW_COUNT, RETRY_GAP, startTrainer, taskOptions, trainerFinished } from "@/lib/trainer";

const items = [
  { kana: "あ", romaji: "a" },
  { kana: "い", romaji: "i" },
  { kana: "う", romaji: "u" },
  { kana: "え", romaji: "e" },
  { kana: "お", romaji: "o" },
];
const review = [
  { kana: "か", romaji: "ka" },
  { kana: "き", romaji: "ki" },
  { kana: "く", romaji: "ku" },
  { kana: "け", romaji: "ke" },
  { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" },
];
const pool = [...items, ...review];

describe("random", () => {
  it("the same seed gives the same order, another seed another one", () => {
    const list = Array.from({ length: 20 }, (_, i) => i);
    expect(shuffle(list, rng(1))).toEqual(shuffle(list, rng(1)));
    expect(shuffle(list, rng(1))).not.toEqual(shuffle(list, rng(2)));
    expect(shuffle(list, rng(1)).sort((a, b) => a - b)).toEqual(list);
  });

  it("seed 0 keeps the written order (server render)", () => {
    expect(order(4, 0, "x")).toEqual([0, 1, 2, 3]);
    expect(order(4, 7, "x").sort()).toEqual([0, 1, 2, 3]);
    expect(hash("a")).not.toBe(hash("b"));
  });
});

describe("kana trainer", () => {
  it("asks every new character both ways plus a few from earlier lessons", () => {
    const t = startTrainer(items, review, 4, rng(3));
    const fresh = t.queue.filter((x) => !x.review);
    expect(fresh.filter((x) => x.dir === "read")).toHaveLength(items.length);
    expect(fresh.filter((x) => x.dir === "find")).toHaveLength(items.length);
    expect(t.queue.filter((x) => x.review)).toHaveLength(REVIEW_COUNT);
    expect(t.total).toBe(items.length * 2 + REVIEW_COUNT);
  });

  it("the order changes from one session to the next", () => {
    const a = startTrainer(items, review, 4, rng(1)).queue.map((x) => x.item.kana + x.dir);
    const b = startTrainer(items, review, 4, rng(2)).queue.map((x) => x.item.kana + x.dir);
    expect(a).not.toEqual(b);
  });

  it("options hold the answer once and never another character with the same reading", () => {
    const withTwin = [...pool, { kana: "ぢ", romaji: "ji" }, { kana: "じ", romaji: "ji" }];
    for (let s = 1; s < 30; s++) {
      const task = { item: { kana: "じ", romaji: "ji" }, dir: "find" as const, review: false };
      const opts = taskOptions(task, withTwin, 4, rng(s));
      expect(opts).toHaveLength(4);
      expect(opts.filter((o) => o === "じ")).toHaveLength(1);
      expect(opts).not.toContain("ぢ");
    }
  });

  it("a wrong answer comes back a little later and the session ends only when all are right", () => {
    let t = startTrainer(items, [], 4, rng(5));
    const first = t.queue[0];
    t = answerTask(t, false, items, 4, rng(6));
    expect(t.queue[RETRY_GAP]).toBe(first);
    expect(t.missed).toEqual([first.item.kana]);
    let guard = 0;
    while (!trainerFinished(t) && guard++ < 100) t = answerTask(t, true, items, 4, rng(guard));
    expect(trainerFinished(t)).toBe(true);
    expect(t.total).toBe(items.length * 2 + 1);
    expect(t.correct).toBe(items.length * 2);
  });
});
