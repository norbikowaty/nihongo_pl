export const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/kursy", label: "Kursy" },
  { href: "/powtorki", label: "Powtórki" },
  { href: "/slownik", label: "Słownik" },
  { href: "/kana", label: "Kana" },
  { href: "/egzamin", label: "Egzamin" },
] as const;

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
