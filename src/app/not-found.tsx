import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[900px] px-4 pt-16 pb-24 min-[1000px]:px-10">
      <h1 className="text-[42px] leading-tight font-bold tracking-[-0.02em]">Nie ma takiej strony</h1>
      <p className="mt-4 max-w-[52ch] text-xl">
        Ta lekcja jeszcze nie powstała albo adres jest błędny. Wszystkie dostępne lekcje znajdziesz w spisie.
      </p>
      <Link href="/kursy" className="mt-8 inline-flex min-h-12 items-center bg-ac px-6 font-semibold text-aci no-underline">
        Spis kursów
      </Link>
    </div>
  );
}
