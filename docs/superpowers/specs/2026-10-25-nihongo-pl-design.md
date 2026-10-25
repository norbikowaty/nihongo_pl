# Nihongo PL — projekt strony (etap 1: podgląd lokalny)

Data: 2026-10-25 · Status: zaakceptowany

## 1. Po co i dla kogo

Polskojęzyczny serwis do samodzielnej nauki japońskiego, w pierwszej wersji obejmujący cały zakres egzaminu **JLPT N5**. Ma działać jak kurs: wchodzisz, kontynuujesz lekcję, robisz powtórki. Ma zachęcać do nauki i nie nudzić, ale bez fajerwerków: spokojna, przejrzysta strona w stylu podręcznika.

Odbiorca: osoba ucząca się od zera, po polsku, najczęściej sama, na komputerze i telefonie.

## 2. Cele, nie-cele, anty-cele

**Cele etapu 1**
- Działająca lokalnie i na Vercelu strona z pełną strukturą serwisu: strona główna, Kursy, lekcja krok po kroku, Powtórki, Słownik, Kana, Egzamin, strony prawne.
- Kompletny kurs Pisma (hiragana i katakana) oraz pierwszy dział Gramatyki (4 lekcje i test) jako treść wzorcowa. Pozostałe lekcje są widoczne w spisie jako „wkrótce”.
- Postęp i powtórki zapisywane w przeglądarce (localStorage), w strukturze gotowej do późniejszej synchronizacji z kontem.
- Tryb nocny, pomoc w czytaniu na trzech poziomach (bez pomocy / furigana / furigana i rōmaji), responsywność od 360 px.

**Nie-cele etapu 1**
- Konta użytkowników i baza danych (etap 2, §10).
- Pełna treść wszystkich 36 lekcji gramatyki, 771 słów i 100 kanji (osobna praca nad treścią, kolejne etapy).
- Nagrania audio (przyciski odtwarzania są w interfejsie, ale bez dźwięku; §11).
- Poziomy N4 i wyżej.

**Anty-cele** (to byłaby porażka, nawet gdyby działało)
- Strona wyglądająca jak reklama, landing page albo projekt do portfolio. Pierwszy ekran ma służyć nauce.
- Jedna długa, przewijana strona zamiast osobnych podstron.
- „AI-owe” ozdobniki: szare podpisy pod wszystkim, etykiety nad nagłówkami, gradienty, emoji, kafelki z ikonkami.
- Gamifikacja w stylu płomyków i maskotek.
- Błędy w japońskiej treści (złe czytania, złe tłumaczenia).

## 3. Ograniczenia

- Hosting: **Vercel**. Repozytorium: https://github.com/norbikowaty/nihongo_pl (puste, założone przez właściciela).
- Commity: same krótkie tytuły, wyłącznie pod nazwiskiem właściciela, bez dopisków o asystencie.
- Język interfejsu: polski. Tekst japoński zawsze w kana i kanji, rōmaji tylko jako pomoc.
- Brak własnej bazy danych w etapie 1.

## 4. Wygląd (ustalone)

Wzorzec: prototyp **„Shu, wersja 2”** na kanwie: https://claude.ai/artifact/1ygNcLYpVutmtEnLddQuFi (strona „Shu: wersja 2”).

- **Nazwa i znak:** „Nihongo PL”, obok znak 日本語 w czerwonym prostokącie (kolor akcentu).
- **Kroje pisma:** Source Serif 4 (tekst i nagłówki) i Noto Serif JP (japoński).
- **Kolory (tokeny):**

| Token | Jasny | Ciemny |
|---|---|---|
| tło `bg` | #f7f7f6 | #141414 |
| powierzchnia `sf` | #ffffff | #1e1e1e |
| tekst `ink` | #171717 | #ededed |
| tekst pomocniczy `mu` | #585858 | #a6a6a6 |
| linie `ln` | #e4e4e2 | #2e2e2e |
| akcent shu `ac` | #b23a24 | #ff7b5e |
| tło akcentu `as` | #f7e7e3 | #3a221d |
| tekst na akcencie `aci` | #ffffff | #1a0e0b |
| poprawnie `ok` | #2c6e49 | #7fd3a1 |

- Styl „japońskiego ucznia” (zeszyt, czerwony długopis, hanko) jest **odłożony** do czasu, gdy strona będzie w pełni działać.
- Bez gradientów, cieni na spoczynkowych elementach, emoji i etykiet nad nagłówkami. Kontrast tekstu co najmniej 4.5:1 w obu trybach.

## 5. Struktura serwisu

Nagłówek: znak + nazwa · Strona główna · Kursy · Powtórki · Słownik · Kana · Egzamin · przełącznik pomocy w czytaniu · tryb nocny · konto (w etapie 1 nieaktywne).

| Adres | Ekran | Zawartość |
|---|---|---|
| `/` | Strona główna | Blok „Dziś” (lekcja do kontynuowania + liczba powtórek), 4 skróty (Tabela kana, Słownik N5, Lista kanji, Gramatyka w pigułce), blok „Egzamin JLPT N5” z linkiem. **Bez spisu kursów.** Dla nowej osoby zamiast „kontynuuj” jest „Zacznij od hiragany”. |
| `/kursy` | Spis kursów | 6 kursów jako rozwijane sekcje (rozwinięty bieżący), działy i lekcje, oznaczenia: ukończona ✓, bieżąca ●, czas lekcji. |
| `/kursy/[kurs]/[lekcja]` | Lekcja | 5 kroków (Wprowadzenie, Wzór, Przykłady, Ćwiczenie, Podsumowanie), pasek kroków, Wstecz / Dalej, panel boczny „Słowa w tej lekcji” i „Twoja notatka”. |
| `/powtorki` | Powtórki | Sesja fiszek z oceną: Znowu / Trudne / Dobrze / Łatwe. |
| `/slownik` | Słownik | Lista słów z wyszukiwarką i filtrem tematów. |
| `/kana` | Tabela kana | Hiragana i katakana z rōmaji, przełącznik między pismami. |
| `/egzamin` | Egzamin JLPT N5 | Czym jest JLPT, części i czasy, progi zaliczenia, terminy i zapisy w Polsce, FAQ (§8). |
| `/regulamin`, `/prywatnosc`, `/kontakt` | Strony prawne | Szablony do uzupełnienia przez właściciela. |

**Stopka** na każdej stronie: znak i nazwa z jednym zdaniem opisu · Regulamin · Polityka prywatności · Kontakt · „Autor: norbikowaty” z linkiem do https://github.com/norbikowaty · © 2026 Nihongo PL.

## 6. Zachowania (ustalone)

- **Nagłówek:** przyklejony u góry (`sticky`). Przy przewijaniu w dół chowa się dopiero po ok. 140 px przewinięcia w dół, a przy przewijaniu w górę wraca po ok. 70 px, bez wracania na samą górę. W pobliżu góry strony (pierwsze 80 px) jest zawsze widoczny. Animacja przesunięcia ok. 0,28 s, przy `prefers-reduced-motion` bez animacji.
- **Przejście na inną stronę zawsze zaczyna się od góry.** Zmiana kroku w lekcji przewija do początku lekcji.
- **Tryb nocny:** domyślnie według systemu, przełącznik zapamiętany, bez mignięcia przy ładowaniu.
- **Pomoc w czytaniu:** 漢字 (bez pomocy) / ふりがな / rōmaji. Furigana przez `<ruby>`, rōmaji pod zdaniem, słowem i klockiem ćwiczenia. Ustawienie zapamiętane osobno dla kursu Pisma (domyślnie rōmaji) i dla pozostałych kursów (domyślnie furigana).
- **Lekcja:** krok jest w adresie (`?krok=3`), więc odświeżenie strony nie gubi miejsca. Ukończenie podsumowania oznacza lekcję jako ukończoną i dodaje jej słowa i znaki do powtórek.
- **Ćwiczenia w etapie 1:** układanie zdania z klocków, wybór jednej odpowiedzi i rozpoznawanie kana. Każde daje natychmiastową informację: dobrze albo poprawna odpowiedź z krótkim wyjaśnieniem.

## 7. Podział kursów

| Kurs | Zakres | Etap 1 |
|---|---|---|
| Pismo: hiragana i katakana | 12 lekcji (6 + 6) | cały |
| Gramatyka N5 | 9 działów × 4 lekcje + test działu | dział 1 |
| Słownictwo N5 | 16 tematów, ok. 771 słów | temat 1 (słowa z lekcji) |
| Kanji N5 | 10 zestawów po 10 | zestaw 1 (liczby) |
| Czytanie i słuchanie | 12 lekcji | tylko w spisie |
| Egzamin próbny N5 | 3 arkusze (20 + 40 + 30 min) | tylko w spisie |

Pełna lista działów i lekcji jest w prototypie (zakładka Kursy) i trafi do danych kursu 1:1.

## 8. Strona „Egzamin” — fakty i źródła

- Części N5: słownictwo 20 min, gramatyka i czytanie 40 min, słuchanie 30 min, razem 90 min ([jlpt.jp](https://www.jlpt.jp/e/guideline/testsections.html)).
- Punkty: wiedza językowa i czytanie 0–120 (minimum 38), słuchanie 0–60 (minimum 19), łącznie co najmniej 80 ze 180 ([jlpt.jp](https://www.jlpt.jp/e/guideline/results.html)).
- Polska: Warszawa (Polsko-Japońska Akademia Technik Komputerowych) i Gdańsk na liście JLPT ([jlpt.jp](https://www.jlpt.jp/e/application/overseas_list.html)). **Do potwierdzenia:** które terminy (lipiec / grudzień) są w którym mieście, data najbliższego terminu, opłata i daty zapisów.
- Każdy fakt ze strony Egzamin trzymamy w jednym pliku danych z datą sprawdzenia, żeby łatwo go aktualizować.

## 9. Architektura (etap 1)

- **Next.js (App Router) + TypeScript**, strony treści generowane statycznie.
- **Tailwind CSS v4**, tokeny z §4 jako zmienne CSS przełączane klasą na `<html>`, **next-themes** dla trybu nocnego.
- **next/font**: Source Serif 4 i Noto Serif JP (bez preloadu pełnego zestawu znaków JP).
- **Treść w repozytorium:** lekcje, kana, słowa, kanji i spis kursów jako typowane dane TypeScript, sprawdzane schematem **zod** w testach i przy budowaniu. Błąd w danych przerywa budowanie. Zmiana względem pierwszej propozycji (MDX): lekcja to stałe 5 kroków z ćwiczeniami, a w danych łatwiej to sprawdzać niż w MDX. Prosty tekst w lekcjach nadal pisze się jak zwykłe zdania; japońskie fragmenty dostają właściwy font automatycznie.
- **Powtórki:** algorytm **FSRS** (`ts-fsrs`).
- **Postęp:** jeden zapis w localStorage z wersją schematu, np. `{ version, settings, lessons: { [id]: { status, step, updatedAt } }, cards: { [id]: { fsrs, updatedAt } } }`. Stałe identyfikatory (`gramatyka/pierwsze-zdania/wa-desu`, `kana/hiragana/ka`), czasy w ISO i `updatedAt` w każdym rekordzie umożliwią później scalenie z kontem.
- **Testy:** Vitest (logika powtórek, postęp, walidacja danych) i Playwright (przejście lekcji, przełączniki, zachowanie nagłówka i przewijania).
- **Jakość:** dostępność (prawdziwe przyciski i linki, focus, `aria`), telefon od 360 px z menu w szufladzie, Lighthouse ≥ 90.

## 10. Etap 2: konta (propozycja, bez własnej bazy)

Rekomendacja: **Clerk** (logowanie) + **Neon Postgres** (darmowy plan), oba dodawane z Vercel Marketplace. Nie trzeba stawiać ani utrzymywać serwera, a klucze trafiają do projektu automatycznie. Przy pierwszym logowaniu postęp z przeglądarki jest przenoszony na konto. Alternatywa: Supabase (konto i baza w jednym, osobna rejestracja). Odradzam trzymanie postępu w metadanych użytkownika Clerka, bo ich limit (ok. 8 KB) nie wystarczy na kilkaset kart powtórek. Decyzja zapadnie po akceptacji etapu 1.

## 11. Treść i licencje

- Słownictwo, kanji i zdania przykładowe opieramy na otwartych źródłach: JMdict i KANJIDIC2 (CC BY-SA, EDRDG), Tatoeba (CC BY). Na stronie będzie podstrona z podziękowaniami i licencjami.
- JLPT od 2010 r. nie publikuje oficjalnych list słów i kanji, więc listy N5 to listy przybliżone. Strona mówi „około 800 słów” i „około 100 kanji”.
- Właściciel akceptuje brak zewnętrznej korekty na poziomie N5. Warunek: każde słowo, czytanie i znaczenie bierzemy z najlepszego dostępnego źródła (JMdict/KANJIDIC2 przez EDRDG, kolejność kresek z KanjiVG), a nie z pamięci.
- Audio: w kolejnym etapie nagrania z syntezy mowy, wygenerowane raz i trzymane w Vercel Blob.

## 12. Pozostawione wykonawcy

Dokładne komponenty i podział na pliki, wersje bibliotek, treść stron prawnych (jako szablony), drobne odstępy i rozmiary w ramach tokenów z §4, wygląd szuflady menu na telefonie zgodny ze stylem prototypu.

## 13. Decyzje podjęte przeze mnie (do sprawdzenia)

1. Zakres etapu 1: pełny kurs Pisma + dział 1 Gramatyki, reszta jako „wkrótce”.
2. Polskie adresy podstron (`/kursy`, `/powtorki`, `/egzamin`…).
3. Krok lekcji w adresie (`?krok=`).
4. Osobne zapamiętywanie pomocy w czytaniu dla Pisma i dla reszty kursów.
5. Lekcja kursu Pisma ma te same 5 kroków, ale z inną treścią: Nowe znaki (rōmaji, skojarzenie, kolejność kresek z KanjiVG, CC BY-SA), Rozpoznawanie, Słowa z tymi znakami, Ćwiczenie, Podsumowanie.
6. Skróty ze strony głównej: Tabela kana → `/kana`, Słownik N5 → `/slownik`, Lista kanji → `/slownik?typ=kanji`, Gramatyka w pigułce → kurs Gramatyki w `/kursy`.
7. Ikona konta w nagłówku jest ukryta do etapu 2. Powtórki bez żadnych kart pokazują stan pusty z linkiem do pierwszej lekcji.
8. Pliki robocze w projekcie: `.taste-skill/` trafia do `.gitignore`. Folder `assets/` z drzeworytami Hiroshigego nie jest używany w wybranym projekcie i zostanie usunięty przed pierwszym commitem, chyba że właściciel chce go zatrzymać.
