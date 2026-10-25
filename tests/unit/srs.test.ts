import { describe, expect, it } from "vitest";
import { dueIds, formatInterval, intervalLabel, isDue, newCard, rate } from "@/lib/srs";

const now = new Date("2026-10-25T10:00:00Z");
const DAY = 86_400_000;

describe("srs", () => {
  it("new card is due immediately", () => {
    expect(isDue(newCard(now), now)).toBe(true);
  });

  it("rating dobrze moves due into the future", () => {
    const card = rate(newCard(now), "dobrze", now);
    expect(new Date(card.due).getTime()).toBeGreaterThan(now.getTime());
    expect(isDue(card, now)).toBe(false);
  });

  it("znowu schedules sooner than latwe", () => {
    const card = newCard(now);
    const again = new Date(rate(card, "znowu", now).due).getTime();
    const easy = new Date(rate(card, "latwe", now).due).getTime();
    expect(again).toBeLessThan(easy);
  });

  it("rate does not mutate input", () => {
    const card = newCard(now);
    const copy = JSON.parse(JSON.stringify(card));
    rate(card, "dobrze", now);
    expect(card).toEqual(copy);
  });

  it("cards survive a JSON round trip", () => {
    const card = rate(newCard(now), "dobrze", now);
    const back = JSON.parse(JSON.stringify(card));
    expect(rate(back, "dobrze", new Date(card.due))).toEqual(rate(card, "dobrze", new Date(card.due)));
  });

  it("formatInterval uses Polish plural", () => {
    expect(formatInterval(30_000)).toBe("< 1 min");
    expect(formatInterval(10 * 60_000)).toBe("10 min");
    expect(formatInterval(3 * 3_600_000)).toBe("3 godz.");
    expect(formatInterval(DAY)).toBe("1 dzień");
    expect(formatInterval(2 * DAY)).toBe("2 dni");
    expect(formatInterval(5 * DAY)).toBe("5 dni");
  });

  it("intervalLabel describes when the card comes back", () => {
    expect(intervalLabel(newCard(now), "znowu", now)).toMatch(/min$/);
  });

  it("dueIds returns only due cards, oldest first", () => {
    const later = rate(newCard(now), "latwe", now);
    const early = newCard(new Date(now.getTime() - DAY));
    const fresh = newCard(now);
    const ids = dueIds({ a: { card: fresh }, b: { card: later }, c: { card: early } }, now);
    expect(ids).toEqual(["c", "a"]);
  });
});
