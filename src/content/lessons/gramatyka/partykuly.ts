import { w } from "../words";
import { build, choice, ex, grammarLesson, grammarTest, ja } from "./make";

const section = "partykuly";

export const o = grammarLesson({
  section,
  slug: "o",
  title: "を — dopełnienie",
  minutes: 12,
  lead: "を (czytasz o) oznacza dopełnienie, czyli to, co jesz, oglądasz albo kupujesz.",
  sentence: ex("パンを{食|た}べます。", "Pan o tabemasu.", "Jem chleb."),
  after: "を stoi zaraz po rzeczy, na którą działa czasownik. Choć pisze się を, wymawiasz je tak samo jak お.",
  patterns: [
    { pattern: ja("A を V-ます。", "A o V-masu."), meaning: "Robię coś z A (jem A, oglądam A)." },
    { pattern: ja("{何|なに}を V-ますか。", "Nani o V-masu ka."), meaning: "Co robisz (jesz, oglądasz)?" },
  ],
  explanation:
    "を łączy rzecz z czasownikiem: パンを食べます (jem chleb), テレビを見ます (oglądam telewizję), 水をのみます (piję wodę).\n\nPytasz 何を…ますか。 Przed を znak 何 czytasz なに: 何を食べますか。 znaczy „Co jesz?”.\n\nNowe czasowniki: 食べます (jeść), のみます (pić), 見ます (oglądać, patrzeć), かいます (kupować), します (robić).",
  examples: [
    ex("パンを{食|た}べます。", "Pan o tabemasu.", "Jem chleb."),
    ex("まいあさコーヒーをのみます。", "Maiasa kōhī o nomimasu.", "Co rano piję kawę."),
    ex("よるテレビを{見|み}ます。", "Yoru terebi o mimasu.", "Wieczorem oglądam telewizję."),
    ex("{何|なに}を{食|た}べますか。", "Nani o tabemasu ka.", "Co jesz?"),
    ex("{水|みず}をのみました。", "Mizu o nomimashita.", "Wypiłem wodę."),
    ex("きのうかさをかいました。", "Kinō kasa o kaimashita.", "Wczoraj kupiłem parasol."),
  ],
  exercises: [
    choice("Jak czytasz を?", ["o", "wo", "wa"], 0, "Dziś を wymawia się tak samo jak お."),
    choice("Uzupełnij: コーヒー＿のみます。", ["を", "は", "の"], 0, "Kawa to dopełnienie, więc stawiasz を."),
    build(
      "Co jesz?",
      [
        ["{何|なに}", "nani"],
        ["を", "o"],
        ["{食|た}べますか", "tabemasu ka"],
        ["は", "wa"],
      ],
      [0, 1, 2],
    ),
    choice("Co znaczy テレビを見ます。", ["Oglądam telewizję.", "Kupuję telewizor.", "To jest telewizor."], 0, "見ます to „oglądać”."),
  ],
  points: ["を oznacza dopełnienie: パンを食べます。", "Wymawiasz je o.", "Pytasz: 何を食べますか。"],
  words: [w.taberu, w.nomu, w.miru, w.kau, w.suru, w.mizu, w.nani],
});

export const niE = grammarLesson({
  section,
  slug: "ni-e",
  title: "に i へ — kierunek",
  minutes: 12,
  lead: "へ (czytasz e) i に pokazują kierunek: dokąd idziesz. に oznacza też czas, na przykład godzinę.",
  sentence: ex("あした{学校|がっこう}へ{行|い}きます。", "Ashita gakkō e ikimasu.", "Jutro idę do szkoły."),
  after: "Partykułę へ czytasz e. Stoi po miejscu, do którego zmierzasz. Zamiast へ możesz powiedzieć に: 学校に行きます。",
  patterns: [
    { pattern: ja("A へ {行|い}きます。", "A e ikimasu."), meaning: "Idę (jadę) do A." },
    { pattern: ja("A に {行|い}きます。", "A ni ikimasu."), meaning: "Idę (jadę) do A." },
    { pattern: ja("{7|しち}{時|じ}に V-ます。", "Shichiji ni V-masu."), meaning: "Robię V o siódmej." },
  ],
  explanation:
    "Po 行きます, 来ます i かえります miejsce oznaczasz へ albo に: うちへかえります (wracam do domu), 日本に来ました (przyjechałem do Japonii).\n\nに oznacza też konkretny czas: 7時におきます (wstaję o siódmej), どようびに行きます (pojadę w sobotę). Przy słowach takich jak あした, きのう i まいにち に nie dodajesz.\n\nPytasz: どこへ行きますか。, czyli „Dokąd idziesz?”.",
  examples: [
    ex("あした{学校|がっこう}へ{行|い}きます。", "Ashita gakkō e ikimasu.", "Jutro idę do szkoły."),
    ex("うちへかえります。", "Uchi e kaerimasu.", "Wracam do domu."),
    ex("{日本|にほん}に{来|き}ました。", "Nihon ni kimashita.", "Przyjechałem do Japonii."),
    ex("まいあさ{7|しち}{時|じ}におきます。", "Maiasa shichiji ni okimasu.", "Co rano wstaję o siódmej."),
    ex("どこへ{行|い}きますか。", "Doko e ikimasu ka.", "Dokąd idziesz?"),
    ex("どようびにデパートへ{行|い}きました。", "Doyōbi ni depāto e ikimashita.", "W sobotę poszedłem do domu towarowego."),
  ],
  exercises: [
    choice("Jak czytasz へ w zdaniu 学校へ行きます。?", ["e", "he", "o"], 0, "Partykułę へ czytasz e."),
    choice("Uzupełnij: 7時＿おきます。", ["に", "へ", "を"], 0, "Konkretny czas oznaczasz に."),
    choice(
      "Które zdanie jest poprawne?",
      ["あした行きます。", "あしたに行きます。", "あしたへ行きます。"],
      0,
      "Po あした nie dodajesz に.",
    ),
    build(
      "Dokąd idziesz?",
      [
        ["どこ", "doko"],
        ["へ", "e"],
        ["{行|い}きますか", "ikimasu ka"],
        ["を", "o"],
      ],
      [0, 1, 2],
    ),
  ],
  points: ["Kierunek: 学校へ行きます。 (へ czytasz e)", "Zamiast へ możesz powiedzieć に: 日本に来ました。", "Czas: 7時におきます。, ale あした bez に."],
  words: [w.gakko, w.uchi, w.nihon, w.depato],
});

export const de = grammarLesson({
  section,
  slug: "de",
  title: "で — miejsce i narzędzie",
  minutes: 12,
  lead: "で mówi, gdzie coś robisz i czym: レストランで食べます (jem w restauracji), バスで行きます (jadę autobusem).",
  sentence: ex("{電車|でんしゃ}で{学校|がっこう}へ{行|い}きます。", "Densha de gakkō e ikimasu.", "Jeżdżę do szkoły pociągiem."),
  after: "電車で znaczy „pociągiem”. で stoi po środku transportu, narzędziu albo miejscu, w którym coś się dzieje.",
  patterns: [
    { pattern: ja("A で V-ます。", "A de V-masu."), meaning: "Robię V w miejscu A." },
    { pattern: ja("B で {行|い}きます。", "B de ikimasu."), meaning: "Jadę środkiem B." },
  ],
  explanation:
    "Po miejscu, w którym coś robisz, stawiasz で: としょかんで本を読みます (czytam książkę w bibliotece).\n\nPo narzędziu i środku transportu też: バスで行きます (jadę autobusem), ペンで書きます (piszę długopisem).\n\nPorównaj: 学校へ行きます (idę do szkoły, kierunek) i 学校でべんきょうします (uczę się w szkole, miejsce czynności).\n\nPytasz: どこで食べますか。, czyli „Gdzie zjesz?”.",
  examples: [
    ex("{電車|でんしゃ}で{学校|がっこう}へ{行|い}きます。", "Densha de gakkō e ikimasu.", "Jeżdżę do szkoły pociągiem."),
    ex("としょかんで{本|ほん}を{読|よ}みます。", "Toshokan de hon o yomimasu.", "Czytam książkę w bibliotece."),
    ex("レストランで{食|た}べました。", "Resutoran de tabemashita.", "Zjadłem w restauracji."),
    ex("バスでかえります。", "Basu de kaerimasu.", "Wracam autobusem."),
    ex("ペンで{名前|なまえ}を{書|か}きます。", "Pen de namae o kakimasu.", "Piszę imię długopisem."),
    ex("どこで{食|た}べますか。", "Doko de tabemasu ka.", "Gdzie zjesz?"),
  ],
  exercises: [
    choice("Uzupełnij: バス＿行きます。 (autobusem)", ["で", "を", "へ"], 0, "Środek transportu oznaczasz で."),
    choice(
      "Co znaczy としょかんで本を読みます。",
      ["Czytam książkę w bibliotece.", "Idę do biblioteki.", "Kupuję książkę w bibliotece."],
      0,
      "で wskazuje miejsce czytania, 読みます to „czytać”.",
    ),
    build(
      "Jem w restauracji.",
      [
        ["レストラン", "resutoran"],
        ["で", "de"],
        ["{食|た}べます", "tabemasu"],
        ["へ", "e"],
      ],
      [0, 1, 2],
    ),
    choice("Jak powiesz: „Piszę długopisem”?", ["ペンで書きます。", "ペンを書きます。", "ペンへ書きます。"], 0, "Narzędzie oznaczasz で."),
  ],
  points: ["Miejsce czynności: レストランで食べます。", "Środek i narzędzie: 電車で行きます。, ペンで書きます。", "Pytasz: どこで食べますか。"],
  words: [w.toshokan, w.yomimasu, w.kakimasu],
});

export const toMo = grammarLesson({
  section,
  slug: "to-mo",
  title: "と i も",
  minutes: 10,
  lead: "と znaczy „z (kimś)”, a między rzeczownikami „i”. も znaczy „też”.",
  sentence: ex("{友|とも}だちと{行|い}きます。", "Tomodachi to ikimasu.", "Idę z przyjacielem."),
  after: "と po osobie znaczy „z kimś”. Między dwoma rzeczownikami と znaczy „i”: パンとコーヒー to „chleb i kawa”.",
  patterns: [
    { pattern: ja("A と V-ます。", "A to V-masu."), meaning: "Robię V z A." },
    { pattern: ja("A と B", "A to B"), meaning: "A i B" },
    { pattern: ja("A も", "A mo"), meaning: "A też" },
  ],
  explanation:
    "と po osobie: 友だちと話します (rozmawiam z przyjacielem). Między rzeczownikami と znaczy „i”: パンとコーヒーをかいました (kupiłem chleb i kawę). と łączy tylko rzeczowniki, nie zdania.\n\nも znaczy „też” i zastępuje は albo を: わたしも学生です (ja też jestem studentem), 水ものみます (wodę też piję).\n\nW przeczeniu 何も znaczy „nic”: 何も食べませんでした (nic nie zjadłem).",
  examples: [
    ex("{友|とも}だちと{行|い}きます。", "Tomodachi to ikimasu.", "Idę z przyjacielem."),
    ex("{先生|せんせい}と{話|はな}しました。", "Sensei to hanashimashita.", "Rozmawiałem z nauczycielem."),
    ex("パンとコーヒーをかいました。", "Pan to kōhī o kaimashita.", "Kupiłem chleb i kawę."),
    ex("わたしも{学生|がくせい}です。", "Watashi mo gakusei desu.", "Ja też jestem studentem."),
    ex("{水|みず}ものみます。", "Mizu mo nomimasu.", "Wodę też piję."),
    ex("{何|なに}も{食|た}べませんでした。", "Nani mo tabemasen deshita.", "Nic nie zjadłem."),
  ],
  exercises: [
    choice("Uzupełnij: 友だち＿行きます。 (z przyjacielem)", ["と", "も", "を"], 0, "„Z kimś” to と."),
    choice("Co znaczy わたしも行きます。", ["Ja też pójdę.", "Pójdę z tobą.", "Nie pójdę."], 0, "も znaczy „też”."),
    build(
      "Kupiłem chleb i kawę.",
      [
        ["パン", "pan"],
        ["と", "to"],
        ["コーヒー", "kōhī"],
        ["を", "o"],
        ["かいました", "kaimashita"],
        ["も", "mo"],
      ],
      [0, 1, 2, 3, 4],
    ),
    choice(
      "Jak powiesz: „Nic nie zjadłem”?",
      ["何も食べませんでした。", "何を食べませんでした。", "何も食べました。"],
      0,
      "何も z przeczeniem znaczy „nic”.",
    ),
  ],
  points: ["と po osobie to „z”: 友だちと行きます。", "と między rzeczownikami to „i”: パンとコーヒー.", "も to „też”: わたしも学生です。"],
  words: [w.hanasu],
});

export const partykulyTest = grammarTest(section, "Partykuły", [
  choice("Uzupełnij: 水＿のみます。", ["を", "へ", "で"], 0, "Woda to dopełnienie: を."),
  choice("Uzupełnij: 学校＿行きます。 (do szkoły)", ["へ", "を", "と"], 0, "Kierunek oznaczasz へ albo に."),
  choice("Uzupełnij: 8時＿おきます。", ["に", "で", "を"], 0, "Godzinę oznaczasz に."),
  choice("Uzupełnij: レストラン＿食べます。 (w restauracji)", ["で", "に", "へ"], 0, "Miejsce czynności oznaczasz で."),
  choice("Uzupełnij: 電車＿行きます。 (pociągiem)", ["で", "と", "を"], 0, "Środek transportu oznaczasz で."),
  choice("Uzupełnij: 友だち＿話します。 (z przyjacielem)", ["と", "で", "を"], 0, "„Z kimś” to と."),
  choice("Co znaczy わたしもコーヒーをのみます。", ["Ja też piję kawę.", "Piję kawę z tobą.", "Nie piję kawy."], 0, "も znaczy „też”."),
  choice("Jak czytasz partykuły へ i を?", ["e i o", "he i wo", "e i wo"], 0, "Jako partykuły brzmią e i o."),
  choice("Które zdanie jest poprawne?", ["あした行きます。", "あしたに行きます。", "あしたで行きます。"], 0, "Po あした nie dodajesz に."),
  choice("Co znaczy 何も食べませんでした。", ["Nic nie zjadłem.", "Co zjadłeś?", "Wszystko zjadłem."], 0, "何も z przeczeniem znaczy „nic”."),
]);
