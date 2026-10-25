"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "nihongo-pl:theme";

// The class on <html> is the source of truth; the boot script in the layout sets it before paint.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Without storage the choice lasts until the tab closes.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Włącz tryb dzienny" : "Włącz tryb nocny"}
      aria-pressed={dark}
      className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-as text-ink"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9 1v2M9 15v2M1 9h2M15 9h2M3.3 3.3l1.4 1.4M13.3 13.3l1.4 1.4M3.3 14.7l1.4-1.4M13.3 4.7l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M15 11.5A7 7 0 0 1 6.5 3a7 7 0 1 0 8.5 8.5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </button>
  );
}
