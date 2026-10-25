import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ln bg-sf px-4 min-[1000px]:px-10">
      <div className="mx-auto grid max-w-[1240px] gap-8 pt-10 pb-8 min-[760px]:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2.5 text-xl font-bold">
            <span lang="ja" className="jp bg-ac px-[7px] py-0.5 text-[15px] tracking-[0.04em] text-aci">
              日本語
            </span>
            Nihongo PL
          </span>
          <span className="max-w-[36ch] text-base text-mu">
            Kurs japońskiego po polsku, od pierwszego znaku do egzaminu JLPT N5.
          </span>
        </div>
        <nav aria-label="Informacje" className="flex flex-col gap-2 text-base">
          <Link href="/regulamin">Regulamin</Link>
          <Link href="/prywatnosc">Polityka prywatności</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/licencje">Licencje i źródła</Link>
        </nav>
        <div className="flex flex-col gap-2 text-base">
          <span>Autor</span>
          <a href="https://github.com/norbikowaty" className="inline-flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            norbikowaty
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] border-t border-ln pt-4 pb-7 text-[15px] text-mu">© 2026 Nihongo PL</div>
    </footer>
  );
}
