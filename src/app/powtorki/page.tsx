import type { Metadata } from "next";
import { ReviewSession } from "@/components/review/ReviewSession";

export const metadata: Metadata = { title: "Powtórki" };

export default function PowtorkiPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <h1 className="mb-6 text-[46px] leading-tight font-bold tracking-[-0.02em]">Powtórki</h1>
      <ReviewSession />
    </div>
  );
}
