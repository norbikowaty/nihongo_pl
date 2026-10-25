import { type Card, createEmptyCard, fsrs, generatorParameters, Rating as FsrsRating } from "ts-fsrs";

/** A review card as stored in localStorage: same fields as ts-fsrs, dates as ISO strings. */
export type CardState = Omit<Card, "due" | "last_review"> & { due: string; last_review?: string };

export type Rating = "znowu" | "trudne" | "dobrze" | "latwe";

const grades = {
  znowu: FsrsRating.Again,
  trudne: FsrsRating.Hard,
  dobrze: FsrsRating.Good,
  latwe: FsrsRating.Easy,
} as const;

const scheduler = fsrs(generatorParameters({ enable_fuzz: false }));

const toState = (card: Card): CardState => {
  const { due, last_review, ...rest } = card;
  return { ...rest, due: due.toISOString(), ...(last_review ? { last_review: last_review.toISOString() } : {}) };
};

const toCard = (state: CardState): Card => ({
  ...state,
  due: new Date(state.due),
  last_review: state.last_review ? new Date(state.last_review) : undefined,
});

export function newCard(now: Date): CardState {
  return toState(createEmptyCard(now));
}

export function rate(card: CardState, rating: Rating, now: Date): CardState {
  return toState(scheduler.next(toCard(card), now, grades[rating]).card);
}

export function isDue(card: CardState, now: Date): boolean {
  return new Date(card.due).getTime() <= now.getTime();
}

export function dueIds(cards: Record<string, { card: CardState }>, now: Date): string[] {
  return Object.entries(cards)
    .filter(([, { card }]) => isDue(card, now))
    .sort(([, a], [, b]) => new Date(a.card.due).getTime() - new Date(b.card.due).getTime())
    .map(([id]) => id);
}

/** Due cards right now. Reads the clock only when there are cards, so prerendering an empty progress stays static. */
export function dueNow(cards: Record<string, { card: CardState }>): string[] {
  return Object.keys(cards).length === 0 ? [] : dueIds(cards, new Date());
}

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function formatInterval(ms: number): string {
  if (ms < MIN) return "< 1 min";
  if (ms < HOUR) return `${Math.round(ms / MIN)} min`;
  if (ms < DAY) return `${Math.round(ms / HOUR)} godz.`;
  const days = Math.round(ms / DAY);
  return days === 1 ? "1 dzień" : `${days} dni`;
}

export function intervalLabel(card: CardState, rating: Rating, now: Date): string {
  return formatInterval(new Date(rate(card, rating, now).due).getTime() - now.getTime());
}
