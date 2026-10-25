"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActive, navLinks } from "./nav";
import { ReadingSwitch } from "./ReadingSwitch";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-[1000px]:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="min-h-10 cursor-pointer bg-as px-4 text-[16px] font-semibold"
      >
        Menu
      </button>
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 top-16 z-30 flex flex-col gap-1 border-b border-ln bg-bg px-4 pt-2 pb-6"
        >
          <nav aria-label="Główne" className="flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className="py-3 text-[19px] no-underline aria-[current=page]:font-bold aria-[current=page]:text-ac"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3">
            <ReadingSwitch />
          </div>
        </div>
      )}
    </div>
  );
}
