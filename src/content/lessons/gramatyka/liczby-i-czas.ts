import { w } from "../words";
import { build, choice, ex, grammarLesson, grammarTest, ja } from "./make";

// Numbers are written in digits with furigana, as in real Japanese text; the number kanji come in the kanji course.
const section = "liczby-i-czas";

export const liczby = grammarLesson({
  section,
  slug: "liczby",
  title: "Liczby do 10 000",
  minutes: 15,
  lead: "Japońskie liczby składa się jak z klocków. Znasz 1–10 i trzy duże liczby (100, 1000, 10 000), więc powiesz każdą liczbę do 99 999.",
  sentence: ex("この{本|ほん}は{1000|せん}ページです。", "Kono hon wa sen pēji desu.", "Ta książka ma 1000 stron."),
  after: "Liczby zapisuje się zwykle cyframi, tak jak po polsku. Czytasz je jednak po japońsku: 1000 to せん.",
  patterns: [
    { pattern: ja("{11|じゅういち}", "jūichi"), meaning: "11 = 10 + 1" },
    { pattern: ja("{20|にじゅう}", "nijū"), meaning: "20 = 2 × 10" },
    { pattern: ja("{300|さんびゃく}", "sanbyaku"), meaning: "300 = 3 × 100" },
    { pattern: ja("{20000|にまん}", "niman"), meaning: "20 000 = 2 × 10 000" },
  ],
  explanation:
    "Od 1 do 10: いち, に, さん, よん, ご, ろく, なな, はち, きゅう, じゅう. 4, 7 i 9 mają też drugie czytanie (し, しち, く), ale licząc, zwykle mówisz よん, なな i きゅう.\n\nWiększe liczby składasz: 11 to じゅういち (10 + 1), 20 to にじゅう (2 × 10), 35 to さんじゅうご.\n\nSetki to ひゃく, tysiące せん. Kilka z nich zmienia brzmienie: 300 さんびゃく, 600 ろっぴゃく, 800 はっぴゃく, 3000 さんぜん, 8000 はっせん.\n\n10 000 ma własne słowo: いちまん. Japończycy liczą duże liczby co cztery zera, więc 20 000 to にまん. Zero to ゼロ.",
  examples: [
    ex("{15|じゅうご}ページです。", "Jūgo pēji desu.", "To strona 15."),
    ex("{47|よんじゅうなな}", "yonjūnana", "47"),
    ex("{300|さんびゃく}", "sanbyaku", "300"),
    ex("{800|はっぴゃく}", "happyaku", "800"),
    ex("{3000|さんぜん}", "sanzen", "3000"),
    ex("{10000|いちまん}", "ichiman", "10 000"),
  ],
  exercises: [
    choice("Jak czytasz 300?", ["さんびゃく", "さんひゃく", "さんぴゃく"], 0, "Po さん setka brzmi びゃく."),
    choice("Jak czytasz 20?", ["にじゅう", "じゅうに", "にじゅうに"], 0, "20 to 2 × 10: に + じゅう. じゅうに to 12."),
    choice("Co znaczy はっせん?", ["8000", "800", "80"], 0, "せん to tysiąc, a はっ to brzmienie 8 przed せん."),
    build(
      "Ułóż liczbę 1500.",
      [
        ["せん", "sen"],
        ["ごひゃく", "gohyaku"],
        ["ひゃく", "hyaku"],
        ["ごじゅう", "gojū"],
      ],
      [0, 1],
    ),
  ],
  points: [
    "Liczby składasz z klocków: 35 to さんじゅうご.",
    "Uważaj na 300 さんびゃく, 600 ろっぴゃく, 800 はっぴゃく, 3000 さんぜん i 8000 はっせん.",
    "10 000 to osobne słowo: いちまん.",
  ],
  words: [w.zero, w.hyaku, w.sen, w.man, w.peji],
});

export const godziny = grammarLesson({
  section,
  slug: "godziny",
  title: "Godziny i minuty",
  minutes: 12,
  lead: "Godzinę mówisz liczbą i znakiem 時 (ji), a minuty znakiem 分 (fun albo pun).",
  sentence: ex("{今|いま}{何時|なんじ}ですか。", "Ima nanji desu ka.", "Która jest teraz godzina?"),
  after: "今 znaczy „teraz”, a 何時 „która godzina”. Odpowiadasz na przykład 3時です。, czyli „Jest trzecia”.",
  patterns: [
    { pattern: ja("{3|さん}{時|じ}", "sanji"), meaning: "godzina trzecia" },
    { pattern: ja("{3|さん}{時|じ}{半|はん}", "sanji han"), meaning: "wpół do czwartej (3:30)" },
    { pattern: ja("{10|じゅっ}{分|ぷん}", "juppun"), meaning: "10 minut" },
  ],
  explanation:
    "Godziny to liczba i 時: 1時 いちじ, 2時 にじ i tak dalej. Trzy są nieregularne: 4時 よじ, 7時 しちじ, 9時 くじ.\n\n半 znaczy „pół”: 3時半 to 3:30.\n\nMinuty mają dwa brzmienia. 分 czytasz ふん po 2, 5, 7 i 9 (にふん, ごふん, ななふん, きゅうふん), a ぷん po 1, 3, 4, 6, 8 i 10 (いっぷん, さんぷん, よんぷん, ろっぷん, はっぷん, じゅっぷん).\n\nごぜん to godziny przed południem, ごご po południu: ごご3時 to 15:00.",
  examples: [
    ex("{今|いま}{何時|なんじ}ですか。", "Ima nanji desu ka.", "Która jest teraz godzina?"),
    ex("{4|よ}{時|じ}です。", "Yoji desu.", "Jest czwarta."),
    ex("{7|しち}{時|じ}{半|はん}です。", "Shichiji han desu.", "Jest wpół do ósmej."),
    ex("{9|く}{時|じ}{10|じゅっ}{分|ぷん}です。", "Kuji juppun desu.", "Jest 9:10."),
    ex("ごご{2|に}{時|じ}{15|じゅうご}{分|ふん}です。", "Gogo niji jūgofun desu.", "Jest 14:15."),
    ex("ごぜん{8|はち}{時|じ}です。", "Gozen hachiji desu.", "Jest ósma rano."),
  ],
  exercises: [
    choice("Jak czytasz 4時?", ["よじ", "よんじ", "しじ"], 0, "4 przed 時 brzmi よ: よじ."),
    choice("Co znaczy 3時半?", ["3:30", "3:15", "2:30"], 0, "半 znaczy „pół”."),
    choice("Jak czytasz 10分?", ["じゅっぷん", "じゅうふん", "じゅっふん"], 0, "Po 10 minuty brzmią ぷん: じゅっぷん."),
    build(
      "Która jest teraz godzina?",
      [
        ["{今|いま}", "ima"],
        ["{何時|なんじ}", "nanji"],
        ["ですか", "desu ka"],
        ["{何|なん}", "nan"],
      ],
      [0, 1, 2],
    ),
  ],
  points: [
    "Pytasz o godzinę: 今何時ですか。",
    "Godziny to 時. Nieregularne są よじ, しちじ i くじ.",
    "半 to „pół” (3時半 to 3:30), a minuty to ふん albo ぷん.",
  ],
  words: [w.ima, w.nanji, w.han, w.gozen, w.gogo],
});

export const daty = grammarLesson({
  section,
  slug: "daty",
  title: "Dni tygodnia i daty",
  minutes: 15,
  lead: "Dni tygodnia kończą się na ようび, miesiące na がつ, a dni miesiąca od 1 do 10 mają własne nazwy.",
  sentence: ex("{今日|きょう}は{何|なん}ようびですか。", "Kyō wa nan'yōbi desu ka.", "Jaki dziś dzień tygodnia?"),
  after: "今日 czytasz きょう, choć każdy z tych znaków osobno brzmi inaczej. ようび zapisuje się kanji spoza N5, więc tu piszemy je kaną.",
  patterns: [
    { pattern: ja("{今日|きょう}は A ようびです。", "Kyō wa A-yōbi desu."), meaning: "Dziś jest (dzień tygodnia) A." },
    { pattern: ja("B{月|がつ} C{日|にち}", "B-gatsu C-nichi"), meaning: "C dzień miesiąca B" },
  ],
  explanation:
    "Dni tygodnia: げつようび (poniedziałek), かようび (wtorek), すいようび (środa), もくようび (czwartek), きんようび (piątek), どようび (sobota), にちようび (niedziela).\n\nMiesiące to liczba i 月 (がつ): 1月 いちがつ, 2月 にがつ i tak dalej. Uważaj na 4月 しがつ, 7月 しちがつ i 9月 くがつ.\n\nDni miesiąca od 1 do 10 mają własne nazwy: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか. Dalej mówisz liczbę i にち (11日 じゅういちにち). Wyjątki to 14日 じゅうよっか, 20日 はつか i 24日 にじゅうよっか.\n\nきのう to „wczoraj”, 今日 (きょう) „dziś”, あした „jutro”.",
  examples: [
    ex("{今日|きょう}は{何|なん}ようびですか。", "Kyō wa nan'yōbi desu ka.", "Jaki dziś dzień tygodnia?"),
    ex("{今日|きょう}はきんようびです。", "Kyō wa kin'yōbi desu.", "Dziś jest piątek."),
    ex("あしたはどようびです。", "Ashita wa doyōbi desu.", "Jutro jest sobota."),
    ex("たんじょうびは{何月|なんがつ}{何日|なんにち}ですか。", "Tanjōbi wa nangatsu nannichi desu ka.", "Kiedy masz urodziny?"),
    ex("{4月|しがつ}{1日|ついたち}です。", "Shigatsu tsuitachi desu.", "Pierwszego kwietnia."),
    ex("{7月|しちがつ}{20日|はつか}です。", "Shichigatsu hatsuka desu.", "Dwudziestego lipca."),
  ],
  exercises: [
    choice("Jak czytasz 4月?", ["しがつ", "よんがつ", "よがつ"], 0, "Kwiecień to wyjątek: しがつ."),
    choice(
      "Co znaczy あしたはにちようびです。",
      ["Jutro jest niedziela.", "Dziś jest niedziela.", "Wczoraj była niedziela."],
      0,
      "あした to „jutro”, にちようび to „niedziela”.",
    ),
    choice("Jak czytasz 20日 (dzień miesiąca)?", ["はつか", "にじゅうにち", "ふつか"], 0, "20 dzień miesiąca ma własną nazwę: はつか."),
    build(
      "Jaki dziś dzień tygodnia?",
      [
        ["{今日|きょう}", "kyō"],
        ["は", "wa"],
        ["{何|なん}ようび", "nan'yōbi"],
        ["ですか", "desu ka"],
        ["あした", "ashita"],
      ],
      [0, 1, 2, 3],
    ),
  ],
  points: [
    "Dni tygodnia kończą się na ようび: げつようび, かようび…",
    "Miesiące to liczba i 月. Uważaj na しがつ, しちがつ i くがつ.",
    "Dni 1–10 mają własne nazwy: ついたち, ふつか, みっか…",
  ],
  words: [w.kyo, w.ashita, w.kino, w.tanjobi, w.getsuyobi, w.kayobi, w.suiyobi, w.mokuyobi, w.kinyobi, w.doyobi, w.nichiyobi],
});

export const ceny = grammarLesson({
  section,
  slug: "ceny",
  title: "Ceny: いくら",
  minutes: 10,
  lead: "W sklepie pytasz いくらですか。, czyli „Ile kosztuje?”. Ceny podaje się w jenach: 円 (en).",
  sentence: ex("これはいくらですか。", "Kore wa ikura desu ka.", "Ile to kosztuje?"),
  after: "Odpowiedź to liczba i 円: 500円です。 znaczy „500 jenów”.",
  patterns: [
    { pattern: ja("A は いくら ですか。", "A wa ikura desu ka."), meaning: "Ile kosztuje A?" },
    { pattern: ja("{500|ごひゃく}{円|えん}です。", "Gohyaku en desu."), meaning: "500 jenów." },
    { pattern: ja("A を ください。", "A o kudasai."), meaning: "Poproszę A." },
  ],
  explanation:
    "いくら znaczy „ile (kosztuje)”. Pytasz: これはいくらですか。\n\nCenę mówisz liczbą i 円 (en): 100円 ひゃくえん, 1000円 せんえん. Pamiętaj o 300 さんびゃく i 3000 さんぜん.\n\nGdy chcesz coś kupić, mówisz これをください。, czyli „Poproszę to”. Znak を czytasz o. Dokładniej poznasz go w dziale o partykułach.",
  examples: [
    ex("これはいくらですか。", "Kore wa ikura desu ka.", "Ile to kosztuje?"),
    ex("{300|さんびゃく}{円|えん}です。", "Sanbyaku en desu.", "300 jenów."),
    ex("このかさは{1500|せんごひゃく}{円|えん}です。", "Kono kasa wa sengohyaku en desu.", "Ten parasol kosztuje 1500 jenów."),
    ex("コーヒーは{350|さんびゃくごじゅう}{円|えん}です。", "Kōhī wa sanbyaku gojū en desu.", "Kawa kosztuje 350 jenów."),
    ex("これをください。", "Kore o kudasai.", "Poproszę to."),
  ],
  exercises: [
    choice(
      "Jak zapytasz o cenę?",
      ["これはいくらですか。", "これは何ですか。", "これはどこですか。"],
      0,
      "いくら pyta o cenę.",
    ),
    choice("Jak czytasz 600円?", ["ろっぴゃくえん", "ろくひゃくえん", "ろくびゃくえん"], 0, "600 to ろっぴゃく."),
    choice("Sprzedawca mówi: 3000円です。 Ile płacisz?", ["3000 jenów", "300 jenów", "30 000 jenów"], 0, "3000 to さんぜん."),
    build(
      "Poproszę to.",
      [
        ["これ", "kore"],
        ["を", "o"],
        ["ください", "kudasai"],
        ["は", "wa"],
      ],
      [0, 1, 2],
    ),
  ],
  points: ["Pytasz o cenę: これはいくらですか。", "Cena to liczba i 円: 500円 to ごひゃくえん.", "Kupujesz: これをください。"],
  words: [w.ikura, w.en, w.kudasai],
});

export const liczbyICzasTest = grammarTest(section, "Liczby i czas", [
  choice("Jak czytasz 800?", ["はっぴゃく", "はちひゃく", "はちびゃく"], 0, "800 to はっぴゃく."),
  choice("Co znaczy にまん?", ["20 000", "2000", "200"], 0, "まん to 10 000, więc にまん to 20 000."),
  choice("Jak zapytasz o godzinę?", ["今何時ですか。", "今日何時ですか。", "何ようびですか。"], 0, "今何時ですか。 to „Która jest teraz godzina?”."),
  choice("Jak czytasz 9時?", ["くじ", "きゅうじ", "きゅじ"], 0, "Godzina 9 to くじ."),
  choice("Co znaczy 6時半?", ["6:30", "6:15", "5:30"], 0, "半 znaczy „pół”."),
  choice("Jak czytasz 5分?", ["ごふん", "ごぷん", "ごっぷん"], 0, "Po 5 minuty brzmią ふん."),
  choice("Co znaczy あしたはすいようびです。", ["Jutro jest środa.", "Dziś jest środa.", "Jutro jest czwartek."], 0, "あした to „jutro”, すいようび to „środa”."),
  choice("Jak czytasz 3日 (dzień miesiąca)?", ["みっか", "さんにち", "みつか"], 0, "Trzeci dzień miesiąca to みっか."),
  choice("Jak zapytasz o cenę parasola?", ["このかさはいくらですか。", "このかさは何ですか。", "このかさはどれですか。"], 0, "いくら pyta o cenę."),
  choice("Jak czytasz 300円?", ["さんびゃくえん", "さんひゃくえん", "さんぴゃくえん"], 0, "300 to さんびゃく."),
]);
