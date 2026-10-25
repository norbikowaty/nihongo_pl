import { describe, expect, it } from "vitest";
import { spokenText } from "@/lib/speech";

describe("speech", () => {
  it("reads a single word from its furigana and a sentence as written", () => {
    expect(spokenText({ segs: [{ t: "何", r: "なん" }], romaji: "nan" })).toBe("なん");
    expect(spokenText({ segs: [{ t: "私", r: "わたし" }, { t: "は" }, { t: "学生", r: "がくせい" }, { t: "です。" }], romaji: "" })).toBe(
      "私は学生です。",
    );
    expect(spokenText("か")).toBe("か");
  });
});
