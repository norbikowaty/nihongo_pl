import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import recordings from "@/content/audio.json";
import { spokenTexts } from "@/lib/audio-texts";
import { audioKey, hasRecording, spokenText } from "@/lib/speech";

describe("speech", () => {
  it("reads a single word from its furigana and a sentence as written", () => {
    expect(spokenText({ segs: [{ t: "何", r: "なん" }], romaji: "nan" })).toBe("なん");
    expect(spokenText({ segs: [{ t: "私", r: "わたし" }, { t: "は" }, { t: "学生", r: "がくせい" }, { t: "です。" }], romaji: "" })).toBe(
      "私は学生です。",
    );
    expect(spokenText("か")).toBe("か");
  });

  it("names recordings by a stable hash of the text", () => {
    expect(audioKey("あ")).toMatch(/^[0-9a-f]{8}$/);
    expect(audioKey("あ")).toBe(audioKey("あ"));
    expect(audioKey("あ")).not.toBe(audioKey("い"));
  });

  it.skipIf(recordings.files.length === 0)("every text with a play button has a recording on disk", () => {
    for (const text of spokenTexts()) expect(hasRecording(text), `run: npx tsx scripts/make-audio.ts (${text})`).toBe(true);
    for (const key of recordings.files as string[]) expect(existsSync(join(process.cwd(), "public", "audio", `${key}.mp3`)), key).toBe(true);
  });
});
