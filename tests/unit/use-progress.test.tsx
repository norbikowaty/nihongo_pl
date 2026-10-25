import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { emptyProgress, setNote, STORAGE_KEY } from "@/lib/progress/store";
import { useProgress } from "@/lib/progress/useProgress";

const now = new Date("2026-10-25T10:00:00Z");

describe("useProgress", () => {
  it("reads saved progress", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(setNote(emptyProgress(), "x", "hej", now)));
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.notes.x.text).toBe("hej");
  });

  it("update saves to localStorage and re-renders", () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.update((p) => setNote(p, "x", "nowa", now)));
    expect(result.current.progress.notes.x.text).toBe("nowa");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).notes.x.text).toBe("nowa");
  });

  it("follows changes made in another tab", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(setNote(emptyProgress(), "x", "z innej karty", now)));
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
    });
    expect(result.current.progress.notes.x.text).toBe("z innej karty");
  });
});
