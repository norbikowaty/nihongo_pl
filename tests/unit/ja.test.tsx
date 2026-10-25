import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Ja } from "@/components/ja/Ja";
import { Prose } from "@/components/ja/Prose";
import { splitProse } from "@/lib/prose";

describe("Ja", () => {
  it("renders ruby and romaji", () => {
    const { container } = render(
      <Ja text={{ segs: [{ t: "私", r: "わたし" }, { t: "は" }], romaji: "Watashi wa" }} />,
    );
    expect(container.querySelector("rt")).toHaveTextContent("わたし");
    expect(container.querySelector("[lang='ja']")).toHaveTextContent("私");
    expect(container.querySelector(".rm")).toHaveTextContent("Watashi wa");
  });

  it("does not add ruby to segments without a reading", () => {
    const { container } = render(<Ja text={{ segs: [{ t: "これ" }], romaji: "kore" }} />);
    expect(container.querySelector("ruby")).toBeNull();
  });
});

describe("prose", () => {
  it("splits Japanese runs from Polish text", () => {
    expect(splitProse("Partykuła は i です.")).toEqual([
      { ja: false, text: "Partykuła " },
      { ja: true, text: "は" },
      { ja: false, text: " i " },
      { ja: true, text: "です" },
      { ja: false, text: "." },
    ]);
  });

  it("keeps Japanese punctuation inside a run", () => {
    expect(splitProse("A: これは本です。")).toEqual([
      { ja: false, text: "A: " },
      { ja: true, text: "これは本です。" },
    ]);
  });

  it("renders paragraphs with Japanese marked", () => {
    render(<Prose text={"Pierwszy は.\n\nDrugi akapit."} />);
    expect(screen.getByText("は")).toHaveAttribute("lang", "ja");
    expect(screen.getByText("Drugi akapit.").tagName).toBe("P");
  });
});
