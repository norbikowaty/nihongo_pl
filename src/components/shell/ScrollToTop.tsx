"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Every new page starts at the top, also when the sticky header would make Next keep the offset. */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
