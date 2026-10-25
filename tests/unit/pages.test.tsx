import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { KanaTable } from "@/components/kana/KanaTable";
import { kanjiSets } from "@/content/kanji";
import { w } from "@/content/lessons/words";
import { allWords, normalize, searchWords } from "@/lib/dictionary";

describe("kana table", () => {
  it("kana page shows 46 hiragana", () => {
    render(<KanaTable />);
    expect(screen.getAllByTestId("kana-cell")).toHaveLength(46);
    expect(screen.getByText("あ")).toBeInTheDocument();
  });

  it("switches to katakana", async () => {
    const user = userEvent.setup();
    render(<KanaTable />);
    await user.click(screen.getByRole("button", { name: "Katakana" }));
    expect(screen.getAllByTestId("kana-cell")).toHaveLength(46);
    expect(screen.getByText("ア")).toBeInTheDocument();
  });
});

describe("dictionary", () => {
  it("lists each lesson word once", () => {
    const ids = allWords().map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("hon");
  });

  it("normalize drops case and Polish diacritics", () => {
    expect(normalize("Książka ŁÓDŹ")).toBe("ksiazka lodz");
  });

  it("dictionary search ignores Polish diacritics", () => {
    expect(searchWords(allWords(), "ksiazka").map((x) => x.id)).toContain("hon");
  });

  it("dictionary search matches romaji and Japanese", () => {
    expect(searchWords(allWords(), "hon").map((x) => x.id)).toContain("hon");
    expect(searchWords(allWords(), "ほん").map((x) => x.id)).toContain("hon");
    const kanji = searchWords(allWords(), "本").map((x) => x.id);
    expect(kanji[0]).toBe("hon");
    expect(kanji).toContain("nihongo");
  });

  it("empty query returns everything", () => {
    expect(searchWords([w.hon, w.neko], "  ")).toHaveLength(2);
  });
});

describe("kanji", () => {
  it("first set is the numbers one to ten", () => {
    expect(kanjiSets[0].kanji.map((k) => k.kanji).join("")).toBe("一二三四五六七八九十");
  });
});
