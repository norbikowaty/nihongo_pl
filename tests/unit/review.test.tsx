import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReviewSession } from "@/components/review/ReviewSession";
import { egzaminFacts } from "@/content/egzamin";
import { lessons } from "@/content/lessons";
import { cardFace } from "@/lib/cards";
import { nextLesson } from "@/lib/lessons";
import { completeLesson, emptyProgress, STORAGE_KEY } from "@/lib/progress/store";
import { newCard } from "@/lib/srs";

const now = new Date("2026-10-25T10:00:00Z");

describe("exam facts", () => {
  it("egzamin pass mark is 80 of 180", () => {
    expect(egzaminFacts.scores.total).toEqual({ max: 180, pass: 80 });
    expect(egzaminFacts.parts.reduce((s, p) => s + p.minutes, 0)).toBe(90);
  });
});

describe("next lesson", () => {
  it("starts with writing course", () => {
    expect(nextLesson(emptyProgress())?.id).toBe("pismo/hiragana/a-o");
  });

  it("skips done lessons", () => {
    const first = lessons.find((l) => l.id === "pismo/hiragana/a-o")!;
    expect(nextLesson(completeLesson(emptyProgress(), first, now))?.id).toBe("pismo/hiragana/ka-ko");
  });
});

describe("cards", () => {
  it("describes word and kana cards", () => {
    expect(cardFace("word:hon")).toMatchObject({ meaning: "książka", reading: "ほん · hon" });
    expect(cardFace("kana:し")).toMatchObject({ meaning: "znak hiragany", reading: "shi" });
    expect(cardFace("word:nie-ma")).toBeUndefined();
  });
});

describe("ReviewSession", () => {
  it("shows empty state without cards", () => {
    render(<ReviewSession />);
    expect(screen.getByText("Nie masz jeszcze nic do powtórki.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /あ・い・う・え・お/ })).toHaveAttribute("href", "/kursy/pismo/hiragana/a-o");
  });

  it("rating a card removes it from today's queue", async () => {
    const p = { ...emptyProgress(), cards: { "word:hon": { card: newCard(new Date(Date.now() - 31 * 60_000)), updatedAt: now.toISOString() } } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    const user = userEvent.setup();
    render(<ReviewSession />);
    expect(screen.getByText("Zostało: 1")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Pokaż odpowiedź" }));
    expect(screen.getByText("książka")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^Dobrze/ }));
    expect(screen.getByText("Na teraz wszystko powtórzone.")).toBeInTheDocument();
    expect(screen.getByText(/Następna powtórka za/)).toHaveTextContent("3 godz.");
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(new Date(saved.cards["word:hon"].card.due).getTime()).toBeGreaterThan(Date.now());
  });

  it("a card answered Znowu can be taken again at once instead of ending the session", async () => {
    const p = { ...emptyProgress(), cards: { "word:hon": { card: newCard(new Date(Date.now() - 31 * 60_000)), updatedAt: now.toISOString() } } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    const user = userEvent.setup();
    render(<ReviewSession />);
    await user.keyboard(" ");
    await user.keyboard("1");
    expect(screen.getByText(/Za chwilę wrócą/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Powtórz je teraz" }));
    expect(screen.getByRole("button", { name: "Pokaż odpowiedź" })).toBeInTheDocument();
  });
});
