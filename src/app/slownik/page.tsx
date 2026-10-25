import type { Metadata } from "next";
import { Suspense } from "react";
import { Dictionary, DictionaryFromAddress } from "@/components/dictionary/Dictionary";

export const metadata: Metadata = { title: "Słownik" };

export default function SlownikPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <h1 className="mb-8 text-[46px] leading-tight font-bold tracking-[-0.02em]">Słownik</h1>
      <Suspense fallback={<Dictionary />}>
        <DictionaryFromAddress />
      </Suspense>
    </div>
  );
}
