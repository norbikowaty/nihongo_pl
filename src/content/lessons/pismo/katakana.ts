import { w } from "../words";
import { pismoLesson, readQuestion } from "./make";

export const katakanaLessons = [
  pismoLesson({
    script: "katakana",
    slug: "a-ko",
    title: "ア–オ i カ–コ",
    minutes: 20,
    chars: ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"],
    words: [w.keki, w.kokoa, w.kiui],
    questions: [
      readQuestion(w.keki, ["keke", "kaki"], "ー wydłuża poprzednią samogłoskę: kēki."),
      readQuestion(w.kokoa, ["kakoa", "kokoi"], "コ to ko, ア to a."),
    ],
    points: [
      "Katakaną zapisuje się słowa z innych języków, np. ケーキ (cake).",
      "Kreska ー wydłuża samogłoskę przed nią: ケー to kē.",
      "Te same dźwięki co w hiraganie, inne kształty: あ a → ア a.",
    ],
  }),
  pismoLesson({
    script: "katakana",
    slug: "sa-to",
    title: "サ–ソ i タ–ト",
    minutes: 20,
    chars: ["サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト"],
    quiz: ["サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト"],
    words: [w.takushi, w.suki, w.tesuto, w.seta],
    questions: [
      readQuestion(w.tesuto, ["tesoto", "tasuto"], "テ to te, ス to su, ト to to."),
      readQuestion(w.takushi, ["takusi", "tokushī"], "シ czytasz shi, ー wydłuża i."),
    ],
    points: [
      "シ shi i ツ tsu różnią się kierunkiem kresek: w シ kreski idą bardziej poziomo.",
      "ソ so i ン n też łatwo pomylić. ン poznasz w lekcji 5.",
      "Czytasz już słowa タクシー, テスト i セーター.",
    ],
  }),
  pismoLesson({
    script: "katakana",
    slug: "na-ho",
    title: "ナ–ノ i ハ–ホ",
    minutes: 20,
    chars: ["ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ"],
    words: [w.noto, w.naifu, w.kohi, w.nekutai],
    questions: [
      readQuestion(w.naifu, ["naihu", "noifu"], "フ czytasz fu."),
      readQuestion(w.kohi, ["kohe", "kōhe"], "コー to kō, ヒー to hī."),
    ],
    points: [
      "ヘ he wygląda prawie tak samo jak へ w hiraganie.",
      "Długie samogłoski zawsze zapisujesz kreską ー: コーヒー kōhī.",
      "Czytasz już słowa ノート, ナイフ i コーヒー.",
    ],
  }),
  pismoLesson({
    script: "katakana",
    slug: "ma-yo",
    title: "マ–モ i ヤ・ユ・ヨ",
    minutes: 20,
    chars: ["マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ"],
    words: [w.memo, w.hamu, w.masuku],
    questions: [
      readQuestion(w.masuku, ["misuku", "masako"], "マ to ma, ス to su, ク to ku."),
      readQuestion(w.hamu, ["hami", "homu"], "ハ to ha, ム to mu."),
    ],
    points: [
      "ミ mi to trzy ukośne kreski, łatwo go zapamiętać.",
      "ユ yu i ヨ yo mają poziome kreski, ヤ ya jest podobne do や.",
      "Czytasz już słowa メモ, ハム i マスク.",
    ],
  }),
  pismoLesson({
    script: "katakana",
    slug: "ra-n",
    title: "ラ–ロ, ワ, ヲ, ン",
    minutes: 20,
    chars: ["ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン"],
    words: [w.hoteru, w.resutoran, w.kamera, w.ramen, w.metoru],
    questions: [
      readQuestion(w.hoteru, ["hotaru", "hoteri"], "テ to te, ル to ru."),
      readQuestion(w.resutoran, ["resutoron", "rasutoran"], "レ to re, ラン to ran."),
    ],
    points: [
      "Obce l i r zapisuje się tym samym rzędem: hotel → ホテル hoteru.",
      "ン n i ソ so różnią się ostatnią kreską: w ン idzie od dołu do góry.",
      "Znasz już całą podstawową katakanę: 46 znaków.",
    ],
  }),
  pismoLesson({
    script: "katakana",
    slug: "dakuten",
    title: "Dźwięczne znaki i słowa zapożyczone",
    minutes: 25,
    chars: ["ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"],
    quiz: ["ガ", "ゴ", "ジ", "ズ", "ダ", "ド", "バ", "ビ", "パ", "ポ"],
    words: [w.terebi, w.rajio, w.pan, w.basu, w.beddo, w.shatsu],
    questions: [
      readQuestion(w.beddo, ["bedo", "biddo"], "Małe ッ podwaja następną spółgłoskę: beddo."),
      readQuestion(w.shatsu, ["shitsu", "satsu"], "シャ to jedna sylaba: sha."),
    ],
    points: [
      "Znaki ゛ i ゜ działają tak samo jak w hiraganie: カ ka → ガ ga, ハ ha → パ pa.",
      "Małe ャ ュ ョ i ッ też: シャ sha, ベッド beddo.",
      "Czytasz już słowa テレビ, ラジオ, パン i バス.",
    ],
  }),
];
