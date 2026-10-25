"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

/** Fades the old page out and the new one in on every navigation to another address. */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
