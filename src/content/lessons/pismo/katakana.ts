import { w } from "../words";
import { pismoCourse, readQuestion } from "./make";

// The first lesson takes two rows: with vowels alone there are almost no katakana words to read.
// Where no N5 word can be built from the kana learned so far, the lesson reads words outside N5 (marked in words.ts).
export const katakanaLessons = pismoCourse("katakana", [
  {
    slug: "a-ko",
    title: "ア–オ i カ–コ",
    minutes: 20,
    chars: ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"],
    words: [w.keki, w.kokoa, w.kiui, w.oke],
    questions: [
      readQuestion(w.keki, ["keke", "kaki"], "ー wydłuża poprzednią samogłoskę: kēki."),
      readQuestion(w.kokoa, ["kakoa", "kokoi"], "コ to ko, ア to a."),
      readQuestion(w.oke, ["okē", "ōke"], "Każda kreska ー wydłuża samogłoskę przed nią: ōkē."),
    ],
    points: [
      "Katakaną zapisuje się słowa z innych języków, np. ケーキ (cake).",
      "Kreska ー wydłuża samogłoskę przed nią: ケー to kē.",
      "Te same dźwięki co w hiraganie, inne kształty: あ a → ア a.",
    ],
  },
  {
    slug: "sa-so",
    title: "サ・シ・ス・セ・ソ",
    minutes: 15,
    chars: ["サ", "シ", "ス", "セ", "ソ"],
    words: [w.suki, w.aisu, w.sosu, w.sakasu],
    questions: [
      readQuestion(w.aisu, ["aiso", "eisu"], "ア to a, イ to i, ス to su."),
      readQuestion(w.sosu, ["sōsa", "sūsu"], "ソ to so, ス to su."),
      readQuestion(w.sakasu, ["sakasu", "sākasa"], "ー po サ wydłuża a: sā."),
    ],
    points: [
      "W シ shi długa kreska idzie z dołu do góry. W podobnym ツ tsu (następna lekcja) idzie z góry w dół.",
      "ソ so ma tylko dwie kreski. Podobne ン n poznasz później.",
      "Czytasz już słowa アイス, スキー i ソース.",
    ],
  },
  {
    slug: "ta-to",
    title: "タ・チ・ツ・テ・ト",
    minutes: 15,
    chars: ["タ", "チ", "ツ", "テ", "ト"],
    words: [w.takushi, w.tesuto, w.seta, w.koto],
    questions: [
      readQuestion(w.tesuto, ["tesoto", "tasuto"], "テ to te, ス to su, ト to to."),
      readQuestion(w.takushi, ["takusi", "tokushī"], "シ czytasz shi, ー wydłuża i."),
      readQuestion(w.koto, ["koto", "kōte"], "コー to kō, ト to to."),
    ],
    points: [
      "シ shi i ツ tsu łatwo pomylić: w ツ krótkie kreski stoją pionowo, w シ leżą bardziej poziomo.",
      "Jak w hiraganie: チ czytasz chi, ツ czytasz tsu.",
      "Czytasz już słowa タクシー, テスト i セーター.",
    ],
  },
  {
    slug: "na-no",
    title: "ナ・ニ・ヌ・ネ・ノ",
    minutes: 15,
    chars: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    words: [w.tenisu, w.noto, w.nekutai, w.sukato],
    questions: [
      readQuestion(w.tenisu, ["tenesu", "tanisu"], "テ to te, ニ to ni, ス to su."),
      readQuestion(w.noto, ["nato", "nōte"], "ノー to nō, ト to to."),
      readQuestion(w.nekutai, ["nekutei", "nakutai"], "ネ to ne, タイ to tai."),
    ],
    points: [
      "ヌ nu i ス su łatwo pomylić: w ヌ druga kreska przecina pierwszą.",
      "ニ ni to dwie poziome kreski, jak w hiraganie に bez lewej części.",
      "Czytasz już słowa テニス, ノート i ネクタイ.",
    ],
  },
  {
    slug: "ha-ho",
    title: "ハ・ヒ・フ・ヘ・ホ",
    minutes: 15,
    chars: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    words: [w.naifu, w.kohi, w.hita],
    questions: [
      readQuestion(w.naifu, ["naihu", "noifu"], "フ czytasz fu."),
      readQuestion(w.kohi, ["kōhe", "kohī"], "コー to kō, ヒー to hī."),
      readQuestion(w.hita, ["hīte", "hēta"], "ヒー to hī, ター to tā."),
    ],
    points: [
      "ヘ he wygląda prawie tak samo jak へ w hiraganie.",
      "フ fu to jedna kreska z haczykiem.",
      "Długie samogłoski zawsze zapisujesz kreską ー: コーヒー kōhī.",
    ],
  },
  {
    slug: "ma-mo",
    title: "マ・ミ・ム・メ・モ",
    minutes: 15,
    chars: ["マ", "ミ", "ム", "メ", "モ"],
    words: [w.memo, w.hamu, w.masuku, w.tomato],
    questions: [
      readQuestion(w.masuku, ["misuku", "masako"], "マ to ma, ス to su, ク to ku."),
      readQuestion(w.hamu, ["hami", "homu"], "ハ to ha, ム to mu."),
      readQuestion(w.tomato, ["tomoto", "tamato"], "ト to to, マ to ma."),
    ],
    points: [
      "ミ mi to trzy ukośne kreski, łatwo go zapamiętać.",
      "メ me to dwie skrzyżowane kreski.",
      "Czytasz już słowa トマト, マスク i メモ.",
    ],
  },
  {
    slug: "ra-ro",
    title: "ラ・リ・ル・レ・ロ",
    minutes: 15,
    chars: ["ラ", "リ", "ル", "レ", "ロ"],
    words: [w.hoteru, w.kamera, w.toire, w.kurasu],
    questions: [
      readQuestion(w.hoteru, ["hotaru", "hoteri"], "テ to te, ル to ru."),
      readQuestion(w.kamera, ["kamora", "kemera"], "メ to me, ラ to ra."),
      readQuestion(w.kurasu, ["kurusu", "karasu"], "ク to ku, ラ to ra."),
    ],
    points: [
      "Obce l i r zapisuje się tym samym rzędem: hotel → ホテル hoteru.",
      "ロ ro to prosty kwadrat.",
      "Czytasz już słowa ホテル, カメラ i トイレ.",
    ],
  },
  {
    slug: "ya-n",
    title: "ヤ・ユ・ヨ・ワ・ヲ・ン",
    minutes: 20,
    chars: ["ヤ", "ユ", "ヨ", "ワ", "ヲ", "ン"],
    words: [w.resutoran, w.hankachi, w.wain, w.metoru],
    questions: [
      readQuestion(w.resutoran, ["resutoron", "rasutoran"], "レ to re, ラン to ran."),
      readQuestion(w.wain, ["wein", "wani"], "ワ to wa, イ to i, ン to n."),
      readQuestion(w.hankachi, ["hanchika", "honkachi"], "ハン to han, カ to ka, チ to chi."),
    ],
    points: [
      "ン n i ソ so różnią się ostatnią kreską: w ン idzie od dołu do góry.",
      "ヲ prawie się nie pojawia, bo partykułę を pisze się hiraganą.",
      "Znasz już całą podstawową katakanę: 46 znaków.",
    ],
  },
  {
    slug: "dakuten",
    title: "Dźwięczne znaki: ガ・ザ・ダ・バ",
    minutes: 25,
    chars: ["ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ"],
    quiz: ["ガ", "ギ", "ゴ", "ザ", "ジ", "ズ", "ダ", "デ", "ド", "バ", "ビ", "ブ"],
    words: [w.terebi, w.rajio, w.basu, w.doa, w.zubon, w.gita],
    questions: [
      readQuestion(w.terebi, ["terabi", "tereba"], "テ to te, レ to re, ビ to bi."),
      readQuestion(w.zubon, ["subon", "zobon"], "ズ to zu, ボ to bo, ン to n."),
      readQuestion(w.doa, ["toa", "dōa"], "ド to do, ア to a."),
    ],
    points: [
      "Znaki ゛ działają tak samo jak w hiraganie: カ ka → ガ ga, ハ ha → バ ba.",
      "Czytasz już słowa テレビ, ラジオ i ズボン.",
    ],
  },
  {
    slug: "handakuten",
    title: "パ–ポ i małe znaki",
    minutes: 25,
    chars: ["パ", "ピ", "プ", "ペ", "ポ", "キャ", "シュ", "チョ", "ジャ", "ジュ"],
    words: [w.pan, w.pen, w.beddo, w.shatsu, w.jusu],
    questions: [
      readQuestion(w.beddo, ["bedo", "biddo"], "Małe ッ podwaja następną spółgłoskę: beddo."),
      readQuestion(w.shatsu, ["shitsu", "satsu"], "シャ to jedna sylaba: sha."),
      readQuestion(w.jusu, ["jusu", "jūsa"], "ジュ to jedna sylaba: ju, a ー ją wydłuża."),
    ],
    points: [
      "Kółko ゜ zmienia h w p: ハ ha → パ pa.",
      "Małe ャ ュ ョ i ッ działają jak w hiraganie: シャ sha, ベッド beddo.",
      "Znasz już całą katakanę.",
    ],
  },
]);
