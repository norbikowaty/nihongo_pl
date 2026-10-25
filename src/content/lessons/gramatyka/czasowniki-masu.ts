import { w } from "../words";
import { build, choice, ex, grammarLesson, grammarTest, ja } from "./make";

// Particles like を come in the next section, so these lessons use verbs that need no object.
const section = "czasowniki-masu";

export const masu = grammarLesson({
  section,
  slug: "masu",
  title: "Forma ます",
  minutes: 12,
  lead: "Japoński czasownik stoi na końcu zdania. Grzeczna forma kończy się na ます i mówi o teraźniejszości albo przyszłości.",
  sentence: ex("わたしはあした{行|い}きます。", "Watashi wa ashita ikimasu.", "Jutro pojadę."),
  after: "行きます znaczy „idę, jadę” albo „pójdę, pojadę”. Że chodzi o przyszłość, mówi あした (jutro).",
  patterns: [
    { pattern: ja("A は V-ます。", "A wa V-masu."), meaning: "A robi V. A zrobi V." },
    { pattern: ja("まいにち V-ます。", "Mainichi V-masu."), meaning: "Codziennie robię V." },
  ],
  explanation:
    "Czasownik zawsze stoi na końcu zdania: わたしは行きます。\n\nForma ます jest grzeczna. Używasz jej z nieznajomymi, w sklepie i w pracy. Ta sama forma mówi o teraźniejszości i o przyszłości: 行きます to „idę” albo „pójdę”.\n\nPodmiot często się pomija, gdy wiadomo, o kogo chodzi: あした来ます。 to „Jutro przyjdę”.\n\nNowe czasowniki: 行きます (iść, jechać), 来ます (przychodzić), かえります (wracać do domu), おきます (wstawać), ねます (iść spać), はたらきます (pracować), べんきょうします (uczyć się).",
  examples: [
    ex("わたしはあした{行|い}きます。", "Watashi wa ashita ikimasu.", "Jutro pojadę."),
    ex("{先生|せんせい}はあした{来|き}ます。", "Sensei wa ashita kimasu.", "Nauczyciel przyjdzie jutro."),
    ex("まいにちはたらきます。", "Mainichi hatarakimasu.", "Pracuję codziennie."),
    ex("{今|いま}かえります。", "Ima kaerimasu.", "Już wracam do domu."),
    ex("まいにちべんきょうします。", "Mainichi benkyō shimasu.", "Codziennie się uczę."),
    ex("よるははやくねます。", "Yoru wa hayaku nemasu.", "Wieczorem wcześnie chodzę spać."),
  ],
  exercises: [
    choice("Gdzie stoi czasownik w japońskim zdaniu?", ["Na końcu", "Na początku", "Zaraz po は"], 0, "Czasownik zamyka zdanie: わたしは行きます。"),
    choice(
      "Co znaczy あした来ます。",
      ["Przyjdę jutro.", "Pójdę jutro.", "Przyszedłem wczoraj."],
      0,
      "来ます to „przychodzić”, a 行きます to „iść”.",
    ),
    build(
      "Codziennie się uczę.",
      [
        ["まいにち", "mainichi"],
        ["べんきょうします", "benkyō shimasu"],
        ["きのう", "kinō"],
      ],
      [0, 1],
    ),
    choice("Jak powiesz: „Już wracam do domu”?", ["今かえります。", "今来ます。", "今おきます。"], 0, "かえります to „wracać do domu”."),
  ],
  points: [
    "Czasownik stoi na końcu: わたしは行きます。",
    "ます to grzeczna forma o teraźniejszości i przyszłości.",
    "行きます to „iść”, 来ます „przychodzić”, かえります „wracać do domu”.",
  ],
  words: [w.iku, w.kuru, w.kaeru, w.okiru, w.neru, w.hataraku, w.benkyo, w.mainichi, w.yoru, w.hayaku],
});

export const masen = grammarLesson({
  section,
  slug: "masen",
  title: "Przeczenie ません",
  minutes: 10,
  lead: "Przeczenie tworzysz, zamieniając ます na ません: 行きます → 行きません.",
  sentence: ex("あしたは{行|い}きません。", "Ashita wa ikimasen.", "Jutro nie pójdę."),
  after: "は po あした podkreśla, że chodzi akurat o jutro. Pytanie zrobisz tak samo jak przy です: dodajesz か na końcu.",
  patterns: [
    { pattern: ja("V-ます → V-ません", "V-masu → V-masen"), meaning: "robię → nie robię" },
    { pattern: ja("V-ますか。", "V-masu ka."), meaning: "Czy robisz V?" },
  ],
  explanation:
    "Każdy czasownik w formie ます przeczysz tak samo: ます zamieniasz na ません. 来ます → 来ません, はたらきます → はたらきません.\n\nPytanie tworzysz jak przy です, dodając か: あした来ますか。 znaczy „Przyjdziesz jutro?”.\n\nNa pytanie odpowiadasz, powtarzając czasownik: はい、来ます。 albo いいえ、来ません。 Samo はい albo いいえ brzmi zbyt krótko.\n\nNowy czasownik: 休みます (odpoczywać, mieć wolne).",
  examples: [
    ex("あしたは{行|い}きません。", "Ashita wa ikimasen.", "Jutro nie pójdę."),
    ex("あした{来|き}ますか。", "Ashita kimasu ka.", "Przyjdziesz jutro?"),
    ex("いいえ、{来|き}ません。", "Iie, kimasen.", "Nie, nie przyjdę."),
    ex("どようびは{休|やす}みます。", "Doyōbi wa yasumimasu.", "W sobotę mam wolne."),
    ex("にちようびははたらきません。", "Nichiyōbi wa hatarakimasen.", "W niedzielę nie pracuję."),
    ex("まいあさべんきょうしますか。", "Maiasa benkyō shimasu ka.", "Uczysz się co rano?"),
  ],
  exercises: [
    choice("Jak zaprzeczysz 行きます?", ["行きません", "行きないです", "行きましません"], 0, "ます zamieniasz na ません."),
    choice(
      "Ktoś pyta: あした来ますか。 Nie przyjdziesz. Co odpowiesz?",
      ["いいえ、来ません。", "いいえ、来ます。", "はい、来ません。"],
      0,
      "いいえ i przeczący czasownik: 来ません.",
    ),
    build(
      "W niedzielę nie pracuję.",
      [
        ["にちようび", "nichiyōbi"],
        ["は", "wa"],
        ["はたらきません", "hatarakimasen"],
        ["はたらきます", "hatarakimasu"],
      ],
      [0, 1, 2],
    ),
    choice(
      "Co znaczy どようびは休みます。",
      ["W sobotę mam wolne.", "W sobotę pracuję.", "W sobotę się uczę."],
      0,
      "休みます to „odpoczywać, mieć wolne”.",
    ),
  ],
  points: ["Przeczenie: ます → ません, na przykład 行きません.", "Pytanie: dodajesz か, na przykład 来ますか。", "Odpowiadasz, powtarzając czasownik: いいえ、来ません。"],
  words: [w.yasumu, w.maiasa],
});

export const mashita = grammarLesson({
  section,
  slug: "mashita",
  title: "Czas przeszły ました",
  minutes: 12,
  lead: "Czas przeszły tworzysz, zamieniając ます na ました. Przeczenie w przeszłości to ませんでした.",
  sentence: ex("きのうははやくねました。", "Kinō wa hayaku nemashita.", "Wczoraj wcześnie poszedłem spać."),
  after: "ねます (idę spać) zmienia się w ねました (poszedłem spać). きのう i tak mówi o przeszłości, ale czasownik też zmieniasz.",
  patterns: [
    { pattern: ja("V-ました", "V-mashita"), meaning: "zrobiłem V" },
    { pattern: ja("V-ませんでした", "V-masen deshita"), meaning: "nie zrobiłem V" },
    { pattern: ja("A でした", "A deshita"), meaning: "to był A (przeszłe です)" },
  ],
  explanation:
    "Cztery grzeczne formy: 行きます (idę), 行きません (nie idę), 行きました (poszedłem), 行きませんでした (nie poszedłem).\n\nPo polsku czas przeszły ma rodzaj, po japońsku nie: 行きました to „poszedłem”, „poszłam” albo „poszli”.\n\nです też ma przeszłość: でした. きのうはにちようびでした。 znaczy „Wczoraj była niedziela”.",
  examples: [
    ex("きのうははやくねました。", "Kinō wa hayaku nemashita.", "Wczoraj wcześnie poszedłem spać."),
    ex("{先生|せんせい}はきのう{来|き}ました。", "Sensei wa kinō kimashita.", "Nauczyciel przyszedł wczoraj."),
    ex("きのうははたらきませんでした。", "Kinō wa hatarakimasen deshita.", "Wczoraj nie pracowałem."),
    ex("けさははやくおきました。", "Kesa wa hayaku okimashita.", "Dziś rano wstałem wcześnie."),
    ex("きのうはにちようびでした。", "Kinō wa nichiyōbi deshita.", "Wczoraj była niedziela."),
    ex("せんしゅう{休|やす}みましたか。", "Senshū yasumimashita ka.", "Miałeś wolne w zeszłym tygodniu?"),
  ],
  exercises: [
    choice(
      "Jak powiesz: „Wczoraj pracowałem”?",
      ["きのうはたらきました。", "きのうはたらきます。", "きのうはたらきませんでした。"],
      0,
      "Przeszłość to ました.",
    ),
    choice("Co znaczy 来ませんでした?", ["nie przyszedł", "przyszedł", "nie przyjdzie"], 0, "ませんでした to przeczenie w przeszłości."),
    choice(
      "Jak powiesz: „Wczoraj była sobota”?",
      ["きのうはどようびでした。", "きのうはどようびです。", "あしたはどようびでした。"],
      0,
      "Przeszłe です to でした.",
    ),
    build(
      "Dziś rano wstałem wcześnie.",
      [
        ["けさ", "kesa"],
        ["はやく", "hayaku"],
        ["おきました", "okimashita"],
        ["おきます", "okimasu"],
      ],
      [0, 1, 2],
    ),
  ],
  points: ["Przeszłość: ます → ました, na przykład 行きました.", "Przeczenie w przeszłości: ませんでした.", "Przeszłe です to でした."],
  words: [w.kesa, w.senshu],
});

export const masenka = grammarLesson({
  section,
  slug: "masenka",
  title: "Zaproszenia ませんか",
  minutes: 10,
  lead: "Zapraszasz kogoś pytaniem z przeczeniem: 行きませんか。 znaczy „Może pójdziemy?”. ましょう znaczy „zróbmy to”.",
  sentence: ex("いっしょに{行|い}きませんか。", "Issho ni ikimasen ka.", "Może pójdziemy razem?"),
  after: "いっしょに znaczy „razem”. Pytanie z ません brzmi tu jak uprzejma propozycja, a nie jak pytanie o przeczenie.",
  patterns: [
    { pattern: ja("いっしょに V-ませんか。", "Issho ni V-masen ka."), meaning: "Może zrobimy V razem?" },
    { pattern: ja("V-ましょう。", "V-mashō."), meaning: "Zróbmy V." },
  ],
  explanation:
    "ませんか to grzeczne zaproszenie: あした来ませんか。 znaczy „Może przyjdziesz jutro?”.\n\nましょう to „zróbmy”: 行きましょう。 znaczy „Chodźmy”.\n\nNa zaproszenie odpowiadasz ええ、いいですね。 (Tak, świetnie) albo ええ、行きましょう。 Odmawiasz łagodnie: あしたはちょっと…, czyli „Jutro to trochę…”. Japończycy rzadko mówią wprost „nie”.",
  examples: [
    ex("いっしょに{行|い}きませんか。", "Issho ni ikimasen ka.", "Może pójdziemy razem?"),
    ex("ええ、{行|い}きましょう。", "Ē, ikimashō.", "Tak, chodźmy."),
    ex("どようび、いっしょにべんきょうしませんか。", "Doyōbi, issho ni benkyō shimasen ka.", "Może pouczymy się razem w sobotę?"),
    ex("ええ、いいですね。", "Ē, ii desu ne.", "Tak, świetnie."),
    ex("あしたはちょっと…。", "Ashita wa chotto…", "Jutro raczej nie mogę…"),
    ex("ちょっと{休|やす}みましょう。", "Chotto yasumimashō.", "Odpocznijmy chwilę."),
  ],
  exercises: [
    choice(
      "Jak zaprosisz kogoś: „Może pójdziemy razem?”",
      ["いっしょに行きませんか。", "いっしょに行きません。", "いっしょに行きました。"],
      0,
      "Zaproszenie to pytanie z ませんか.",
    ),
    choice(
      "Kolega pyta: あした来ませんか。 Chcesz przyjść. Co odpowiesz?",
      ["ええ、いいですね。", "いいえ、来ません。", "あしたはちょっと…。"],
      0,
      "ええ、いいですね。 znaczy „Tak, świetnie”.",
    ),
    build(
      "Odpocznijmy chwilę.",
      [
        ["ちょっと", "chotto"],
        ["{休|やす}みましょう", "yasumimashō"],
        ["{休|やす}みます", "yasumimasu"],
      ],
      [0, 1],
    ),
    choice("Co znaczy 行きましょう。", ["Chodźmy.", "Pójdę.", "Czy pójdziesz?"], 0, "ましょう znaczy „zróbmy”."),
  ],
  points: ["Zapraszasz: いっしょに行きませんか。", "Proponujesz: 行きましょう。, czyli „chodźmy”.", "Odmawiasz łagodnie: あしたはちょっと…。"],
  words: [w.issho, w.chotto, w.ee],
});

export const czasownikiMasuTest = grammarTest(section, "Czasowniki ます", [
  choice("Co znaczy あした行きます。", ["Jutro pójdę.", "Wczoraj poszedłem.", "Jutro nie pójdę."], 0, "行きます to teraźniejszość albo przyszłość."),
  choice("Jak zaprzeczysz はたらきます?", ["はたらきません", "はたらきないです", "はたらきました"], 0, "ます → ません."),
  choice("Jak powiesz: „Wczoraj nie pracowałem”?", ["きのうははたらきませんでした。", "きのうははたらきません。", "きのうははたらきました。"], 0, "Przeczenie w przeszłości to ませんでした."),
  choice("Co znaczy 先生は来ましたか。", ["Czy nauczyciel przyszedł?", "Czy nauczyciel przyjdzie?", "Nauczyciel nie przyszedł."], 0, "ました to przeszłość, か to pytanie."),
  choice("Jak powiesz: „Wczoraj była sobota”?", ["きのうはどようびでした。", "きのうはどようびです。", "きのうはどようびました。"], 0, "Przeszłe です to でした."),
  choice("Jak zaprosisz kogoś: „Może pójdziemy razem?”", ["いっしょに行きませんか。", "いっしょに行きましたか。", "いっしょに行きます。"], 0, "Zaproszenie to ませんか."),
  choice("Co znaczy 休みましょう。", ["Odpocznijmy.", "Odpocząłem.", "Nie odpoczywam."], 0, "ましょう to „zróbmy”."),
  choice("Ktoś pyta: あしたべんきょうしますか。 Tak, będziesz się uczyć. Co odpowiesz?", ["はい、べんきょうします。", "はい、べんきょうしません。", "いいえ、べんきょうします。"], 0, "はい i czasownik w formie twierdzącej."),
  choice("Które słowo znaczy „wracać do domu”?", ["かえります", "おきます", "ねます"], 0, "かえります to „wracać do domu”."),
  choice("Jak grzecznie odmówisz zaproszenia na jutro?", ["あしたはちょっと…。", "いいえ、行きません。", "あしたは行きましょう。"], 0, "Japończycy odmawiają łagodnie: あしたはちょっと…"),
]);
