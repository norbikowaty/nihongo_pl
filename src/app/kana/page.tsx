import type { Metadata } from "next";
import { KanaTable } from "@/components/kana/KanaTable";

export const metadata: Metadata = { title: "Tabela kana" };

export default function KanaPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <h1 className="text-[46px] leading-tight font-bold tracking-[-0.02em]">Tabela kana</h1>
      <p className="mt-3 mb-8 max-w-[56ch] text-xl">
        Hiragana i katakana z wymową. Kolumny czyta się od prawej: <span lang="ja" className="jp">あ</span>,{" "}
        <span lang="ja" className="jp">か</span>, <span lang="ja" className="jp">さ</span>…
      </p>
      <KanaTable />
    </div>
  );
}
