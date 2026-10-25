import { w } from "../words";
import { build, choice, ex, grammarLesson, grammarTest, ja } from "./make";

const section = "to-i-tamto";

export const koreSoreAre = grammarLesson({
  section,
  slug: "kore-sore-are",
  title: "これ・それ・あれ",
  minutes: 10,
  lead: "これ, それ i あれ znaczą „to” i „tamto”. Wybierasz słowo według tego, gdzie rzecz leży: przy tobie, przy rozmówcy czy daleko od was obu.",
  sentence: ex("それはかばんですか。", "Sore wa kaban desu ka.", "Czy to (przy tobie) jest torba?"),
  after: "これ to rzecz przy mówiącym, それ przy rozmówcy, あれ daleko od was obu. Zaraz po nich stawiasz は.",
  patterns: [
    { pattern: ja("これ は A です。", "Kore wa A desu."), meaning: "To (przy mnie) jest A." },
    { pattern: ja("それ は A です。", "Sore wa A desu."), meaning: "To (przy tobie) jest A." },
    { pattern: ja("あれ は A です。", "Are wa A desu."), meaning: "Tamto (daleko) jest A." },
  ],
  explanation:
    "Japoński ma trzy stopnie odległości. これ wskazuje rzecz przy mówiącym, それ przy rozmówcy, あれ daleko od was obu.\n\nGdy ktoś pyta これは何ですか。 o rzecz, którą trzyma, odpowiadasz それは…です。, bo dla ciebie ta rzecz jest przy nim.\n\nこれ, それ i あれ stoją same, bez rzeczownika: mówisz これは本です。, a nie これ本. Słowa, które łączą się z rzeczownikiem, poznasz w następnej lekcji.",
  examples: [
    ex("これは{本|ほん}です。", "Kore wa hon desu.", "To jest książka."),
    ex("それはかばんですか。", "Sore wa kaban desu ka.", "Czy to (przy tobie) jest torba?"),
    ex("はい、そうです。", "Hai, sō desu.", "Tak, zgadza się."),
    ex("あれは{何|なん}ですか。", "Are wa nan desu ka.", "Co to jest (tam daleko)?"),
    ex("あれはえきです。", "Are wa eki desu.", "Tamto to stacja."),
    ex("それはわたしのペンです。", "Sore wa watashi no pen desu.", "To (przy tobie) jest mój długopis."),
  ],
  exercises: [
    choice(
      "Trzymasz książkę. Jak powiesz: „To jest książka”?",
      ["これは本です。", "それは本です。", "あれは本です。"],
      0,
      "Rzecz jest przy tobie, więc mówisz これ.",
    ),
    choice(
      "Kolega trzyma długopis i pyta: これは何ですか。 Co odpowiesz?",
      ["それはペンです。", "これはペンです。", "あれはペンです。"],
      0,
      "Długopis jest przy nim, więc dla ciebie to それ.",
    ),
    choice(
      "Pokazujesz stację daleko od was obu. Co powiesz?",
      ["あれはえきです。", "それはえきです。", "これはえきです。"],
      0,
      "Rzecz daleko od was obu to あれ.",
    ),
    build(
      "Co to jest (tam daleko)?",
      [
        ["あれ", "are"],
        ["は", "wa"],
        ["{何|なん}", "nan"],
        ["ですか", "desu ka"],
        ["これ", "kore"],
      ],
      [0, 1, 2, 3],
    ),
  ],
  points: [
    "これ to rzecz przy tobie: これは本です。",
    "それ to rzecz przy rozmówcy: それはかばんですか。",
    "あれ to rzecz daleko od was obu: あれは何ですか。",
  ],
  words: [w.kore, w.sore, w.are],
});

export const konoSonoAno = grammarLesson({
  section,
  slug: "kono-sono-ano",
  title: "この・その・あの",
  minutes: 10,
  lead: "この, その i あの stawiasz przed rzeczownikiem: この本 to „ta książka”, あの人 to „tamten człowiek”.",
  sentence: ex("この{本|ほん}はわたしのです。", "Kono hon wa watashi no desu.", "Ta książka jest moja."),
  after: "Odległość działa tak samo jak przy これ, それ i あれ. Różnica jest jedna: この, その i あの nie stoją same, zawsze idzie za nimi rzeczownik.",
  patterns: [
    { pattern: ja("この A", "kono A"), meaning: "ten A (przy mnie)" },
    { pattern: ja("その A", "sono A"), meaning: "ten A (przy tobie)" },
    { pattern: ja("あの A", "ano A"), meaning: "tamten A (daleko)" },
  ],
  explanation:
    "これ zastępuje rzecz, a この ją wskazuje: これは本です。 to „To jest książka”, a この本は… to „Ta książka…”.\n\nPo の możesz pominąć rzecz, gdy wiadomo, o czym mowa: この本はわたしのです。 znaczy „Ta książka jest moja”.\n\nO ludziach mówisz この人, その人, あの人. Grzeczniej brzmi このかた, あのかた.",
  examples: [
    ex("このかさはわたしのです。", "Kono kasa wa watashi no desu.", "Ten parasol jest mój."),
    ex("そのペンは{先生|せんせい}のですか。", "Sono pen wa sensei no desu ka.", "Czy ten długopis (przy tobie) jest nauczyciela?"),
    ex("あの{人|ひと}はだれですか。", "Ano hito wa dare desu ka.", "Kim jest tamten człowiek?"),
    ex("あの{車|くるま}はたなかさんのです。", "Ano kuruma wa Tanaka-san no desu.", "Tamten samochód jest pana Tanaki."),
    ex("この{本|ほん}は{日本語|にほんご}の{本|ほん}です。", "Kono hon wa nihongo no hon desu.", "Ta książka jest do japońskiego."),
  ],
  exercises: [
    choice(
      "Uzupełnij: ＿本はわたしのです。 (ta książka, którą trzymasz)",
      ["この", "これ", "あの"],
      0,
      "Przed rzeczownikiem stoi この, a nie これ.",
    ),
    choice(
      "Co znaczy あの人はだれですか。",
      ["Kim jest tamten człowiek?", "Kim jesteś?", "Czyj jest tamten samochód?"],
      0,
      "あの人 to „tamten człowiek”, だれ to „kto”.",
    ),
    build(
      "Ten parasol (przy tobie) jest mój.",
      [
        ["その", "sono"],
        ["かさ", "kasa"],
        ["は", "wa"],
        ["わたしの", "watashi no"],
        ["です", "desu"],
        ["それ", "sore"],
      ],
      [0, 1, 2, 3, 4],
    ),
    choice(
      "Które zdanie jest poprawne?",
      ["この車はわたしのです。", "これ車はわたしのです。", "この車はわたしです。"],
      0,
      "Przed 車 stoi この, a „mój” to わたしの.",
    ),
  ],
  points: [
    "この, その i あの stoją przed rzeczownikiem: この本, その車, あの人.",
    "Po の rzecz można pominąć: この本はわたしのです。",
    "O ludziach grzecznie: あのかた.",
  ],
  words: [w.kono, w.sono, w.ano, w.kata],
});

export const kokoSokoAsoko = grammarLesson({
  section,
  slug: "koko-soko-asoko",
  title: "ここ・そこ・あそこ",
  minutes: 10,
  lead: "ここ, そこ i あそこ to miejsca: „tutaj”, „tam przy tobie” i „tam daleko”. Pytasz o miejsce słowem どこ.",
  sentence: ex("ここは{大学|だいがく}です。", "Koko wa daigaku desu.", "Tu jest uniwersytet."),
  after: "To te same trzy stopnie odległości co w これ, それ i あれ, tylko dla miejsc.",
  patterns: [
    { pattern: ja("ここ は A です。", "Koko wa A desu."), meaning: "Tu jest A. To miejsce to A." },
    { pattern: ja("A は あそこ です。", "A wa asoko desu."), meaning: "A jest tam (daleko)." },
    { pattern: ja("A は どこ ですか。", "A wa doko desu ka."), meaning: "Gdzie jest A?" },
  ],
  explanation:
    "Możesz powiedzieć, czym jest miejsce: ここは大学です。 znaczy „Tu jest uniwersytet”.\n\nAlbo gdzie coś jest: トイレはあそこです。 znaczy „Toaleta jest tam”.\n\nO miejsce pytasz słowem どこ: えきはどこですか。 znaczy „Gdzie jest stacja?”. W odpowiedzi どこ zamieniasz na ここ, そこ albo あそこ.",
  examples: [
    ex("ここは{大学|だいがく}です。", "Koko wa daigaku desu.", "Tu jest uniwersytet."),
    ex("ここはきょうしつです。", "Koko wa kyōshitsu desu.", "To jest sala lekcyjna."),
    ex("トイレはどこですか。", "Toire wa doko desu ka.", "Gdzie jest toaleta?"),
    ex("トイレはあそこです。", "Toire wa asoko desu.", "Toaleta jest tam."),
    ex("かばんはそこです。", "Kaban wa soko desu.", "Torba jest tam, przy tobie."),
    ex("えきはどこですか。", "Eki wa doko desu ka.", "Gdzie jest stacja?"),
  ],
  exercises: [
    choice(
      "Jak zapytasz: „Gdzie jest toaleta?”",
      ["トイレはどこですか。", "トイレはどれですか。", "トイレはだれですか。"],
      0,
      "どこ pyta o miejsce.",
    ),
    choice(
      "Toaleta jest daleko od was obu. Co odpowiesz?",
      ["あそこです。", "ここです。", "そこです。"],
      0,
      "Miejsce daleko od was obu to あそこ.",
    ),
    build(
      "Tu jest uniwersytet.",
      [
        ["ここ", "koko"],
        ["は", "wa"],
        ["{大学|だいがく}", "daigaku"],
        ["です", "desu"],
        ["あそこ", "asoko"],
      ],
      [0, 1, 2, 3],
    ),
    choice(
      "Co znaczy かばんはそこです。",
      ["Torba jest tam, przy tobie.", "Torba jest tutaj.", "Gdzie jest torba?"],
      0,
      "そこ to miejsce przy rozmówcy.",
    ),
  ],
  points: [
    "ここ to tutaj, そこ to tam przy tobie, あそこ to tam daleko.",
    "Mówisz, gdzie coś jest: トイレはあそこです。",
    "Pytasz o miejsce: えきはどこですか。",
  ],
  words: [w.koko, w.soko, w.asoko, w.doko, w.daigaku, w.kyoshitsu],
});

export const dareDoreDoko = grammarLesson({
  section,
  slug: "dare-dore-doko",
  title: "だれ・どれ・どこ",
  minutes: 12,
  lead: "Pytania zaczynające się od ど i だ: だれ to „kto”, どれ to „który”, どこ to „gdzie”. Zaczniesz od pytania o imię.",
  sentence: ex("お{名前|なまえ}は{何|なん}ですか。", "O-namae wa nan desu ka.", "Jak się nazywasz?"),
  after: "お przed 名前 dodaje grzeczności, gdy pytasz o czyjeś imię. O swoim imieniu mówisz bez お.",
  patterns: [
    { pattern: ja("A は だれ ですか。", "A wa dare desu ka."), meaning: "Kim jest A?" },
    { pattern: ja("A は どれ ですか。", "A wa dore desu ka."), meaning: "Który to A? (z kilku rzeczy)" },
    { pattern: ja("A は どこ ですか。", "A wa doko desu ka."), meaning: "Gdzie jest A?" },
  ],
  explanation:
    "だれ pyta o osobę. Grzeczniej brzmi どなた: あのかたはどなたですか。\n\nどれ pyta, która z kilku rzeczy: あなたのかさはどれですか。 Odpowiadasz これ, それ albo あれ.\n\nどこ pyta o miejsce. お国はどこですか。 to grzeczne „Skąd pan pochodzi?”, dosłownie „Gdzie jest pana kraj?”.",
  examples: [
    ex("お{名前|なまえ}は{何|なん}ですか。", "O-namae wa nan desu ka.", "Jak się nazywasz?"),
    ex("あのかたはどなたですか。", "Ano kata wa donata desu ka.", "Kim jest tamta osoba?"),
    ex("あなたのかさはどれですか。", "Anata no kasa wa dore desu ka.", "Który parasol jest twój?"),
    ex("わたしのかさはあれです。", "Watashi no kasa wa are desu.", "Mój parasol to tamten."),
    ex("お{国|くに}はどこですか。", "O-kuni wa doko desu ka.", "Skąd pan pochodzi?"),
    ex("ポーランドです。", "Pōrando desu.", "Z Polski."),
  ],
  exercises: [
    choice("Pytasz o osobę. Którego słowa użyjesz?", ["だれ", "どれ", "どこ"], 0, "だれ to „kto”."),
    choice(
      "Na stole leżą trzy długopisy. Jak zapytasz, który jest twojego rozmówcy?",
      ["あなたのペンはどれですか。", "あなたのペンはどこですか。", "あなたのペンはだれですか。"],
      0,
      "どれ pyta, która z kilku rzeczy.",
    ),
    build(
      "Skąd pan pochodzi?",
      [
        ["お{国|くに}", "o-kuni"],
        ["は", "wa"],
        ["どこ", "doko"],
        ["ですか", "desu ka"],
        ["だれ", "dare"],
      ],
      [0, 1, 2, 3],
    ),
    choice(
      "Co znaczy お名前は何ですか。",
      ["Jak się nazywasz?", "Skąd jesteś?", "Kim jest tamta osoba?"],
      0,
      "名前 to „imię”. お dodaje grzeczności.",
    ),
  ],
  points: [
    "だれ (grzecznie どなた) to „kto”: あのかたはどなたですか。",
    "どれ to „który z kilku”: あなたのかさはどれですか。",
    "どこ to „gdzie”: お国はどこですか。",
  ],
  words: [w.dore, w.donata, w.namae, w.kuni],
});

export const toITamtoTest = grammarTest(section, "To i tamto", [
  choice("Książka leży przy tobie. Co powiesz?", ["これは本です。", "それは本です。", "あれは本です。"], 0, "Rzecz przy mówiącym to これ."),
  choice("Uzupełnij: ＿車はわたしのです。 (samochód daleko od was)", ["あの", "あれ", "あそこ"], 0, "Przed rzeczownikiem stoi あの."),
  choice("Co znaczy それは何ですか。", ["Co to (przy tobie) jest?", "Gdzie to jest?", "Czyje to jest?"], 0, "それ to rzecz przy rozmówcy, 何 to „co”."),
  choice("Jak zapytasz: „Gdzie jest stacja?”", ["えきはどこですか。", "えきはどれですか。", "えきは何ですか。"], 0, "どこ pyta o miejsce."),
  choice("Co znaczy トイレはあそこです。", ["Toaleta jest tam.", "To jest toaleta.", "Gdzie jest toaleta?"], 0, "あそこ to „tam, daleko”."),
  choice("Uzupełnij: あなたのかさは＿ですか。 (który z kilku?)", ["どれ", "だれ", "どこ"], 0, "どれ pyta, która z kilku rzeczy."),
  choice("Jak grzecznie zapytasz: „Kim jest tamta osoba?”", ["あのかたはどなたですか。", "あれはだれですか。", "あのかたはどこですか。"], 0, "あのかた i どなた to grzeczne formy."),
  choice("Co znaczy お国はどこですか。", ["Skąd pan pochodzi?", "Gdzie pan mieszka?", "Jak się pan nazywa?"], 0, "国 to „kraj”."),
  choice("Które zdanie jest poprawne?", ["このペンはわたしのです。", "これペンはわたしのです。", "このはペンです。"], 0, "この zawsze stoi przed rzeczownikiem."),
  choice("Kolega trzyma torbę i pyta: これはだれのかばんですか。 To twoja torba. Co odpowiesz?", ["それはわたしのです。", "これはわたしのです。", "あれはわたしのです。"], 0, "Torba jest przy nim, więc mówisz それ."),
]);
