import Link from "next/link";
import { TodayBlock } from "@/components/home/TodayBlock";
import { btnSecondary } from "@/components/lesson/exercises/buttons";
import { egzaminFacts } from "@/content/egzamin";

const shortcuts = [
  { href: "/kana", glyph: "あア", title: "Tabela kana", note: "92 znaki z wymową" },
  { href: "/slownik", glyph: "語", title: "Słownik N5", note: "słowa z lekcji" },
  { href: "/slownik?typ=kanji", glyph: "漢", title: "Lista kanji", note: "kanji z lekcji" },
  { href: "/kursy#gramatyka", glyph: "文", title: "Gramatyka w pigułce", note: "9 działów" },
];

export default function Home() {
  const f = egzaminFacts;
  const minutes = f.parts.reduce((s, p) => s + p.minutes, 0);
  const rows = [
    ["Terminy", f.poland.nextDate ?? `${f.months.join(" i ")}, daty podaje organizator`],
    ["Czas", `${minutes} minut, ${f.parts.length} części`],
    ["Zaliczenie", `${f.scores.total.pass} ze ${f.scores.total.max} punktów`],
    ["W Polsce", f.poland.cities.join(", ")],
  ];

  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <TodayBlock />

      <nav aria-label="Ściągi" className="mt-3 grid grid-cols-2 gap-3 min-[760px]:grid-cols-4">
        {shortcuts.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex flex-col gap-1.5 bg-sf px-6 py-5 no-underline transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            <span lang="ja" className="jp text-[30px] leading-tight">
              {s.glyph}
            </span>
            <span className="font-bold">{s.title}</span>
            <span className="text-[15px] text-mu">{s.note}</span>
          </Link>
        ))}
      </nav>

      <section className="mt-14 grid gap-10 min-[760px]:grid-cols-2">
        <div>
          <h2 className="text-[30px] font-bold">Egzamin JLPT N5</h2>
          <p className="mt-3 max-w-[40ch] text-[19px]">
            Pierwszy z pięciu poziomów oficjalnego egzaminu z japońskiego. Same pytania testowe, bez części ustnej.
          </p>
          <Link href="/egzamin" className={`${btnSecondary} mt-6 no-underline`}>
            Wszystko o egzaminie
          </Link>
        </div>
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6">
          {rows.map(([dt, dd]) => (
            <div key={dt} className="contents">
              <dt className="border-b border-ln py-3 font-bold">{dt}</dt>
              <dd className="border-b border-ln py-3">{dd}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
