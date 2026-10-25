import type { Metadata } from "next";
import { Noto_Serif_JP, Source_Serif_4 } from "next/font/google";
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

// Runs before first paint so the saved or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("nihongo-pl:theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${serif.variable} ${jp.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
