import { w } from "../words";
import { build, choice, ex, grammarLesson, grammarTest, ja } from "./make";

const section = "przymiotniki";

export const i = grammarLesson({
  section,
  slug: "i",
  title: "Przymiotniki い",
  minutes: 12,
  lead: "Przymiotniki い kończą się na い: 大きい (duży), 高い (drogi). Stawiasz je przed rzeczownikiem albo na końcu zdania z です.",
  sentence: ex("この{車|くるま}は{大|おお}きいです。", "Kono kuruma wa ōkii desu.", "Ten samochód jest duży."),
  after: "大きい stoi tu na końcu zdania, przed です. Możesz też powiedzieć 大きい車, czyli „duży samochód”.",
  patterns: [
    { pattern: ja("A は {大|おお}きいです。", "A wa ōkii desu."), meaning: "A jest duży." },
    { pattern: ja("{大|おお}きい A", "ōkii A"), meaning: "duży A" },
  ],
  explanation:
    "Przymiotnik い stoi przed rzeczownikiem bez żadnej zmiany: 大きい車 (duży samochód), 高い本 (droga książka).\n\nNa końcu zdania dodajesz です: この本は高いです。\n\n高い znaczy „drogi” i „wysoki”. Pary przeciwieństw: 大きい i 小さい, 高い i やすい (tani), あたらしい (nowy) i ふるい (stary).\n\nO wrażenie pytasz słowem どう: 日本語はどうですか。 znaczy „Jak ci się podoba japoński?”.",
  examples: [
    ex("この{車|くるま}は{大|おお}きいです。", "Kono kuruma wa ōkii desu.", "Ten samochód jest duży."),
    ex("{小|ちい}さいかばんです。", "Chiisai kaban desu.", "To mała torba."),
    ex("この{本|ほん}は{高|たか}いです。", "Kono hon wa takai desu.", "Ta książka jest droga."),
    ex("やすいペンをかいました。", "Yasui pen o kaimashita.", "Kupiłem tani długopis."),
    ex("{日本語|にほんご}はどうですか。", "Nihongo wa dō desu ka.", "Jak ci się podoba japoński?"),
    ex("おもしろいです。", "Omoshiroi desu.", "Jest ciekawy."),
  ],
  exercises: [
    choice("Jak powiesz „duży samochód”?", ["大きい車", "大きいな車", "車大きい"], 0, "Przymiotnik い stoi przed rzeczownikiem bez zmian."),
    choice(
      "Co znaczy この本は高いです。",
      ["Ta książka jest droga.", "Ta książka jest tania.", "Ta książka jest nowa."],
      0,
      "高い to „drogi” (i „wysoki”).",
    ),
    choice("Które słowo jest przeciwieństwem 大きい?", ["小さい", "高い", "ふるい"], 0, "大きい to „duży”, 小さい to „mały”."),
    build(
      "Kupiłem tani długopis.",
      [
        ["やすい", "yasui"],
        ["ペン", "pen"],
        ["を", "o"],
        ["かいました", "kaimashita"],
        ["は", "wa"],
      ],
      [0, 1, 2, 3],
    ),
  ],
  points: ["Przymiotnik い przed rzeczownikiem: 大きい車.", "Na końcu zdania z です: この本は高いです。", "高い to „drogi” i „wysoki”."],
  words: [w.ookii, w.chiisai, w.takaiK, w.yasui, w.atarashii, w.furui, w.omoshiroi, w.do],
});

export const na = grammarLesson({
  section,
  slug: "na",
  title: "Przymiotniki な",
  minutes: 12,
  lead: "Przymiotniki な dostają な przed rzeczownikiem: しずかなまち (cicha okolica). Na końcu zdania stoją jak rzeczownik, z です.",
  sentence: ex("ここはしずかなまちです。", "Koko wa shizuka na machi desu.", "To cicha okolica."),
  after: "しずか znaczy „cichy”. Przed rzeczownikiem dodajesz な: しずかなまち. Na końcu zdania な znika: まちはしずかです。",
  patterns: [
    { pattern: ja("しずかな A", "shizuka na A"), meaning: "cichy A" },
    { pattern: ja("A は しずかです。", "A wa shizuka desu."), meaning: "A jest cichy." },
    { pattern: ja("A が すきです。", "A ga suki desu."), meaning: "Lubię A." },
  ],
  explanation:
    "Przymiotniki な: しずか (cichy), きれい (ładny, czysty), げんき (zdrowy, pełen energii), ゆうめい (sławny), べんり (wygodny, praktyczny), すき (lubiany), きらい (nielubiany).\n\nUważaj: きれい i きらい kończą się na い, ale to przymiotniki な. Mówisz きれいなまち, a nie きれいまち.\n\nPrzy すき i きらい to, co lubisz, oznaczasz が: ねこがすきです (lubię koty), なつがきらいです (nie lubię lata).",
  examples: [
    ex("ここはしずかなまちです。", "Koko wa shizuka na machi desu.", "To cicha okolica."),
    ex("この{川|かわ}はきれいです。", "Kono kawa wa kirei desu.", "Ta rzeka jest czysta."),
    ex("きれいな{山|やま}です。", "Kirei na yama desu.", "To piękna góra."),
    ex("{先生|せんせい}はげんきです。", "Sensei wa genki desu.", "Nauczyciel ma się dobrze."),
    ex("ねこがすきです。", "Neko ga suki desu.", "Lubię koty."),
    ex("このレストランはゆうめいです。", "Kono resutoran wa yūmei desu.", "Ta restauracja jest sławna."),
  ],
  exercises: [
    choice("Jak powiesz „cicha okolica”?", ["しずかなまち", "しずかまち", "しずかいまち"], 0, "Przed rzeczownikiem przymiotnik な dostaje な."),
    choice("Które słowo to przymiotnik な?", ["きれい", "おおきい", "やすい"], 0, "きれい kończy się na い, ale to przymiotnik な."),
    build(
      "Lubię koty.",
      [
        ["ねこ", "neko"],
        ["が", "ga"],
        ["すきです", "suki desu"],
        ["を", "o"],
      ],
      [0, 1, 2],
    ),
    choice(
      "Co znaczy このまちはべんりです。",
      ["To miasto jest wygodne do życia.", "To miasto jest ciche.", "To miasto jest sławne."],
      0,
      "べんり to „wygodny, praktyczny”.",
    ),
  ],
  points: ["Przed rzeczownikiem: しずかなまち.", "Na końcu zdania bez な: まちはしずかです。", "Lubisz coś: ねこがすきです。"],
  words: [w.shizuka, w.genki, w.yumei, w.benri, w.sukina, w.kirai],
});

export const przeczenie = grammarLesson({
  section,
  slug: "przeczenie",
  title: "Przeczenie przymiotników",
  minutes: 10,
  lead: "Przymiotnik い przeczysz, zamieniając い na くないです. Przymiotnik な przeczysz tak jak rzeczownik: じゃありません.",
  sentence: ex("この{本|ほん}は{高|たか}くないです。", "Kono hon wa takakunai desu.", "Ta książka nie jest droga."),
  after: "高い → 高くない: odcinasz い i dodajesz くない. です zostaje na końcu, żeby zdanie było grzeczne.",
  patterns: [
    { pattern: ja("{高|たか}い → {高|たか}くないです", "takai → takakunai desu"), meaning: "nie jest drogi" },
    { pattern: ja("いい → よくないです", "ii → yokunai desu"), meaning: "nie jest dobry" },
    { pattern: ja("しずか → しずかじゃありません", "shizuka → shizuka ja arimasen"), meaning: "nie jest cichy" },
  ],
  explanation:
    "Przymiotnik い: 大きい → 大きくないです, おいしい → おいしくないです.\n\nJeden wyjątek: いい (dobry) w przeczeniu ma formę よくないです.\n\nPrzymiotnik な przeczysz jak rzeczownik: しずかじゃありません, きれいじゃありません. Uważaj na きれい: mówisz きれいじゃありません, a nie きれくない.\n\nあまり z przeczeniem znaczy „niezbyt”: あまりよくないです to „niezbyt dobry”.",
  examples: [
    ex("この{本|ほん}は{高|たか}くないです。", "Kono hon wa takakunai desu.", "Ta książka nie jest droga."),
    ex("このかばんは{白|しろ}くないです。", "Kono kaban wa shirokunai desu.", "Ta torba nie jest biała."),
    ex("{日本語|にほんご}はむずかしくないです。", "Nihongo wa muzukashikunai desu.", "Japoński nie jest trudny."),
    ex("{今日|きょう}はさむくないです。", "Kyō wa samukunai desu.", "Dziś nie jest zimno."),
    ex("このまちはしずかじゃありません。", "Kono machi wa shizuka ja arimasen.", "To miasto nie jest ciche."),
    ex("このレストランはあまりよくないです。", "Kono resutoran wa amari yokunai desu.", "Ta restauracja jest niezbyt dobra."),
  ],
  exercises: [
    choice("Jak zaprzeczysz 大きいです?", ["大きくないです", "大きいじゃありません", "大きないです"], 0, "い zamieniasz na くない."),
    choice("Jak zaprzeczysz いいです?", ["よくないです", "いくないです", "いいじゃありません"], 0, "いい to wyjątek: よくないです."),
    choice("Jak zaprzeczysz きれいです?", ["きれいじゃありません", "きれくないです", "きれいくないです"], 0, "きれい to przymiotnik な, więc じゃありません."),
    build(
      "Dziś nie jest zimno.",
      [
        ["{今日|きょう}", "kyō"],
        ["は", "wa"],
        ["さむくないです", "samukunai desu"],
        ["さむいです", "samui desu"],
      ],
      [0, 1, 2],
    ),
  ],
  points: ["Przymiotnik い: 高い → 高くないです.", "Wyjątek: いい → よくないです.", "Przymiotnik な: しずか → しずかじゃありません."],
  words: [w.shiroi, w.ii, w.muzukashii, w.amari],
});

export const przeszly = grammarLesson({
  section,
  slug: "przeszly",
  title: "Czas przeszły przymiotników",
  minutes: 12,
  lead: "Przymiotnik い w czasie przeszłym kończy się na かったです. Przymiotnik な dostaje でした, tak jak rzeczownik.",
  sentence: ex("きのうは{天気|てんき}がよかったです。", "Kinō wa tenki ga yokatta desu.", "Wczoraj była ładna pogoda."),
  after: "いい w przeszłości to よかった. 天気がいいです znaczy „pogoda jest ładna”, a 天気がよかったです „pogoda była ładna”.",
  patterns: [
    { pattern: ja("{高|たか}い → {高|たか}かったです", "takai → takakatta desu"), meaning: "był drogi" },
    { pattern: ja("{高|たか}くなかったです", "takakunakatta desu"), meaning: "nie był drogi" },
    { pattern: ja("しずかでした", "shizuka deshita"), meaning: "był cichy" },
    { pattern: ja("しずかじゃありませんでした", "shizuka ja arimasen deshita"), meaning: "nie był cichy" },
  ],
  explanation:
    "Przymiotnik い: odcinasz い i dodajesz かったです. 高い → 高かったです, さむい → さむかったです. Przeczenie w przeszłości: 高くなかったです.\n\nいい znowu jest wyjątkiem: よかったです (był dobry), よくなかったです (nie był dobry).\n\nPrzymiotnik な odmienia się jak rzeczownik: しずかでした, しずかじゃありませんでした.\n\nUważaj: nie mówisz 高いでした. Przeszłość jest już w samym przymiotniku.",
  examples: [
    ex("きのうは{天気|てんき}がよかったです。", "Kinō wa tenki ga yokatta desu.", "Wczoraj była ładna pogoda."),
    ex("テストはむずかしかったです。", "Tesuto wa muzukashikatta desu.", "Test był trudny."),
    ex("そのレストランはおいしかったです。", "Sono resutoran wa oishikatta desu.", "W tamtej restauracji było smacznie."),
    ex("きのうはさむくなかったです。", "Kinō wa samukunakatta desu.", "Wczoraj nie było zimno."),
    ex("まちはしずかでした。", "Machi wa shizuka deshita.", "Miasto było ciche."),
    ex("{先生|せんせい}はげんきじゃありませんでした。", "Sensei wa genki ja arimasen deshita.", "Nauczyciel nie czuł się dobrze."),
  ],
  exercises: [
    choice("Jak powiesz: „Było zimno”?", ["さむかったです。", "さむいでした。", "さむくないです。"], 0, "い → かったです."),
    choice("Jak brzmi いいです w czasie przeszłym?", ["よかったです", "いかったです", "いいでした"], 0, "いい to wyjątek: よかったです."),
    choice("Jak powiesz: „Było cicho” (しずか)?", ["しずかでした。", "しずかかったです。", "しずかなかったです。"], 0, "Przymiotnik な dostaje でした."),
    build(
      "Test był trudny.",
      [
        ["テスト", "tesuto"],
        ["は", "wa"],
        ["むずかしかったです", "muzukashikatta desu"],
        ["むずかしいでした", "muzukashii deshita"],
      ],
      [0, 1, 2],
    ),
  ],
  points: ["Przymiotnik い: さむい → さむかったです, przeczenie さむくなかったです.", "Wyjątek: いい → よかったです.", "Przymiotnik な: しずかでした, しずかじゃありませんでした."],
  words: [w.tenki],
});

export const przymiotnikiTest = grammarTest(section, "Przymiotniki", [
  choice("Jak powiesz „mała torba”?", ["小さいかばん", "小さいなかばん", "かばん小さい"], 0, "Przymiotnik い stoi przed rzeczownikiem bez zmian."),
  choice("Jak powiesz „cicha okolica”?", ["しずかなまち", "しずかまち", "しずかいまち"], 0, "Przymiotnik な dostaje な przed rzeczownikiem."),
  choice("Co znaczy このペンはやすいです。", ["Ten długopis jest tani.", "Ten długopis jest drogi.", "Ten długopis jest nowy."], 0, "やすい to „tani”."),
  choice("Jak zaprzeczysz おいしいです?", ["おいしくないです", "おいしいじゃありません", "おいしないです"], 0, "い → くないです."),
  choice("Jak zaprzeczysz げんきです?", ["げんきじゃありません", "げんきくないです", "げんかないです"], 0, "げんき to przymiotnik な."),
  choice("Jak brzmi いいです w przeczeniu?", ["よくないです", "いくないです", "いいじゃありません"], 0, "いい to wyjątek."),
  choice("Jak powiesz: „Było gorąco” (あつい)?", ["あつかったです。", "あついでした。", "あつくないです。"], 0, "い → かったです."),
  choice("Jak powiesz: „Było ładnie” (きれい)?", ["きれいでした。", "きれかったです。", "きれいかったです。"], 0, "きれい to przymiotnik な, więc でした."),
  choice("Co znaczy ねこがすきです。", ["Lubię koty.", "Nie lubię kotów.", "Mam kota."], 0, "すき to „lubiany”."),
  choice("Co znaczy きのうは天気がよかったです。", ["Wczoraj była ładna pogoda.", "Dziś jest ładna pogoda.", "Wczoraj była brzydka pogoda."], 0, "よかった to przeszłe いい."),
]);
