import type { Metadata } from "next";
import { TextPage } from "@/components/shell/TextPage";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <TextPage title="Kontakt">
      <p>
        Znalazłeś błąd w lekcji albo masz pomysł na stronę? Napisz zgłoszenie w repozytorium projektu na GitHubie:{" "}
        <a href="https://github.com/norbikowaty/nihongo_pl/issues">github.com/norbikowaty/nihongo_pl</a>.
      </p>
    </TextPage>
  );
}
