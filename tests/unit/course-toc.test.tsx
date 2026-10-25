import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseToc } from "@/components/courses/CourseToc";
import { courses } from "@/content/catalog";
import type { Lesson } from "@/content/schema";
import { courseSummary, lessonState, nextLessonId } from "@/lib/lessons";
import { completeLesson, emptyProgress } from "@/lib/progress/store";

const now = new Date("2026-10-25T10:00:00Z");
const ja = (t: string) => ({ segs: [{ t }], romaji: t });

const fake = (course: Lesson["course"], slug: string): Lesson => ({
  id: `${course}/${slug}`,
  course,
  section: slug.split("/")[0],
  slug,
  title: slug,
  minutes: 10,
  kind: "lesson",
  steps: [
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "examples", items: [{ ja: ja("あ"), pl: "a" }] },
    { kind: "summary", points: ["x"], words: [] },
  ],
});

const available = [
  fake("pismo", "hiragana/a-o"),
  fake("pismo", "hiragana/ka-ko"),
  fake("gramatyka", "pierwsze-zdania/desu"),
];

describe("lesson state", () => {
  it("returns soon for unlisted lesson", () => {
    expect(lessonState("pismo", "katakana/a-ko", emptyProgress(), available)).toBe("soon");
  });

  it("first unfinished available lesson is current", () => {
    const p = completeLesson(emptyProgress(), available[0], now);
    expect(lessonState("pismo", "hiragana/a-o", p, available)).toBe("done");
    expect(lessonState("pismo", "hiragana/ka-ko", p, available)).toBe("current");
    expect(lessonState("gramatyka", "pierwsze-zdania/desu", p, available)).toBe("open");
    expect(nextLessonId(p, available)).toBe("pismo/hiragana/ka-ko");
  });

  it("course summary counts finished lessons", () => {
    const pismo = courses.find((c) => c.id === "pismo")!;
    expect(courseSummary(pismo, emptyProgress())).toBe("nie zaczęty");
    expect(courseSummary(pismo, completeLesson(emptyProgress(), available[0], now))).toBe("1 / 21");
  });
});

describe("CourseToc", () => {
  it("opens only the course with the current lesson", () => {
    const p = completeLesson(
      completeLesson(emptyProgress(), available[0], now),
      available[1],
      now,
    );
    const { container } = render(<CourseToc courses={courses} progress={p} available={available} />);
    const open = [...container.querySelectorAll("details")].filter((d) => d.open).map((d) => d.id);
    expect(open).toEqual(["gramatyka"]);
  });

  it("soon items are not links", () => {
    render(<CourseToc courses={courses} progress={emptyProgress()} available={available} />);
    const soon = screen.getByText("ア–オ i カ–コ").closest("li")!;
    expect(soon.querySelector("a")).toBeNull();
    expect(soon).toHaveTextContent("wkrótce");
  });

  it("available items link to their lesson", () => {
    render(<CourseToc courses={courses} progress={emptyProgress()} available={available} />);
    expect(screen.getByRole("link", { name: /あ・い・う・え・お/ })).toHaveAttribute(
      "href",
      "/kursy/pismo/hiragana/a-o",
    );
  });
});
