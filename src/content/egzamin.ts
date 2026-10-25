/** Facts about JLPT N5 shown on the site. Checked against jlpt.jp on checkedAt; update here, nowhere else. */
export const egzaminFacts = {
  checkedAt: "2026-10-25",
  levels: 5,
  months: ["lipiec", "grudzień"],
  parts: [
    { name: "Słownictwo", scope: "zapis i znaczenie słów, kanji z czytaniem", minutes: 20 },
    { name: "Gramatyka i czytanie", scope: "budowa zdań, krótkie teksty", minutes: 40 },
    { name: "Słuchanie", scope: "krótkie rozmowy i polecenia", minutes: 30 },
  ],
  scores: {
    knowledgeReading: { max: 120, min: 38 },
    listening: { max: 60, min: 19 },
    total: { max: 180, pass: 80 },
  },
  poland: {
    cities: ["Warszawa", "Gdańsk"],
    host: "Polsko-Japońska Akademia Technik Komputerowych",
    // Not confirmed for Poland yet; pages then say the organiser publishes dates and fees.
    nextDate: null as string | null,
  },
  sources: [
    { label: "JLPT: części egzaminu i czas", url: "https://www.jlpt.jp/e/guideline/testsections.html" },
    { label: "JLPT: wyniki i progi zaliczenia", url: "https://www.jlpt.jp/e/guideline/results.html" },
    { label: "JLPT: miejsca egzaminu poza Japonią", url: "https://www.jlpt.jp/e/application/overseas_list.html" },
  ],
};
