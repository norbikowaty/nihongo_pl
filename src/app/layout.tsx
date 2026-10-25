import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { ReadingSync } from "@/components/shell/ReadingSwitch";
import { RouteTransition } from "@/components/shell/RouteTransition";
import { ScrollToTop } from "@/components/shell/ScrollToTop";
import "./globals.css";

const serif = Source_Serif_4({
  variable: "--font-serif-src",
  subsets: ["latin", "latin-ext"],
});

// Self-hosted subset of Noto Serif JP with only the characters the site uses (scripts/subset-font.ts).
// Google's full font ships ~70 KB of @font-face CSS that blocks rendering.
const jp = localFont({
  variable: "--font-jp-src",
  src: [
    { path: "../../public/fonts/noto-serif-jp-400.woff2", weight: "400" },
    { path: "../../public/fonts/noto-serif-jp-600.woff2", weight: "600" },
  ],
  display: "swap",
  // Not preloaded: pages without Japanese (exam, legal) should not wait for it.
  preload: false,
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "serif"],
});

export const metadata: Metadata = {
  title: { default: "Nihongo PL", template: "%s · Nihongo PL" },
  description: "Kurs japońskiego po polsku, od pierwszego znaku do egzaminu JLPT N5.",
};

// Runs before first paint so the saved theme and reading-aid level never flash. Day mode unless the learner chose night.
const bootScript = `(function(){var h=document.documentElement;try{var t=localStorage.getItem("nihongo-pl:theme");if(t==="dark")h.classList.add("dark")}catch(e){}var c=/^\\/kursy\\/pismo(\\/|$)/.test(location.pathname)?"pismo":"reszta";var l=c==="pismo"?2:1;try{var p=JSON.parse(localStorage.getItem("nihongo-pl:progress")||"null");var v=p&&p.settings&&p.settings.reading&&p.settings.reading[c];if(v===0||v===1||v===2)l=v}catch(e){}h.setAttribute("data-reading",String(l))})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${serif.variable} ${jp.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#tresc" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-sf focus:p-3">
          Przejdź do treści
        </a>
        <Header />
        <main id="tresc" className="flex-1">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <ReadingSync />
      </body>
    </html>
  );
}
