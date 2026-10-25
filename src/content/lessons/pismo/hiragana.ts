import { w } from "../words";
import { pismoLesson, readQuestion } from "./make";

export const hiraganaLessons = [
  pismoLesson({
    script: "hiragana",
    slug: "a-ko",
    title: "あ–お i か–こ",
    minutes: 20,
    chars: ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"],
    words: [w.ao, w.aka, w.ie, w.ue, w.kao, w.koe],
    questions: [
      readQuestion(w.kao, ["kai", "koe"], "か to ka, お to o."),
      readQuestion(w.ie, ["ii", "ei"], "い to i, え to e."),
      readQuestion(w.koe, ["kae", "kue"], "こ to ko, え to e."),
    ],
    points: [
      "Znasz pięć samogłosek: あ a, い i, う u, え e, お o.",
      "Rząd K powstaje z k i samogłoski: か ka, き ki, く ku, け ke, こ ko.",
      "Czytasz już słowa あお, いえ i かお.",
    ],
  }),
  pismoLesson({
    script: "hiragana",
    slug: "sa-to",
    title: "さ–そ i た–と",
    minutes: 20,
    chars: ["さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と"],
    words: [w.asa, w.shita, w.soto, w.kutsu, w.chikatetsu, w.takai],
    questions: [
      readQuestion(w.shita, ["sita", "shito"], "し czytasz shi, a nie si."),
      readQuestion(w.kutsu, ["kutsa", "kuto"], "つ czytasz tsu."),
      readQuestion(w.soto, ["sato", "sote"], "そ to so, と to to."),
    ],
    points: [
      "W rzędzie S jest wyjątek: し czytasz shi.",
      "W rzędzie T są dwa wyjątki: ち chi i つ tsu.",
      "Czytasz już słowa あさ, そと i ちかてつ.",
    ],
  }),
  pismoLesson({
    script: "hiragana",
    slug: "na-ho",
    title: "な–の i は–ほ",
    minutes: 20,
    chars: ["な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ"],
    words: [w.neko, w.inu, w.natsu, w.hito, w.fune, w.hoshi],
    questions: [
      readQuestion(w.neko, ["nako", "nuko"], "ね to ne, こ to ko."),
      readQuestion(w.fune, ["hune", "funa"], "ふ czytasz fu, z lekkim, miękkim f."),
      readQuestion(w.hoshi, ["hosi", "hashi"], "ほ to ho, し to shi."),
    ],
    points: [
      "ふ czytasz fu: wargi prawie się nie dotykają.",
      "は czytasz ha, ale jako partykuła brzmi wa. Poznasz ją w kursie gramatyki.",
      "Czytasz już słowa ねこ, いぬ i ひと.",
    ],
  }),
  pismoLesson({
    script: "hiragana",
    slug: "ma-yo",
    title: "ま–も i や・ゆ・よ",
    minutes: 20,
    chars: ["ま", "み", "む", "め", "も", "や", "ゆ", "よ"],
    words: [w.mimi, w.me, w.mono, w.yama, w.yuki, w.yomu],
    questions: [
      readQuestion(w.yama, ["yuma", "mama"], "や to ya, ま to ma."),
      readQuestion(w.yuki, ["yoki", "yuku"], "ゆ to yu, き to ki."),
      readQuestion(w.yomu, ["yumu", "yome"], "よ to yo, む to mu."),
    ],
    points: [
      "Rząd Y ma tylko trzy znaki: や ya, ゆ yu, よ yo.",
      "め i ぬ łatwo pomylić: ぬ ma pętelkę na końcu.",
      "Czytasz już słowa やま, ゆき i よむ.",
    ],
  }),
  pismoLesson({
    script: "hiragana",
    slug: "ra-n",
    title: "ら–ろ, わ, を, ん",
    minutes: 20,
    chars: ["ら", "り", "る", "れ", "ろ", "わ", "を", "ん"],
    words: [w.haru, w.kuruma, w.sakura, w.kawa, w.kuroi, w.mikan],
    questions: [
      readQuestion(w.kuruma, ["kurama", "koruma"], "る to ru, ま to ma."),
      readQuestion(w.kawa, ["kowa", "kara"], "か to ka, わ to wa."),
      readQuestion(w.mikan, ["mikon", "makan"], "ん na końcu słowa to samo n."),
    ],
    points: [
      "Japońskie r brzmi między polskim r i l: jedno lekkie uderzenie języka.",
      "を czytasz o i używasz go tylko jako partykuły.",
      "ん to jedyny znak, który jest samą spółgłoską: n.",
      "Znasz już całą podstawową hiraganę: 46 znaków.",
    ],
  }),
  pismoLesson({
    script: "hiragana",
    slug: "dakuten",
    title: "Dźwięczne i małe znaki",
    minutes: 25,
    chars: ["が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "だ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
    quiz: ["が", "ご", "じ", "ず", "だ", "で", "ば", "ぶ", "ぱ", "ぽ"],
    words: [w.kagi, w.ginko, w.densha, w.kippu, w.chizu, w.ryoko, w.ringo],
    questions: [
      readQuestion(w.kippu, ["kipu", "kitsupu"], "Małe っ podwaja następną spółgłoskę: kippu."),
      readQuestion(w.densha, ["densya", "denshiya"], "しゃ to jedna sylaba: sha."),
      readQuestion(w.ryoko, ["riyoko", "ryoku"], "りょ to jedna sylaba: ryo. Ostatnie う wydłuża o."),
    ],
    points: [
      "Dwie kreski ゛ udźwięczniają: か ka → が ga, さ sa → ざ za, た ta → だ da, は ha → ば ba.",
      "Kółko ゜ zmienia h w p: は ha → ぱ pa.",
      "Małe ゃ ゅ ょ łączą się z poprzednim znakiem w jedną sylabę: き + ゃ = きゃ kya.",
      "Małe っ podwaja następną spółgłoskę: きっぷ kippu.",
    ],
  }),
];
