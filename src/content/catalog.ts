import type { Course } from "./schema";

type Item = [slug: string, title: string, label: string];

const section = (id: string, title: string, items: Item[]) => ({
  id,
  title,
  items: items.map(([slug, t, label]) => ({ slug: `${id}/${slug}`, title: t, label })),
});

const grammar = (id: string, title: string, items: Item[]) =>
  section(id, title, [...items, ["test", "Test działu", "10 min"]]);

const sheet = (n: number) =>
  section(`arkusz-${n}`, `Arkusz ${n}`, [
    ["slownictwo", "Słownictwo", "20 min"],
    ["gramatyka-i-czytanie", "Gramatyka i czytanie", "40 min"],
    ["sluchanie", "Słuchanie", "30 min"],
  ]);

export const courses: Course[] = [
  {
    id: "pismo",
    glyph: "あ",
    title: "Pismo: hiragana i katakana",
    meta: "21 lekcji · ok. 6 h · rōmaji domyślnie włączone",
    sections: [
      section("hiragana", "Hiragana", [
        ["a-o", "あ・い・う・え・お", "15 min"],
        ["ka-ko", "か・き・く・け・こ", "15 min"],
        ["sa-so", "さ・し・す・せ・そ", "15 min"],
        ["ta-to", "た・ち・つ・て・と", "15 min"],
        ["na-no", "な・に・ぬ・ね・の", "15 min"],
        ["ha-ho", "は・ひ・ふ・へ・ほ", "15 min"],
        ["ma-mo", "ま・み・む・め・も", "15 min"],
        ["ra-ro", "ら・り・る・れ・ろ", "15 min"],
        ["ya-n", "や・ゆ・よ・わ・を・ん", "20 min"],
        ["dakuten", "Dźwięczne znaki: が・ざ・だ・ば", "25 min"],
        ["handakuten", "ぱ–ぽ i małe znaki", "25 min"],
      ]),
      section("katakana", "Katakana", [
        ["a-ko", "ア–オ i カ–コ", "20 min"],
        ["sa-so", "サ・シ・ス・セ・ソ", "15 min"],
        ["ta-to", "タ・チ・ツ・テ・ト", "15 min"],
        ["na-no", "ナ・ニ・ヌ・ネ・ノ", "15 min"],
        ["ha-ho", "ハ・ヒ・フ・ヘ・ホ", "15 min"],
        ["ma-mo", "マ・ミ・ム・メ・モ", "15 min"],
        ["ra-ro", "ラ・リ・ル・レ・ロ", "15 min"],
        ["ya-n", "ヤ・ユ・ヨ・ワ・ヲ・ン", "20 min"],
        ["dakuten", "Dźwięczne znaki: ガ・ザ・ダ・バ", "25 min"],
        ["handakuten", "パ–ポ i małe znaki", "25 min"],
      ]),
    ],
  },
  {
    id: "gramatyka",
    glyph: "文",
    title: "Gramatyka N5",
    meta: "9 działów · 36 lekcji i 9 testów · ok. 14 h",
    sections: [
      grammar("pierwsze-zdania", "Pierwsze zdania", [
        ["desu", "です — to jest", "10 min"],
        ["wa-desu", "Partykuła は i です", "12 min"],
        ["ka", "Pytania z か", "10 min"],
        ["no", "Partykuła の", "12 min"],
      ]),
      grammar("to-i-tamto", "To i tamto", [
        ["kore-sore-are", "これ・それ・あれ", "10 min"],
        ["kono-sono-ano", "この・その・あの", "10 min"],
        ["koko-soko-asoko", "ここ・そこ・あそこ", "10 min"],
        ["dare-dore-doko", "だれ・どれ・どこ", "12 min"],
      ]),
      grammar("liczby-i-czas", "Liczby i czas", [
        ["liczby", "Liczby do 10 000", "15 min"],
        ["godziny", "Godziny i minuty", "12 min"],
        ["daty", "Dni tygodnia i daty", "15 min"],
        ["ceny", "Ceny: いくら", "10 min"],
      ]),
      grammar("czasowniki-masu", "Czasowniki ます", [
        ["masu", "Forma ます", "12 min"],
        ["masen", "Przeczenie ません", "10 min"],
        ["mashita", "Czas przeszły ました", "12 min"],
        ["masenka", "Zaproszenia ませんか", "10 min"],
      ]),
      grammar("partykuly", "Partykuły", [
        ["o", "を — dopełnienie", "12 min"],
        ["ni-e", "に i へ — kierunek", "12 min"],
        ["de", "で — miejsce i narzędzie", "12 min"],
        ["to-mo", "と i も", "10 min"],
      ]),
      grammar("przymiotniki", "Przymiotniki", [
        ["i", "Przymiotniki い", "12 min"],
        ["na", "Przymiotniki な", "12 min"],
        ["przeczenie", "Przeczenie przymiotników", "10 min"],
        ["przeszly", "Czas przeszły przymiotników", "12 min"],
      ]),
      grammar("istnienie", "Istnienie i miejsce", [
        ["arimasu-imasu", "あります i います", "12 min"],
        ["ni", "Gdzie co jest: に", "10 min"],
        ["pozycje", "うえ・した・なか", "10 min"],
        ["liczniki", "Liczniki: つ・人・本", "15 min"],
      ]),
      grammar("forma-te", "Forma て", [
        ["tworzenie", "Jak tworzyć formę て", "15 min"],
        ["kudasai", "てください — prośby", "10 min"],
        ["teimasu", "ています — teraz", "12 min"],
        ["temoii", "てもいいです — pozwolenie", "10 min"],
      ]),
      grammar("checi", "Chęci i porównania", [
        ["tai", "たい — chcę", "10 min"],
        ["hoshii", "ほしい — chcę mieć", "10 min"],
        ["yori", "より i ほうが", "12 min"],
        ["powtorka", "Powtórka przed egzaminem", "20 min"],
      ]),
    ],
  },
  {
    id: "slownictwo",
    glyph: "語",
    title: "Słownictwo N5",
    meta: "16 tematów · 771 słów",
    sections: [
      section("codziennosc", "Codzienność", [
        ["rodzina", "Ludzie i rodzina", "64 słowa"],
        ["jedzenie", "Jedzenie i picie", "58 słów"],
        ["czas", "Czas i kalendarz", "72 słowa"],
        ["liczby", "Liczby i liczniki", "46 słów"],
        ["dom", "Dom", "44 słowa"],
      ]),
      section("na-miescie", "Na mieście", [
        ["zakupy", "Zakupy", "40 słów"],
        ["miasto", "Miasto i transport", "61 słów"],
        ["szkola", "Szkoła i praca", "55 słów"],
        ["zdrowie", "Ciało i zdrowie", "38 słów"],
        ["pogoda", "Pogoda i pory roku", "41 słów"],
      ]),
      section("budowa-zdan", "Budowa zdań", [
        ["kolory", "Kolory i kształty", "30 słów"],
        ["ruch", "Czasowniki ruchu", "36 słów"],
        ["czasowniki", "Czasowniki codzienne", "52 słowa"],
        ["przymiotniki", "Przymiotniki", "60 słów"],
        ["pytania", "Pytania i zaimki", "34 słowa"],
        ["zwroty", "Zwroty grzecznościowe", "40 słów"],
      ]),
    ],
  },
  {
    id: "kanji",
    glyph: "漢",
    title: "Kanji N5",
    meta: "10 zestawów · 100 znaków",
    sections: [
      section("liczby-i-czas", "Liczby i czas", [
        ["liczby", "一 二 三 … 十", "10 znaków"],
        ["pieniadze", "百 千 万 円 …", "10 znaków"],
        ["dni", "日 月 火 水 木 金 土 …", "10 znaków"],
        ["czas", "年 時 分 半 今 …", "10 znaków"],
      ]),
      section("ludzie-i-miejsca", "Ludzie i miejsca", [
        ["ludzie", "人 男 女 子 父 母 …", "10 znaków"],
        ["szkola", "学 校 先 生 本 …", "10 znaków"],
        ["miejsca", "上 下 中 外 右 左 …", "10 znaków"],
      ]),
      section("natura-i-czynnosci", "Natura i czynności", [
        ["natura", "山 川 田 雨 天 気 …", "10 znaków"],
        ["czynnosci", "見 行 来 食 飲 …", "10 znaków"],
        ["mowienie", "言 話 読 書 聞 …", "10 znaków"],
      ]),
    ],
  },
  {
    id: "czytanie",
    glyph: "読",
    title: "Czytanie i słuchanie",
    meta: "12 lekcji · ok. 6 h",
    sections: [
      section("czytanie", "Czytanie", [
        ["wiadomosci", "Krótkie wiadomości", "25 min"],
        ["ogloszenia", "Ogłoszenia i plakaty", "25 min"],
        ["opis-dnia", "Opis dnia", "30 min"],
        ["rozklad", "Rozkład jazdy i menu", "25 min"],
        ["list", "List do przyjaciela", "30 min"],
        ["tekst", "Tekst informacyjny", "30 min"],
      ]),
      section("sluchanie", "Słuchanie", [
        ["obrazek", "Zadania z obrazkiem", "25 min"],
        ["droga", "Wskazówki drogi", "25 min"],
        ["sklep", "Zakupy w sklepie", "25 min"],
        ["szkola", "Rozmowy w szkole", "30 min"],
        ["odpowiedzi", "Szybkie odpowiedzi", "20 min"],
        ["rozmowy", "Dłuższe rozmowy", "30 min"],
      ]),
    ],
  },
  {
    id: "egzamin",
    glyph: "試",
    title: "Egzamin próbny N5",
    meta: "3 arkusze · 90 minut każdy",
    sections: [sheet(1), sheet(2), sheet(3)],
  },
];
