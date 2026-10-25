import { useSyncExternalStore } from "react";

/** Small seeded generator (mulberry32): the same seed gives the same order. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(list: readonly T[], rand: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A stable number for a piece of text, so each exercise gets its own order from one seed. */
export function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

let seed = 0;
const noSubscribe = () => () => {};
const clientSeed = () => seed || (seed = Math.floor(Math.random() * 2 ** 31) + 1);

/**
 * 0 on the server and while hydrating, a random number per visit in the browser.
 * Orders shuffled with it match the server's HTML first, then change once after hydration.
 */
export function useClientSeed(): number {
  return useSyncExternalStore(noSubscribe, clientSeed, () => 0);
}

/** Shuffled order of `n` positions; with seed 0 (server) the order is left as written. */
export function order(n: number, seed: number, salt: string): number[] {
  const ids = Array.from({ length: n }, (_, i) => i);
  return seed === 0 ? ids : shuffle(ids, rng(seed ^ hash(salt)));
}
