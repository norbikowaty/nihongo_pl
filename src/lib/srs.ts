import { type Card, createEmptyCard, fsrs, generatorParameters, Rating as FsrsRating } from "ts-fsrs";

/**
 * A review card as stored in localStorage: same fields as ts-fsrs, dates as ISO strings, plus the
 * learning stage. Older saves have no stage (see stageOf).
 */
export type CardState = Omit<Card, "due" | "last_review"> & { due: string; last_review?: string; stage?: number };

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

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/**
 * Fixed thresholds for a new card: the first review 30 minutes after the lesson, then 3 hours,
 * 1 day and 3 days. A card that passes all of them is "learned" and FSRS sets the gaps from then on.
 */
export const LADDER = [30 * MIN, 3 * HOUR, DAY, 3 * DAY] as const;
/** Stage of a card answered "Znowu": it comes back in a minute and climbs the ladder again. */
export const RELEARN = -1;
export const LEARNED = LADDER.length;
const RELEARN_GAP = MIN;
/** The first gap chosen by FSRS is never shorter than the last fixed one. */
const MIN_LEARNED_GAP = 4 * DAY;

export function stageOf(card: CardState): number {
  if (card.stage !== undefined) return card.stage;
  // Saves from before the ladder: reviewed cards count as learned.
  return card.reps > 0 ? LEARNED : 0;
}

const at = (now: Date, ms: number) => new Date(now.getTime() + ms).toISOString();

export function newCard(now: Date): CardState {
  return { ...toState(createEmptyCard(now)), due: at(now, LADDER[0]), stage: 0 };
}

export function rate(card: CardState, rating: Rating, now: Date): CardState {
  // FSRS keeps learning how hard the card is from every answer, also on the fixed thresholds.
  const next = toState(scheduler.next(toCard(card), now, grades[rating]).card);
  const stage = stageOf(card);
  if (rating === "znowu") return { ...next, stage: RELEARN, due: at(now, RELEARN_GAP) };
  if (stage >= LEARNED) return { ...next, stage: LEARNED };
  const to = rating === "trudne" ? Math.max(stage, 0) : stage + (rating === "dobrze" ? 1 : 2);
  if (to >= LEARNED) {
    const due = Math.max(new Date(next.due).getTime(), now.getTime() + MIN_LEARNED_GAP);
    return { ...next, stage: LEARNED, due: new Date(due).toISOString() };
  }
  return { ...next, stage: to, due: at(now, LADDER[to]) };
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

export function formatInterval(ms: number): string {
  if (ms < MIN) return "< 1 min";
  if (ms < HOUR) return `${Math.round(ms / MIN)} min`;
  if (ms < DAY) return `${Math.round(ms / HOUR)} godz.`;
  const days = Math.round(ms / DAY);
  return days === 1 ? "1 dzień" : `${days} dni`;
}

/** Short Polish names of the stages, for the ladder on the reviews page. */
export function stageLabel(stage: number): string {
  if (stage === RELEARN) return "do poprawy";
  if (stage >= LEARNED) return "utrwalone";
  return formatInterval(LADDER[stage]);
}

/** Cards that come back soon (e.g. after "Znowu"), so the session can wait for them instead of ending. */
export function dueSoon(cards: Record<string, { card: CardState }>, now: Date, within: number): string[] {
  const limit = now.getTime() + within;
  return Object.entries(cards)
    .filter(([, { card }]) => !isDue(card, now) && new Date(card.due).getTime() <= limit)
    .map(([id]) => id);
}

/** Time until the next card becomes due, or undefined without cards. */
export function untilNextDue(cards: Record<string, { card: CardState }>, now: Date): number | undefined {
  const times = Object.values(cards).map(({ card }) => new Date(card.due).getTime());
  return times.length ? Math.max(0, Math.min(...times) - now.getTime()) : undefined;
}

export function intervalLabel(card: CardState, rating: Rating, now: Date): string {
  return formatInterval(new Date(rate(card, rating, now).due).getTime() - now.getTime());
}
