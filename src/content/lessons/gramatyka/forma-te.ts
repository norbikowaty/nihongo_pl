import { w } from "../words";
import { choice, build, ex, grammarLesson, grammarTest, ja } from "./make";

const section = "forma-te";

export const tworzenie = grammarLesson({
  section,
  slug: "tworzenie",
  title: "Jak tworzyć formę て",
  minutes: 15,
  lead: "Forma て łączy czynności w kolejności i służy do próśb. Tworzysz ją z formy ます według kilku reguł.",
  sentence: ex("{本|ほん}を{読|よ}んで、ねます。", "Hon o yonde, nemasu.", "Poczytam i pójdę spać."),
  after: "読んで to forma て od 読みます. Tu łączy dwie czynności: najpierw czytam, potem idę spać.",
  patterns: [
    { pattern: ja("{食|た}べます → {食|た}べて", "tabemasu → tabete"), meaning: "grupa 2: ます → て" },
    { pattern: ja("かいます → かって", "kaimasu → katte"), meaning: "い, ち, り → って" },
    { pattern: ja("{読|よ}みます → {読|よ}んで", "yomimasu → yonde"), meaning: "み, び, に → んで" },
    { pattern: ja("{書|か}きます → {書|か}いて", "kakimasu → kaite"), meaning: "き → いて (ぎ → いで)" },
    { pattern: ja("{話|はな}します → {話|はな}して", "hanashimasu → hanashite"), meaning: "し → して" },
  ],
  explanation:
    "Grupa 2 to głównie czasowniki z e przed ます (食べます, ねます) i kilka z i (見ます, おきます). Odcinasz ます i dodajesz て: 食べて, 見て, おきて.\n\nGrupa 1 zmienia się według sylaby przed ます:\nい, ち, り → って: かいます → かって, まちます → まって, かえります → かえって;\nみ, び, に → んで: のみます → のんで, 読みます → 読んで;\nき → いて: 書きます → 書いて, 聞きます → 聞いて (ぎ → いで);\nし → して: 話します → 話して.\n\nJeden wyjątek: 行きます → 行って.\n\nGrupa 3 to dwa czasowniki: します → して, 来ます → 来て (きて).\n\nForma て łączy czynności po kolei: あさごはんを食べて、学校へ行きます (zjem śniadanie i pójdę do szkoły).",
  examples: [
    ex("{本|ほん}を{読|よ}んで、ねます。", "Hon o yonde, nemasu.", "Poczytam i pójdę spać."),
    ex("あさごはんを{食|た}べて、{学校|がっこう}へ{行|い}きます。", "Asagohan o tabete, gakkō e ikimasu.", "Zjem śniadanie i pójdę do szkoły."),
    ex("うちへかえって、テレビを{見|み}ました。", "Uchi e kaette, terebi o mimashita.", "Wróciłem do domu i obejrzałem telewizję."),
    ex("デパートへ{行|い}って、かさをかいました。", "Depāto e itte, kasa o kaimashita.", "Poszedłem do domu towarowego i kupiłem parasol."),
    ex("ラジオを{聞|き}いて、べんきょうしました。", "Rajio o kiite, benkyō shimashita.", "Posłuchałem radia, a potem się uczyłem."),
    ex("{友|とも}だちと{話|はな}して、かえりました。", "Tomodachi to hanashite, kaerimashita.", "Porozmawiałem z przyjacielem i wróciłem do domu."),
  ],
  exercises: [
    choice("Jaka jest forma て od のみます?", ["のんで", "のみて", "のって"], 0, "み przed ます zmienia się w んで."),
    choice("Jaka jest forma て od 書きます?", ["書いて", "書きて", "書って"], 0, "き przed ます zmienia się w いて."),
    choice("Jaka jest forma て od 行きます?", ["行って", "行いて", "行きて"], 0, "行きます to wyjątek: 行って."),
    choice("Jaka jest forma て od 来ます?", ["来て (きて)", "来って", "来んで"], 0, "来ます należy do grupy 3: 来て."),
  ],
  points: ["Grupa 2: 食べます → 食べて.", "Grupa 1: かって, のんで, 書いて, 話して; wyjątek 行って.", "Grupa 3: して, 来て."],
  words: [w.asagohan, w.kiku, w.matsu],
});

export const kudasai = grammarLesson({
  section,
  slug: "kudasai",
  title: "てください — prośby",
  minutes: 10,
  lead: "Forma て i ください to grzeczna prośba: 見てください znaczy „proszę spojrzeć”.",
  sentence: ex("ちょっとまってください。", "Chotto matte kudasai.", "Proszę chwilę poczekać."),
  after: "まって to forma て od まちます (czekać). ください zamienia ją w uprzejmą prośbę.",
  patterns: [{ pattern: ja("V-て ください。", "V-te kudasai."), meaning: "Proszę zrobić V." }],
  explanation:
    "Prośba to forma て i ください: 書いてください (proszę napisać), 聞いてください (proszę posłuchać), 来てください (proszę przyjść).\n\nTo samo ください znasz już z zakupów: これをください (poproszę to). Po rzeczowniku znaczy „proszę dać”, a po formie て „proszę zrobić”.\n\nGdy nie rozumiesz, poproś: ゆっくり話してください (proszę mówić powoli).",
  examples: [
    ex("ちょっとまってください。", "Chotto matte kudasai.", "Proszę chwilę poczekać."),
    ex("ここに{名前|なまえ}を{書|か}いてください。", "Koko ni namae o kaite kudasai.", "Proszę tu wpisać imię."),
    ex("この{本|ほん}を{読|よ}んでください。", "Kono hon o yonde kudasai.", "Proszę przeczytać tę książkę."),
    ex("あした{来|き}てください。", "Ashita kite kudasai.", "Proszę przyjść jutro."),
    ex("ゆっくり{話|はな}してください。", "Yukkuri hanashite kudasai.", "Proszę mówić powoli."),
    ex("ここでまってください。", "Koko de matte kudasai.", "Proszę tu poczekać."),
  ],
  exercises: [
    choice("Jak poprosisz: „Proszę poczekać”?", ["まってください。", "まちてください。", "まちますください。"], 0, "Forma て od まちます to まって."),
    choice("Co znaczy ゆっくり話してください。", ["Proszę mówić powoli.", "Proszę mówić głośno.", "Proszę nic nie mówić."], 0, "ゆっくり to „powoli”."),
    build(
      "Proszę tu wpisać imię.",
      [
        ["ここ", "koko"],
        ["に", "ni"],
        ["{名前|なまえ}", "namae"],
        ["を", "o"],
        ["{書|か}いて", "kaite"],
        ["ください", "kudasai"],
        ["{書|か}きます", "kakimasu"],
      ],
      [0, 1, 2, 3, 4, 5],
    ),
    choice("Jak poprosisz kogoś, żeby przyszedł jutro?", ["あした来てください。", "あした来ますください。", "あした来ってください。"], 0, "Forma て od 来ます to 来て."),
  ],
  points: ["Prośba: forma て i ください: 書いてください。", "Po rzeczowniku ください znaczy „proszę dać”: これをください。", "Przydatne: ゆっくり話してください。"],
  words: [w.yukkuri],
});

export const teimasu = grammarLesson({
  section,
  slug: "teimasu",
  title: "ています — teraz",
  minutes: 12,
  lead: "Forma て i います opisuje czynność w toku: 読んでいます znaczy „czytam (teraz)”.",
  sentence: ex("{今|いま}、{本|ほん}を{読|よ}んでいます。", "Ima, hon o yonde imasu.", "Teraz czytam książkę."),
  after: "読んでいます to „właśnie czytam”. ています mówi, że czynność trwa.",
  patterns: [
    { pattern: ja("V-て います。", "V-te imasu."), meaning: "Właśnie robię V. Robię V (stale)." },
    { pattern: ja("{何|なに}を して いますか。", "Nani o shite imasu ka."), meaning: "Co robisz (teraz)?" },
  ],
  explanation:
    "ています opisuje to, co dzieje się teraz: テレビを見ています (oglądam telewizję), 雨がふっています (pada deszcz).\n\nOpisuje też stan albo zajęcie, które trwa: ワルシャワにすんでいます (mieszkam w Warszawie), 父はぎんこうではたらいています (tata pracuje w banku).\n\nO swoich rodzicach mówisz 父 (tata) i 母 (mama).\n\nPrzeczenie: ていません. 今はテレビを見ていません znaczy „Teraz nie oglądam telewizji”.",
  examples: [
    ex("{今|いま}、{本|ほん}を{読|よ}んでいます。", "Ima, hon o yonde imasu.", "Teraz czytam książkę."),
    ex("{何|なに}をしていますか。", "Nani o shite imasu ka.", "Co robisz?"),
    ex("{雨|あめ}がふっています。", "Ame ga futte imasu.", "Pada deszcz."),
    ex("{父|ちち}はぎんこうではたらいています。", "Chichi wa ginkō de hataraite imasu.", "Mój tata pracuje w banku."),
    ex("{母|はは}はワルシャワにすんでいます。", "Haha wa Warushawa ni sunde imasu.", "Moja mama mieszka w Warszawie."),
    ex("{今|いま}はテレビを{見|み}ていません。", "Ima wa terebi o mite imasen.", "Teraz nie oglądam telewizji."),
  ],
  exercises: [
    choice(
      "Co znaczy 今、テレビを見ています。",
      ["Teraz oglądam telewizję.", "Jutro obejrzę telewizję.", "Wczoraj oglądałem telewizję."],
      0,
      "ています to czynność w toku.",
    ),
    choice("Jak zapytasz: „Co robisz (teraz)?”", ["何をしていますか。", "何をしますか。", "何をしましたか。"], 0, "Czynność w toku: していますか."),
    build(
      "Pada deszcz.",
      [
        ["{雨|あめ}", "ame"],
        ["が", "ga"],
        ["ふっています", "futte imasu"],
        ["を", "o"],
      ],
      [0, 1, 2],
    ),
    choice(
      "Co znaczy 父はぎんこうではたらいています。",
      ["Mój tata pracuje w banku.", "Mój tata idzie do banku.", "Mój tata pracował w banku."],
      0,
      "ています mówi o zajęciu, które trwa.",
    ),
  ],
  points: ["Czynność w toku: 本を読んでいます。", "Stan, który trwa: ワルシャワにすんでいます。", "Przeczenie: 見ていません."],
  words: [w.ame, w.furu, w.sumu, w.chichi, w.haha],
});

export const temoii = grammarLesson({
  section,
  slug: "temoii",
  title: "てもいいです — pozwolenie",
  minutes: 10,
  lead: "Forma て i もいいですか to pytanie o pozwolenie: 入ってもいいですか znaczy „Czy mogę wejść?”.",
  sentence: ex("{入|はい}ってもいいですか。", "Haitte mo ii desu ka.", "Czy mogę wejść?"),
  after: "入って to forma て od 入ります (wchodzić). もいいですか znaczy dosłownie „czy to dobrze, jeśli…”.",
  patterns: [
    { pattern: ja("V-て も いいですか。", "V-te mo ii desu ka."), meaning: "Czy mogę zrobić V?" },
    { pattern: ja("はい、どうぞ。", "Hai, dōzo."), meaning: "Tak, proszę." },
    { pattern: ja("V-て も いいです。", "V-te mo ii desu."), meaning: "Można zrobić V." },
  ],
  explanation:
    "Pytasz o pozwolenie: しゃしんをとってもいいですか (czy mogę zrobić zdjęcie?), ここにすわってもいいですか (czy mogę tu usiąść?).\n\nZgadzasz się: はい、どうぞ。 albo はい、いいですよ。 Odmawiasz łagodnie: すみません、ちょっと…。\n\nBez か zdanie znaczy „można”: ここで食べてもいいです (tu można jeść).",
  examples: [
    ex("{入|はい}ってもいいですか。", "Haitte mo ii desu ka.", "Czy mogę wejść?"),
    ex("はい、どうぞ。", "Hai, dōzo.", "Tak, proszę."),
    ex("しゃしんをとってもいいですか。", "Shashin o totte mo ii desu ka.", "Czy mogę zrobić zdjęcie?"),
    ex("すみません、ちょっと…。", "Sumimasen, chotto…", "Przepraszam, raczej nie."),
    ex("ここにすわってもいいですか。", "Koko ni suwatte mo ii desu ka.", "Czy mogę tu usiąść?"),
    ex("ここで{食|た}べてもいいです。", "Koko de tabete mo ii desu.", "Tu można jeść."),
  ],
  exercises: [
    choice("Jak zapytasz: „Czy mogę wejść?”", ["入ってもいいですか。", "入ってください。", "入っています。"], 0, "Pozwolenie: てもいいですか."),
    choice(
      "Ktoś pyta: しゃしんをとってもいいですか。 Zgadzasz się. Co odpowiesz?",
      ["はい、どうぞ。", "すみません、ちょっと…。", "いいえ、とります。"],
      0,
      "はい、どうぞ znaczy „tak, proszę”.",
    ),
    build(
      "Czy mogę tu usiąść?",
      [
        ["ここ", "koko"],
        ["に", "ni"],
        ["すわって", "suwatte"],
        ["も", "mo"],
        ["いいですか", "ii desu ka"],
        ["ください", "kudasai"],
      ],
      [0, 1, 2, 3, 4],
    ),
    choice("Co znaczy ここで食べてもいいです。", ["Tu można jeść.", "Tu nie wolno jeść.", "Proszę tu zjeść."], 0, "てもいいです znaczy „można”."),
  ],
  points: ["Pytasz o pozwolenie: 入ってもいいですか。", "Zgoda: はい、どうぞ。, odmowa: すみません、ちょっと…。", "Bez か: ここで食べてもいいです。 (tu można jeść)"],
  words: [w.hairu, w.toru, w.suwaru, w.dozo],
});

export const formaTeTest = grammarTest(section, "Forma て", [
  choice("Jaka jest forma て od 食べます?", ["食べて", "食べって", "食べいて"], 0, "Grupa 2: ます → て."),
  choice("Jaka jest forma て od かえります?", ["かえって", "かえりて", "かえんで"], 0, "り przed ます zmienia się w って."),
  choice("Jaka jest forma て od 話します?", ["話して", "話しって", "話いて"], 0, "し przed ます zmienia się w して."),
  choice("Jaka jest forma て od 聞きます?", ["聞いて", "聞きて", "聞って"], 0, "き przed ます zmienia się w いて."),
  choice("Jaka jest forma て od 行きます?", ["行って", "行いて", "行きて"], 0, "行きます to wyjątek."),
  choice("Jak poprosisz: „Proszę napisać”?", ["書いてください。", "書きてください。", "書きますください。"], 0, "Forma て i ください."),
  choice("Co znaczy 今、雨がふっています。", ["Teraz pada deszcz.", "Jutro będzie padać.", "Wczoraj padało."], 0, "ています to czynność w toku."),
  choice("Co znaczy 母はワルシャワにすんでいます。", ["Mama mieszka w Warszawie.", "Mama jedzie do Warszawy.", "Mama mieszkała w Warszawie."], 0, "すんでいます to stan, który trwa."),
  choice("Jak zapytasz: „Czy mogę zrobić zdjęcie?”", ["しゃしんをとってもいいですか。", "しゃしんをとってください。", "しゃしんをとっています。"], 0, "Pozwolenie: てもいいですか."),
  choice("Jak łagodnie odmówisz?", ["すみません、ちょっと…。", "はい、どうぞ。", "はい、いいですよ。"], 0, "Japończycy odmawiają łagodnie: すみません、ちょっと…"),
]);
