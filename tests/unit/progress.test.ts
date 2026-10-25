import { describe, expect, it } from "vitest";
import type { Lesson } from "@/content/schema";
import {
  completeLesson,
  emptyProgress,
  loadProgress,
  parseProgress,
  saveProgress,
  setLessonStep,
  setNote,
  setReading,
  STORAGE_KEY,
} from "@/lib/progress/store";
import { newCard } from "@/lib/srs";

const now = new Date("2026-10-25T10:00:00Z");
const ja = (t: string) => ({ segs: [{ t }], romaji: t });

const lesson: Lesson = {
  id: "gramatyka/pierwsze-zdania/wa-desu",
  course: "gramatyka",
  section: "pierwsze-zdania",
  slug: "pierwsze-zdania/wa-desu",
  title: "Partykuła は i です",
  minutes: 12,
  kind: "lesson",
  steps: [
    { kind: "newKana", chars: ["あ"] },
    { kind: "examples", items: [{ ja: ja("これ"), pl: "to" }] },
    { kind: "examples", items: [{ ja: ja("これ"), pl: "to" }] },
    { kind: "examples", items: [{ ja: ja("これ"), pl: "to" }] },
    {
      kind: "summary",
      points: ["x"],
      words: [
        { id: "a", ja: ja("あ"), pl: "a" },
        { id: "b", ja: ja("び"), pl: "b" },
      ],
    },
  ],
};

class MemoryStorage {
  data = new Map<string, string>();
  getItem(k: string) {
    return this.data.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.data.set(k, v);
  }
  removeItem(k: string) {
    this.data.delete(k);
  }
  clear() {
    this.data.clear();
  }
  key() {
    return null;
  }
  get length() {
    return this.data.size;
  }
}

describe("progress store", () => {
  it("parseProgress returns empty for invalid JSON", () => {
    expect(parseProgress("{oops")).toEqual(emptyProgress());
  });

  it("parseProgress returns empty for other version", () => {
    expect(parseProgress('{"version":2}')).toEqual(emptyProgress());
  });

  it("parseProgress returns empty for missing fields", () => {
    expect(parseProgress('{"version":1}')).toEqual(emptyProgress());
  });

  it("parseProgress returns empty for null", () => {
    expect(parseProgress(null)).toEqual(emptyProgress());
  });

  it("loadProgress works without storage", () => {
    expect(loadProgress(null)).toEqual(emptyProgress());
  });

  it("loadProgress survives a storage that throws on read", () => {
    const s = new MemoryStorage();
    s.getItem = () => {
      throw new Error("SecurityError");
    };
    expect(loadProgress(s as unknown as Storage)).toEqual(emptyProgress());
  });

  it("saveProgress swallows quota errors", () => {
    const s = new MemoryStorage();
    s.setItem = () => {
      throw new Error("QuotaExceededError");
    };
    expect(() => saveProgress(emptyProgress(), s as unknown as Storage)).not.toThrow();
  });

  it("save and load round trip", () => {
    const s = new MemoryStorage() as unknown as Storage;
    const p = setLessonStep(emptyProgress(), lesson.id, 3, now);
    saveProgress(p, s);
    expect(s.getItem(STORAGE_KEY)).not.toBeNull();
    expect(loadProgress(s)).toEqual(p);
  });

  it("default reading levels", () => {
    expect(emptyProgress().settings.reading).toEqual({ pismo: 2, reszta: 1 });
  });

  it("completeLesson adds one card per word and kana and keeps existing cards", () => {
    const old = { card: newCard(new Date("2026-10-01T00:00:00Z")), updatedAt: "2026-10-01T00:00:00.000Z" };
    const start = { ...emptyProgress(), cards: { "word:a": old } };
    const p = completeLesson(start, lesson, now);
    expect(p.lessons[lesson.id].status).toBe("done");
    expect(Object.keys(p.cards).sort()).toEqual(["kana:あ", "word:a", "word:b"]);
    expect(p.cards["word:a"]).toBe(old);
    expect(start.cards).toEqual({ "word:a": old });
  });

  it("setReading changes one context only", () => {
    const p = setReading(emptyProgress(), "reszta", 0);
    expect(p.settings.reading).toEqual({ pismo: 2, reszta: 0 });
  });

  it("setNote stores text with a timestamp", () => {
    const p = setNote(emptyProgress(), lesson.id, "は = wa", now);
    expect(p.notes[lesson.id]).toEqual({ text: "は = wa", updatedAt: now.toISOString() });
  });

  it("setLessonStep does not downgrade a finished lesson", () => {
    const done = completeLesson(emptyProgress(), lesson, now);
    expect(setLessonStep(done, lesson.id, 2, now).lessons[lesson.id].status).toBe("done");
  });
});
