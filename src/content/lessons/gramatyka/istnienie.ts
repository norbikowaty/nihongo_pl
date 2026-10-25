import { w } from "../words";
import { build, choice, ex, grammarLesson, grammarTest, ja } from "./make";

const section = "istnienie";

export const arimasuImasu = grammarLesson({
  section,
  slug: "arimasu-imasu",
  title: "あります i います",
  minutes: 12,
  lead: "あります i います znaczą „jest, są” albo „mam”. あります mówisz o rzeczach, います o ludziach i zwierzętach.",
  sentence: ex("ペンがありますか。", "Pen ga arimasu ka.", "Masz długopis?"),
  after: "あります mówi, że coś jest albo że ktoś to ma. Odpowiadasz はい、あります。 albo いいえ、ありません。",
  patterns: [
    { pattern: ja("A が あります。", "A ga arimasu."), meaning: "Jest A (rzecz). Mam A." },
    { pattern: ja("B が います。", "B ga imasu."), meaning: "Jest B (osoba, zwierzę)." },
    { pattern: ja("A が ありません / いません。", "A ga arimasen / imasen."), meaning: "Nie ma A." },
  ],
  explanation:
    "あります mówisz o rzeczach i roślinach, います o ludziach i zwierzętach: 本があります (jest książka), 先生がいます (jest nauczyciel), いぬがいます (jest pies).\n\nTo, co jest, oznaczasz が. Pytasz: 何がありますか。 albo だれがいますか。\n\nあります znaczy też „mieć”: 車があります to „mam samochód”. Przeczenie to ありません i いません.",
  examples: [
    ex("ペンがありますか。", "Pen ga arimasu ka.", "Masz długopis?"),
    ex("はい、あります。", "Hai, arimasu.", "Tak, mam."),
    ex("{男|おとこ}の{人|ひと}がいます。", "Otoko no hito ga imasu.", "Jest tam mężczyzna."),
    ex("{女|おんな}の{人|ひと}もいます。", "Onna no hito mo imasu.", "Jest też kobieta."),
    ex("いぬがいますか。", "Inu ga imasu ka.", "Masz psa?"),
    ex("いいえ、いません。でも、ねこがいます。", "Iie, imasen. Demo, neko ga imasu.", "Nie. Ale mam kota."),
    ex("{子|こ}どもがいます。", "Kodomo ga imasu.", "Mam dziecko."),
  ],
  exercises: [
    choice("Uzupełnij: ねこが＿。", ["います", "あります", "です"], 0, "Kot to zwierzę, więc います."),
    choice("Uzupełnij: 本が＿。", ["あります", "います", "行きます"], 0, "Książka to rzecz, więc あります."),
    choice("Co znaczy 車がありません。", ["Nie mam samochodu.", "Mam samochód.", "To nie jest samochód."], 0, "ありません to „nie ma, nie mam”."),
    build(
      "Jest tam kobieta.",
      [
        ["{女|おんな}の{人|ひと}", "onna no hito"],
        ["が", "ga"],
        ["います", "imasu"],
        ["あります", "arimasu"],
      ],
      [0, 1, 2],
    ),
  ],
  points: ["Rzeczy: 本があります。", "Ludzie i zwierzęta: 先生がいます。", "あります znaczy też „mam”: 車があります。"],
  words: [w.aru, w.iru, w.otoko, w.onna, w.kodomo, w.demo],
});

export const ni = grammarLesson({
  section,
  slug: "ni",
  title: "Gdzie co jest: に",
  minutes: 10,
  lead: "Miejsce, w którym coś jest, oznaczasz に: きょうしつに先生がいます (w klasie jest nauczyciel).",
  sentence: ex("きょうしつに{先生|せんせい}がいます。", "Kyōshitsu ni sensei ga imasu.", "W klasie jest nauczyciel."),
  after: "に stoi po miejscu, が po tym, co tam jest, a na końcu あります albo います.",
  patterns: [
    { pattern: ja("A に B が あります / います。", "A ni B ga arimasu / imasu."), meaning: "W A jest B." },
    { pattern: ja("B は A に あります / います。", "B wa A ni arimasu / imasu."), meaning: "B jest w A." },
  ],
  explanation:
    "Są dwa szyki. きょうしつに先生がいます mówi, kto jest w klasie. 先生はきょうしつにいます mówi, gdzie jest nauczyciel, o którym już mowa.\n\nPytasz: トイレはどこにありますか。 albo かばんに何がありますか。\n\nUważaj: przy あります i います miejsce oznacza に, a przy innych czynnościach で. Mówisz 学校でべんきょうします, ale 学校に先生がいます.",
  examples: [
    ex("きょうしつに{先生|せんせい}がいます。", "Kyōshitsu ni sensei ga imasu.", "W klasie jest nauczyciel."),
    ex("{先生|せんせい}はきょうしつにいます。", "Sensei wa kyōshitsu ni imasu.", "Nauczyciel jest w klasie."),
    ex("このまちに{大学|だいがく}があります。", "Kono machi ni daigaku ga arimasu.", "W tym mieście jest uniwersytet."),
    ex("トイレはどこにありますか。", "Toire wa doko ni arimasu ka.", "Gdzie jest toaleta?"),
    ex("かばんに{何|なに}がありますか。", "Kaban ni nani ga arimasu ka.", "Co jest w torbie?"),
    ex("うちにねこがいます。", "Uchi ni neko ga imasu.", "W domu mam kota."),
  ],
  exercises: [
    choice("Uzupełnij: きょうしつ＿先生がいます。", ["に", "で", "を"], 0, "Przy います miejsce oznaczasz に."),
    choice(
      "Co znaczy トイレはどこにありますか。",
      ["Gdzie jest toaleta?", "Czy jest tu toaleta?", "Co jest w toalecie?"],
      0,
      "どこにありますか pyta, gdzie coś jest.",
    ),
    choice(
      "Które zdanie jest poprawne?",
      ["学校に先生がいます。", "学校で先生がいます。", "学校を先生がいます。"],
      0,
      "Przy います miejsce oznaczasz に, a nie で.",
    ),
    build(
      "Co jest w torbie?",
      [
        ["かばん", "kaban"],
        ["に", "ni"],
        ["{何|なに}", "nani"],
        ["が", "ga"],
        ["ありますか", "arimasu ka"],
        ["で", "de"],
      ],
      [0, 1, 2, 3, 4],
    ),
  ],
  points: ["W miejscu jest coś: きょうしつに先生がいます。", "Coś jest w miejscu: 先生はきょうしつにいます。", "Przy あります i います miejsce oznacza に, nie で."],
  words: [],
});

export const pozycje = grammarLesson({
  section,
  slug: "pozycje",
  title: "うえ・した・なか",
  minutes: 10,
  lead: "Położenie mówisz przez の: つくえの上 (na biurku), いすの下 (pod krzesłem), かばんの中 (w torbie).",
  sentence: ex("つくえの{上|うえ}に{本|ほん}があります。", "Tsukue no ue ni hon ga arimasu.", "Na biurku jest książka."),
  after: "つくえの上 to dosłownie „góra biurka”. Słowo położenia stoi po の, a po nim に.",
  patterns: [
    { pattern: ja("A の {上|うえ} / {下|した} / {中|なか} に", "A no ue / shita / naka ni"), meaning: "na / pod / w A" },
    { pattern: ja("A の {前|まえ} / うしろ / となり に", "A no mae / ushiro / tonari ni"), meaning: "przed / za / obok A" },
  ],
  explanation:
    "Słowa położenia: 上 (na, nad), 下 (pod), 中 (w środku), 前 (przed), うしろ (za), となり (obok), みぎ (po prawej), ひだり (po lewej).\n\nSchemat jest zawsze ten sam: rzecz, の, położenie, に. かばんの中にペンがあります (w torbie jest długopis), えきの前にぎんこうがあります (przed stacją jest bank).\n\nMożesz też krótko: ねこはいすの下です。 (kot jest pod krzesłem).",
  examples: [
    ex("つくえの{上|うえ}に{本|ほん}があります。", "Tsukue no ue ni hon ga arimasu.", "Na biurku jest książka."),
    ex("いすの{下|した}にねこがいます。", "Isu no shita ni neko ga imasu.", "Pod krzesłem jest kot."),
    ex("かばんの{中|なか}にペンがあります。", "Kaban no naka ni pen ga arimasu.", "W torbie jest długopis."),
    ex("えきの{前|まえ}にぎんこうがあります。", "Eki no mae ni ginkō ga arimasu.", "Przed stacją jest bank."),
    ex("ゆうびんきょくはぎんこうのとなりです。", "Yūbinkyoku wa ginkō no tonari desu.", "Poczta jest obok banku."),
    ex("わたしのうしろに{先生|せんせい}がいます。", "Watashi no ushiro ni sensei ga imasu.", "Za mną stoi nauczyciel."),
  ],
  exercises: [
    choice("Jak powiesz „pod krzesłem”?", ["いすの下", "いすの上", "下のいす"], 0, "Rzecz, の, położenie: いすの下."),
    choice(
      "Co znaczy かばんの中にペンがあります。",
      ["W torbie jest długopis.", "Na torbie jest długopis.", "Długopis leży obok torby."],
      0,
      "中 to „w środku”.",
    ),
    build(
      "Przed stacją jest bank.",
      [
        ["えき", "eki"],
        ["の", "no"],
        ["{前|まえ}", "mae"],
        ["に", "ni"],
        ["ぎんこう", "ginkō"],
        ["が", "ga"],
        ["あります", "arimasu"],
        ["います", "imasu"],
      ],
      [0, 1, 2, 3, 4, 5, 6],
    ),
    choice("Które słowo znaczy „obok”?", ["となり", "うしろ", "まえ"], 0, "となり to „obok”."),
  ],
  points: ["Rzecz, の, położenie, に: つくえの上に本があります。", "上 na, 下 pod, 中 w, 前 przed, うしろ za, となり obok.", "Krótko: ねこはいすの下です。"],
  words: [w.tsukue, w.naka, w.mae, w.ushiro, w.tonari, w.migi, w.hidari, w.yubinkyoku],
});

export const liczniki = grammarLesson({
  section,
  slug: "liczniki",
  title: "Liczniki: つ・人・本",
  minutes: 15,
  lead: "Licząc rzeczy, Japończycy dodają do liczby licznik. Najprostszy to つ: ひとつ, ふたつ, みっつ.",
  sentence: ex("たまごをみっつください。", "Tamago o mittsu kudasai.", "Poproszę trzy jajka."),
  after: "Liczba z licznikiem stoi zwykle tuż przed czasownikiem, bez partykuły: たまごをみっつください。",
  patterns: [
    { pattern: ja("ひとつ、ふたつ、みっつ", "hitotsu, futatsu, mittsu"), meaning: "jedna, dwie, trzy (rzeczy)" },
    { pattern: ja("ひとり、ふたり、{3人|さんにん}", "hitori, futari, sannin"), meaning: "jedna, dwie, trzy osoby" },
    { pattern: ja("{1本|いっぽん}、{2本|にほん}、{3本|さんぼん}", "ippon, nihon, sanbon"), meaning: "jeden, dwa, trzy (długie przedmioty)" },
  ],
  explanation:
    "つ liczy rzeczy do dziesięciu: ひとつ, ふたつ, みっつ, よっつ, いつつ, むっつ, ななつ, やっつ, ここのつ, とお. Pytasz いくつ (ile?).\n\nLudzi liczysz licznikiem 人: ひとり (1), ふたり (2), a dalej liczba i にん: 3人 さんにん, 4人 よにん. Pytasz 何人 (なんにん).\n\nDługie i cienkie rzeczy, jak długopisy, butelki czy parasole, liczysz licznikiem 本: いっぽん, にほん, さんぼん, よんほん, ごほん, ろっぽん, ななほん, はっぽん, きゅうほん, じゅっぽん. Pytasz 何本 (なんぼん).\n\nLiczba z licznikiem stoi przed czasownikiem: 学生が3人います (jest trzech studentów).",
  examples: [
    ex("たまごをみっつください。", "Tamago o mittsu kudasai.", "Poproszę trzy jajka."),
    ex("いすがいくつありますか。", "Isu ga ikutsu arimasu ka.", "Ile jest krzeseł?"),
    ex("{学生|がくせい}が{3人|さんにん}います。", "Gakusei ga sannin imasu.", "Jest trzech studentów."),
    ex("{子|こ}どもがふたりいます。", "Kodomo ga futari imasu.", "Mam dwoje dzieci."),
    ex("ペンが{2本|にほん}あります。", "Pen ga nihon arimasu.", "Są dwa długopisy."),
    ex("かさを{1本|いっぽん}かいました。", "Kasa o ippon kaimashita.", "Kupiłem jeden parasol."),
  ],
  exercises: [
    choice("Jak powiesz „trzy (rzeczy)”?", ["みっつ", "さんつ", "みつ"], 0, "Licznik つ: ひとつ, ふたつ, みっつ."),
    choice("Jak powiesz „dwie osoby”?", ["ふたり", "ににん", "ふたつ"], 0, "1 i 2 osoby mają własne słowa: ひとり, ふたり."),
    choice("Jak czytasz 3本?", ["さんぼん", "さんほん", "さんぽん"], 0, "Po さん licznik 本 brzmi ぼん."),
    build(
      "Poproszę trzy jajka.",
      [
        ["たまご", "tamago"],
        ["を", "o"],
        ["みっつ", "mittsu"],
        ["ください", "kudasai"],
        ["さんにん", "sannin"],
      ],
      [0, 1, 2, 3],
    ),
  ],
  points: ["Rzeczy: ひとつ, ふたつ, みっつ…, pytasz いくつ.", "Ludzie: ひとり, ふたり, 3人 さんにん.", "Długie przedmioty: いっぽん, にほん, さんぼん."],
  words: [w.hitotsu, w.futatsu, w.mittsu, w.ikutsu, w.hitori, w.futari, w.tamago],
});

export const istnienieTest = grammarTest(section, "Istnienie i miejsce", [
  choice("Uzupełnij: いぬが＿。", ["います", "あります", "です"], 0, "Pies to zwierzę: います."),
  choice("Uzupełnij: つくえが＿。", ["あります", "います", "します"], 0, "Biurko to rzecz: あります."),
  choice("Uzupełnij: きょうしつ＿学生がいます。", ["に", "で", "へ"], 0, "Przy います miejsce oznaczasz に."),
  choice("Co znaczy 車がありません。", ["Nie mam samochodu.", "Mam samochód.", "Samochód jest tam."], 0, "ありません to „nie ma, nie mam”."),
  choice("Jak powiesz „na biurku”?", ["つくえの上", "つくえの下", "上のつくえ"], 0, "Rzecz, の, położenie."),
  choice("Co znaczy ぎんこうはえきの前です。", ["Bank jest przed stacją.", "Bank jest za stacją.", "Stacja jest przed bankiem."], 0, "前 to „przed”."),
  choice("Jak powiesz „trzy osoby”?", ["さんにん", "みっつ", "さんぼん"], 0, "Ludzi liczysz licznikiem 人: さんにん."),
  choice("Jak czytasz 1本?", ["いっぽん", "いちほん", "いちぼん"], 0, "1 z licznikiem 本 to いっぽん."),
  choice("Jak zapytasz „Ile jest jajek?”", ["たまごはいくつありますか。", "たまごはいくらですか。", "たまごはどこにありますか。"], 0, "いくつ pyta o liczbę rzeczy."),
  choice("Co znaczy かばんの中に何がありますか。", ["Co jest w torbie?", "Gdzie jest torba?", "Czyja to torba?"], 0, "中 to „w środku”, 何 to „co”."),
]);
