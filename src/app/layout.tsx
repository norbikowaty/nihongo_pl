import type { Metadata } from "next";
import { Noto_Serif_JP, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { ReadingSync } from "@/components/shell/ReadingSwitch";
import { ScrollToTop } from "@/components/shell/ScrollToTop";
import "./globals.css";

const serif = Source_Serif_4({
  variable: "--font-serif-src",
  subsets: ["latin", "latin-ext"],
});

const jp = Noto_Serif_JP({
  variable: "--font-jp-src",
  weight: ["400", "600"],
  preload: false,
});

export const metadata: Metadata = {
  title: { default: "Nihongo PL", template: "%s · Nihongo PL" },
  description: "Kurs japońskiego po polsku, od pierwszego znaku do egzaminu JLPT N5.",
};

// Runs before first paint so the saved theme and reading-aid level never flash.
const bootScript = `(function(){var h=document.documentElement;try{var t=localStorage.getItem("nihongo-pl:theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)h.classList.add("dark")}catch(e){}var c=/^\\/kursy\\/pismo(\\/|$)/.test(location.pathname)?"pismo":"reszta";var l=c==="pismo"?2:1;try{var p=JSON.parse(localStorage.getItem("nihongo-pl:progress")||"null");var v=p&&p.settings&&p.settings.reading&&p.settings.reading[c];if(v===0||v===1||v===2)l=v}catch(e){}h.setAttribute("data-reading",String(l))})()`;

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
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <ReadingSync />
      </body>
    </html>
  );
}
