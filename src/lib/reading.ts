import type { ReadingContext } from "@/lib/progress/store";

export function readingContextFor(pathname: string): ReadingContext {
  return pathname === "/kursy/pismo" || pathname.startsWith("/kursy/pismo/") ? "pismo" : "reszta";
}
