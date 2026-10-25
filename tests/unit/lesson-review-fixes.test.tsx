import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LessonAside } from "@/components/lesson/LessonAside";
import { TestRunner } from "@/components/lesson/LessonPlayer";
import type { Lesson } from "@/content/schema";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));

const ja = (t: string) => ({ segs: [{ t }], romaji: t });
const lesson = (id: string): Lesson => ({
  id: `gramatyka/x/${id}`,
  course: "gramatyka",
  section: "x",
  slug: `x/${id}`,
  title: id,
  minutes: 5,
  kind: "lesson",
  steps: [
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "summary", points: ["x"], words: [] },
  ],
});

const test2: Lesson = {
  id: "gramatyka/x/test",
  course: "gramatyka",
  section: "x",
  slug: "x/test",
  title: "Test",
  minutes: 5,
  kind: "test",
  steps: [
    {
      kind: "exercise",
      items: [
        { type: "choice", prompt: "1", options: ["a", "b"], answer: 0, why: "." },
        { type: "choice", prompt: "2", options: ["a", "b"], answer: 0, why: "." },
      ],
    },
  ],
};

describe("lesson fixes from the final review", () => {
  it("a note typed in one lesson does not appear in the next one", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<LessonAside lesson={lesson("a")} />);
    await user.type(screen.getByLabelText("Twoja notatka"), "notatka A");
    rerender(<LessonAside lesson={lesson("b")} />);
    expect(screen.getByLabelText("Twoja notatka")).toHaveValue("");
  });

  it("a failed section test can be taken again", async () => {
    const user = userEvent.setup();
    render(<TestRunner lesson={test2} />);
    for (const b of screen.getAllByRole("button", { name: "b" })) await user.click(b);
    expect(screen.getByText(/Wynik: 0 z 2/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Spróbuj jeszcze raz" }));
    expect(screen.queryByText(/Wynik:/)).toBeNull();
    expect(screen.getAllByRole("button", { name: "a" })[0]).toBeEnabled();
  });
});
