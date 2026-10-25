import type { Metadata } from "next";
import { TextPage } from "@/components/shell/TextPage";

export const metadata: Metadata = { title: "Polityka prywatności" };

export default function PrywatnoscPage() {
  return (
    <TextPage title="Polityka prywatności">
      <p>Strona nie ma kont użytkowników i nie zbiera danych osobowych.</p>
      <h2>Co zapisuje strona</h2>
      <p>
        Postęp w lekcjach, powtórki, notatki, wybrany tryb nocny i poziom pomocy w czytaniu zapisują się wyłącznie w
        pamięci Twojej przeglądarki (localStorage). Nie trafiają na żaden serwer. Wyczyszczenie danych przeglądarki usuwa
        je bezpowrotnie.
      </p>
      <h2>Do uzupełnienia</h2>
      <p>Pełna polityka prywatności zostanie dodana przed wprowadzeniem kont użytkowników.</p>
    </TextPage>
  );
}
