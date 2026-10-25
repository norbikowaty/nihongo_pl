"use client";

import { useCallback, useSyncExternalStore } from "react";
import { emptyProgress, parseProgress, type Progress, STORAGE_KEY } from "./store";

const serverSnapshot = emptyProgress();
const listeners = new Set<() => void>();

// When localStorage is unavailable or full, progress lives here for the rest of the visit.
let storageBroken = false;
let memoryRaw: string | null = null;
let lastRaw: string | null | undefined;
let cached: Progress = serverSnapshot;

function readRaw(): string | null {
  if (storageBroken) return memoryRaw;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    storageBroken = true;
    return memoryRaw;
  }
}

function getSnapshot(): Progress {
  const raw = readRaw();
  if (raw !== lastRaw) {
    lastRaw = raw;
    cached = parseProgress(raw);
  }
  return cached;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: Progress) {
  const raw = JSON.stringify(next);
  memoryRaw = raw;
  if (!storageBroken) {
    try {
      localStorage.setItem(STORAGE_KEY, raw);
    } catch {
      storageBroken = true;
    }
  }
  lastRaw = raw;
  cached = next;
  listeners.forEach((l) => l());
}

export function useProgress(): { progress: Progress; update: (fn: (p: Progress) => Progress) => void } {
  const progress = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  const update = useCallback((fn: (p: Progress) => Progress) => write(fn(getSnapshot())), []);
  return { progress, update };
}
