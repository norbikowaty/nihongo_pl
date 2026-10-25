import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Choice } from "@/components/lesson/exercises/Choice";
import { KanaQuiz } from "@/components/lesson/exercises/KanaQuiz";
import { SentenceBuilder } from "@/components/lesson/exercises/SentenceBuilder";
import type { Exercise } from "@/content/schema";
import { clampStep, stepLabel, testPassed } from "@/lib/lessons";

const ja = (t: string, r?: string) => ({ segs: [{ t, ...(r ? { r } : {}) }], romaji: t });

const build = {
  type: "build",
  prompt: "Jestem studentem.",
  tiles: [{ ja: ja("私", "わたし") }, { ja: ja("は") }, { ja: ja("学生", "がくせい") }, { ja: ja("です") }, { ja: ja("を") }],
  answer: [0, 1, 2, 3],
} as Extract<Exercise, { type: "build" }>;

const choice = {
  type: "choice",
  prompt: "Która partykuła?",
  options: ["は", "を", "の"],
  answer: 0,
  why: "は wskazuje temat zdania.",
} as Extract<Exercise, { type: "choice" }>;

const kana = {
  type: "kana",
  items: [
    { kana: "あ", romaji: "a" },
    { kana: "い", romaji: "i" },
  ],
  choices: 2,
} as Extract<Exercise, { type: "kana" }>;

describe("steps", () => {
  it("clampStep keeps the step in range", () => {
    expect(clampStep("0", 5)).toBe(1);
    expect(clampStep("9", 5)).toBe(5);
    expect(clampStep("abc", 5)).toBe(1);
    expect(clampStep(undefined, 5)).toBe(1);
    expect(clampStep("3", 5)).toBe(3);
  });

  it("labels steps in Polish", () => {
    expect(stepLabel("pattern")).toBe("Wzór");
    expect(stepLabel("newKana")).toBe("Nowe znaki");
  });

  it("test lesson completes at 80%", () => {
    expect(testPassed(4, 5)).toBe(true);
    expect(testPassed(3, 5)).toBe(false);
  });
});

describe("SentenceBuilder", () => {
  it("accepts only the answer order", async () => {
    const user = userEvent.setup();
    render(<SentenceBuilder exercise={build} />);
    const pick = (name: string) => user.click(screen.getByRole("button", { name: new RegExp(`^${name}`) }));

    await pick("は");
    await pick("私");
    await user.click(screen.getByRole("button", { name: "Sprawdź" }));
    expect(screen.getByRole("status")).toHaveTextContent("Jeszcze nie");

    await user.click(screen.getByRole("button", { name: "Od nowa" }));
    for (const t of ["私", "は", "学生", "です"]) await pick(t);
    await user.click(screen.getByRole("button", { name: "Sprawdź" }));
    expect(screen.getByRole("status")).toHaveTextContent("Dobrze");
  });

  it("removes a placed tile when clicked again", async () => {
    const user = userEvent.setup();
    render(<SentenceBuilder exercise={build} />);
    await user.click(screen.getByRole("button", { name: /^私/ }));
    await user.click(screen.getByRole("button", { name: "Usuń 私" }));
    expect(screen.queryByRole("button", { name: "Usuń 私" })).toBeNull();
  });
});

describe("Choice", () => {
  it("shows explanation after answer", async () => {
    const user = userEvent.setup();
    render(<Choice exercise={choice} />);
    expect(screen.queryByText(/wskazuje temat/)).toBeNull();
    await user.click(screen.getByRole("button", { name: "を" }));
    expect(screen.getByRole("status")).toHaveTextContent("Prawidłowo: は");
    expect(screen.getByRole("status")).toHaveTextContent("wskazuje temat");
  });
});

describe("KanaQuiz", () => {
  it("reports score", async () => {
    const user = userEvent.setup();
    render(<KanaQuiz exercise={kana} />);
    for (let i = 0; i < 2; i++) {
      const shown = screen.getByTestId("kana-quiz-char").textContent;
      await user.click(screen.getByRole("button", { name: shown === "あ" ? "a" : "i" }));
      await user.click(screen.getByRole("button", { name: i === 1 ? "Pokaż wynik" : "Dalej" }));
    }
    expect(screen.getByRole("status")).toHaveTextContent("2 z 2");
  });
});
