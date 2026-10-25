import type { Metadata } from "next";
import { TextPage } from "@/components/shell/TextPage";

export const metadata: Metadata = { title: "Regulamin" };

export default function RegulaminPage() {
  return (
    <TextPage title="Regulamin">
      <p>Treść regulaminu do uzupełnienia przez autora strony.</p>
      <p>
        Do tego czasu: Nihongo PL to bezpłatny kurs do samodzielnej nauki. Korzystasz z niego na własną odpowiedzialność, a
        treść lekcji może się zmieniać.
      </p>
    </TextPage>
  );
}
