"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { initialHeader, nextHeader } from "@/lib/header-visibility";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { isActive, navLinks } from "./nav";
import { ReadingSwitch } from "./ReadingSwitch";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const state = useRef(initialHeader);
  const path = useRef(pathname);
  // The page the header was hidden on; a new page always starts with the header visible.
  const [hiddenOn, setHiddenOn] = useState<string | null>(null);
  const hidden = hiddenOn === pathname;

  useEffect(() => {
    path.current = pathname;
    state.current = { ...initialHeader, lastY: window.scrollY };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      state.current = nextHeader(state.current, window.scrollY);
      setHiddenOn(state.current.hidden ? path.current : null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-hidden={hidden}
      className="sticky top-0 z-20 border-b border-ln bg-bg px-4 transition-transform duration-[280ms] ease-out data-[hidden=true]:-translate-y-full motion-reduce:transition-none min-[1000px]:px-10"
    >
      <div className="mx-auto flex min-h-16 max-w-[1240px] items-center gap-3 min-[1000px]:gap-8">
        <Logo />
        <nav aria-label="Główne" className="hidden gap-[26px] min-[1000px]:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className="inline-flex min-h-16 items-center whitespace-nowrap border-b-[3px] border-transparent pt-[3px] text-[17px] no-underline aria-[current=page]:border-ac aria-[current=page]:font-bold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 min-[1000px]:gap-3.5">
          <div className="hidden min-[1000px]:block">
            <ReadingSwitch />
          </div>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
