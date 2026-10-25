import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary } from "@/components/lesson/exercises/buttons";
import { egzaminFacts } from "@/content/egzamin";

export const metadata: Metadata = { title: "Egzamin JLPT N5" };

const faq = [
  {
    q: "Czy muszę zacząć od N5?",
    a: "Nie. Możesz od razu wybrać dowolny poziom. N5 to dobry pierwszy cel, bo pokazuje, jak wygląda egzamin, przy najmniejszym zakresie materiału.",
  },
  {
    q: "Ile trzeba umieć na N5?",
    a: "Hiraganę i katakanę, około 100 kanji, około 800 słów i podstawową gramatykę. JLPT nie publikuje oficjalnych list, więc te liczby są przybliżone. Tyle obejmują kursy na tej stronie.",
  },
  {
    q: "Czy mogę korzystać z rōmaji na egzaminie?",
    a: "Nie. Arkusz jest w całości po japońsku, w kana i kanji. Dlatego rōmaji na tej stronie możesz w każdej chwili wyłączyć.",
  },
  { q: "Czy certyfikat wygasa?", a: "Nie. Certyfikat JLPT nie ma daty ważności." },
  {
    q: "Jak przygotować się na tej stronie?",
    a: "Przejdź kurs Pisma, potem prowadź równolegle gramatykę, słownictwo i kanji. Na koniec rozwiąż arkusze próbne w czasie egzaminu.",
  },
];

const th = "border-b border-ln py-3 pr-4 text-left text-base font-bold";
const td = "border-b border-ln py-3 pr-4 align-baseline";

export default function EgzaminPage() {
  const f = egzaminFacts;
  return (
    <div className="mx-auto max-w-[900px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <h1 className="text-[46px] leading-tight font-bold tracking-[-0.02em]">Egzamin JLPT N5</h1>
      <p className="mt-4 max-w-[54ch] text-[21px]">
        JLPT to oficjalny egzamin z języka japońskiego, organizowany przez Japan Foundation. Ma {f.levels} poziomów: od N5,
        najłatwiejszego, do N1. Odbywa się na całym świecie w lipcu i w grudniu.
      </p>

      <h2 className="mt-14 mb-4 text-[28px] font-bold">Jak wygląda egzamin</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={th}>Część</th>
              <th className={th}>Co sprawdza</th>
              <th className={th}>Czas</th>
            </tr>
          </thead>
          <tbody>
            {f.parts.map((p) => (
              <tr key={p.name}>
                <td className={td}>{p.name}</td>
                <td className={td}>{p.scope}</td>
                <td className={`${td} whitespace-nowrap`}>{p.minutes} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Wszystkie pytania są testem wyboru. Nie ma części ustnej ani pisania własnych tekstów, a w arkuszu nie ma rōmaji.
      </p>

      <h2 className="mt-14 mb-4 text-[28px] font-bold">Kiedy zdajesz</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={th}>Wynik</th>
              <th className={th}>Zakres</th>
              <th className={th}>Minimum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td}>Wiedza językowa i czytanie</td>
              <td className={td}>0–{f.scores.knowledgeReading.max}</td>
              <td className={td}>{f.scores.knowledgeReading.min}</td>
            </tr>
            <tr>
              <td className={td}>Słuchanie</td>
              <td className={td}>0–{f.scores.listening.max}</td>
              <td className={td}>{f.scores.listening.min}</td>
            </tr>
            <tr>
              <td className={`${td} font-bold`}>Razem</td>
              <td className={td}>0–{f.scores.total.max}</td>
              <td className={`${td} font-bold`}>{f.scores.total.pass}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Trzeba osiągnąć minimum w każdej części i co najmniej {f.scores.total.pass} punktów łącznie.
      </p>

      <h2 className="mt-14 mb-4 text-[28px] font-bold">Terminy i zapisy w Polsce</h2>
      <p className="max-w-[62ch]">
        Egzamin w Polsce przeprowadza {f.poland.host} w Warszawie. Oficjalna lista miejsc egzaminu wymienia też{" "}
        {f.poland.cities.filter((c) => c !== "Warszawa").join(", ")}.{" "}
        {f.poland.nextDate ? `Najbliższy termin: ${f.poland.nextDate}.` : "Daty egzaminu, terminy zapisów i opłatę podaje organizator."}
      </p>

      <h2 className="mt-14 mb-2 text-[28px] font-bold">Pytania</h2>
      {faq.map((item, i) => (
        <details key={item.q} open={i === 0} className="group border-t border-ln">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 py-4 text-xl font-semibold [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg className="shrink-0 transition-transform group-open:rotate-180" width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
              <path d="M1 1l8 8 8-8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </summary>
          <p className="mb-5 max-w-[62ch]">{item.a}</p>
        </details>
      ))}

      <Link href="/kursy" className={`${btnPrimary} mt-8 no-underline`}>
        Zobacz kursy N5
      </Link>

      <p className="mt-14 text-base text-mu">
        Stan na {f.checkedAt}. Źródła:{" "}
        {f.sources.map((s, i) => (
          <span key={s.url}>
            <a href={s.url} className="text-mu">
              {s.label}
            </a>
            {i < f.sources.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </div>
  );
}
