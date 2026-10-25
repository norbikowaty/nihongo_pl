import type { Metadata } from "next";
import { TextPage } from "@/components/shell/TextPage";

export const metadata: Metadata = { title: "Licencje i źródła" };

export default function LicencjePage() {
  return (
    <TextPage title="Licencje i źródła">
      <p>Treść kursu opiera się na otwartych źródłach. Dziękujemy ich autorom.</p>
      <h2>Słownictwo</h2>
      <p>
        Słowa, czytania i znaczenia są sprawdzane w słowniku{" "}
        <a href="https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project">JMdict</a> grupy Electronic Dictionary
        Research and Development Group, na licencji{" "}
        <a href="https://www.edrdg.org/edrdg/licence.html">CC BY-SA 4.0</a>, w wersji przygotowanej przez projekt{" "}
        <a href="https://github.com/scriptin/jmdict-simplified">jmdict-simplified</a>.
      </p>
      <h2>Kanji</h2>
      <p>
        Odczyty i liczba kresek kanji pochodzą z{" "}
        <a href="https://www.edrdg.org/wiki/index.php/KANJIDIC_Project">KANJIDIC2</a> (EDRDG, CC BY-SA 4.0).
      </p>
      <h2>Kolejność kresek</h2>
      <p>
        Rysunki kolejności kresek pochodzą z projektu <a href="https://kanjivg.tagaini.net">KanjiVG</a> Ulricha Apla, na
        licencji <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.
      </p>
      <h2>Fonty</h2>
      <p>Source Serif 4 i Noto Serif JP, na licencji SIL Open Font License 1.1.</p>
    </TextPage>
  );
}
