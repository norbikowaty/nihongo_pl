"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Ja } from "@/components/ja/Ja";
import { kanjiSets, kunLabel } from "@/content/kanji";
import { allWords, searchWords } from "@/lib/dictionary";

const words = allWords();

function WordList() {
  const [query, setQuery] = useState("");
  const found = searchWords(words, query);
  return (
    <>
      <label className="flex max-w-xl flex-col gap-2">
        <span className="font-semibold">Szukaj po japońsku, w rōmaji albo po polsku</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="np. ねこ, neko, kot"
          className="min-h-12 bg-sf px-4 text-lg text-ink"
        />
      </label>
      <p className="mt-4 text-base text-mu" role="status">
        {found.length === words.length ? `${words.length} słów z lekcji` : `Znaleziono: ${found.length}`}
      </p>
      <ul className="mt-4 grid gap-x-10 min-[760px]:grid-cols-2">
        {found.map((w) => (
          <li key={w.id} className="flex items-center justify-between gap-4 border-b border-ln py-2.5">
            <span className="flex flex-col">
              <Ja text={w.ja} className="font-semibold" />
            </span>
            <span className="text-right">{w.pl}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function KanjiList() {
  return (
    <>
      {kanjiSets.map((set) => (
        <section key={set.id} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{set.title}</h2>
          <ul className="grid grid-cols-2 gap-3 min-[760px]:grid-cols-5">
            {set.kanji.map((k) => (
              <li key={k.kanji} className="flex flex-col gap-1 bg-sf p-5">
                <span lang="ja" className="jp text-[56px] leading-none font-semibold">
                  {k.kanji}
                </span>
                <span className="font-semibold">{k.meaning}</span>
                <span lang="ja" className="jp text-[15px]">
                  {k.on.join("、")}
                </span>
                <span lang="ja" className="jp text-[15px]">
                  {k.kun.map(kunLabel).join("、")}
                </span>
                <span className="text-[14px] text-mu">{k.strokes} kresek</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="text-base text-mu">Kolejne zestawy kanji pojawią się razem z lekcjami kursu Kanji N5.</p>
    </>
  );
}

export function Dictionary() {
  const kanji = useSearchParams().get("typ") === "kanji";
  return (
    <div>
      <nav aria-label="Rodzaj" className="mb-8 flex gap-1.5">
        <Link
          href="/slownik"
          aria-current={!kanji ? "page" : undefined}
          className="inline-flex min-h-11 items-center bg-sf px-5 font-semibold no-underline aria-[current=page]:bg-ink aria-[current=page]:text-bg"
        >
          Słowa
        </Link>
        <Link
          href="/slownik?typ=kanji"
          aria-current={kanji ? "page" : undefined}
          className="inline-flex min-h-11 items-center bg-sf px-5 font-semibold no-underline aria-[current=page]:bg-ink aria-[current=page]:text-bg"
        >
          Kanji
        </Link>
      </nav>
      {kanji ? <KanjiList /> : <WordList />}
    </div>
  );
}
