# Nihongo PL — etap 1 (podgląd lokalny) — plan budowy

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Działający lokalnie serwis Nihongo PL: pełna struktura stron, kurs Pisma i dział 1 Gramatyki, powtórki FSRS i postęp w przeglądarce, w wyglądzie „Shu, wersja 2”.

**Architecture:** Next.js App Router, strony treści generowane statycznie z typowanych danych w `src/content` (walidowanych zod przy budowaniu i w testach). Cały stan użytkownika to jeden zapis w localStorage, czytany przez `useSyncExternalStore`. Wygląd to tokeny CSS z trybem nocnym przez klasę `dark` na `<html>`.

**Tech Stack:** Next.js (najnowszy, App Router) · TypeScript · Tailwind CSS v4 · next-themes · zod · ts-fsrs · Vitest + Testing Library + jsdom · Playwright · tsx (skrypty).

**Spec:** `docs/superpowers/specs/2026-10-25-nihongo-pl-design.md` (wzorzec wizualny: prototyp „Shu, wersja 2” na https://claude.ai/artifact/1ygNcLYpVutmtEnLddQuFi).

## Global Constraints

- Commity: **tylko krótki tytuł**, bez treści, bez `Co-Authored-By`, bez wzmianek o asystencie. Autor z `git config` (norbikowaty).
- Repo: `https://github.com/norbikowaty/nihongo_pl.git`, gałąź `main`.
- Interfejs po polsku. Japoński zawsze w kana/kanji z `lang="ja"`; rōmaji tylko jako pomoc.
- Kolory wyłącznie z tokenów (spec §4). Kontrast tekstu ≥ 4.5:1 w obu trybach.
- Zakazane: gradienty, cienie na elementach w spoczynku, emoji, etykiety nad nagłówkami, jedna długa strona zamiast podstron.
- Fonty: Source Serif 4 (`latin`, `latin-ext`, bo polskie znaki) i Noto Serif JP (400, 600, `preload: false`).
- Każde słowo, czytanie i znaczenie w treści musi przejść weryfikację w JMdict (Task 8). Kolejność kresek z KanjiVG (CC BY-SA 3.0).
- Responsywność od 360 px bez poziomego przewijania strony.
- Spis kursów nie trafia na stronę główną.

## Review Focus

1. **Uszkodzony albo stary zapis w localStorage** (nie-JSON, inna `version`, brakujące pola): strona nie może się wywrócić, ładuje pusty postęp. Test w Task 4.
2. **localStorage niedostępny** (tryb prywatny, wyjątek przy `setItem`): strona działa, postęp trzymany w pamięci. Test w Task 4.
3. **Zły `?krok=`** (`0`, `9`, `abc`, brak): krok przycięty do 1–N, bez błędu. Test jednostkowy w Task 7, e2e w Task 9.
4. **Adres lekcji „wkrótce” albo nieistniejącej:** strona 404 z linkiem do Kursów, a nie wyjątek. Test e2e w Task 9.
5. **Niezgodność serwera z klientem przy postępie** (np. „Kontynuuj” kontra „Zacznij od hiragany”): serwer renderuje stan pustego postępu, klient podmienia po montowaniu bez ostrzeżeń hydracji. Test w Task 10.

---

## Struktura plików

```
src/
  app/
    layout.tsx                 # fonty, ThemeProvider, ReadingProvider, Header, Footer, ScrollToTop
    globals.css                # tokeny, klasy lv0/lv1/lv2, ruby, Tailwind
    page.tsx                   # strona główna
    kursy/page.tsx             # spis kursów
    kursy/[kurs]/[lekcja]/page.tsx
    powtorki/page.tsx
    slownik/page.tsx
    kana/page.tsx
    egzamin/page.tsx
    regulamin/page.tsx  prywatnosc/page.tsx  kontakt/page.tsx  licencje/page.tsx
    not-found.tsx
  components/
    shell/   Header.tsx  Footer.tsx  ThemeToggle.tsx  ReadingSwitch.tsx  MobileMenu.tsx  ScrollToTop.tsx
    ja/      Ja.tsx  Prose.tsx
    lesson/  LessonPlayer.tsx  StepBar.tsx  steps/*.tsx  exercises/SentenceBuilder.tsx  Choice.tsx  KanaQuiz.tsx  LessonAside.tsx
    review/  ReviewSession.tsx
    courses/ CourseToc.tsx
    home/    TodayBlock.tsx
  lib/
    header-visibility.ts  progress/schema.ts  progress/store.ts  progress/useProgress.ts
    srs.ts  reading.ts  prose.ts  lessons.ts
  content/
    schema.ts  catalog.ts  kana.ts  egzamin.ts
    lessons/pismo/*.ts  lessons/gramatyka/*.ts  lessons/index.ts
scripts/  verify-words.ts  fetch-kanjivg.ts
public/kanjivg/*.svg
tests/unit/*.test.ts(x)   tests/e2e/*.spec.ts
```

---

### Task 1: Szkielet projektu, tokeny, repozytorium

**Files:**
- Create: projekt Next.js w katalogu głównym, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx` (tymczasowo: nagłówek h1 „Nihongo PL”), `vitest.config.ts`, `playwright.config.ts`, `tests/unit/smoke.test.ts`, `tests/e2e/smoke.spec.ts`, `.gitignore`
- Delete: `assets/` (nieużywane drzeworyty, spec §13 pkt 8)

**Interfaces:**
- Produces: klasy Tailwinda `bg-bg`, `bg-sf`, `text-ink`, `text-mu`, `border-ln`, `bg-ac`, `text-ac`, `bg-as`, `text-aci`, `text-ok` (z `@theme inline` mapującego `--color-*` na zmienne tokenów); zmienne CSS `--font-serif`, `--font-jp`; klasa `.jp` (font JP + `lang` ustawia komponent).

- [ ] **Step 1:** W pustym katalogu tymczasowym utwórz projekt `npx create-next-app@latest` z TypeScript, ESLint, Tailwind, App Router, `src/`, aliasem `@/*`, bez Turbopack-only opcji; przenieś pliki do katalogu głównego (zachowaj `docs/`, `.claude/`, `.agents/`, `skills-lock.json`). Doinstaluj: `next-themes zod ts-fsrs`, dev: `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test tsx`, potem `npx playwright install chromium`.
- [ ] **Step 2:** `.gitignore` dopisuje: `.taste-skill/`, `.claude/`, `.agents/`, `skills-lock.json`, `.cache/`, `test-results/`, `playwright-report/`.
- [ ] **Step 3:** `globals.css`: tokeny jasne na `:root`, ciemne na `.dark`, wartości 1:1 z tabeli w spec §4; `body { background: var(--bg); color: var(--ink); font-family: var(--font-serif) }`; `color-scheme` odpowiednio light/dark.
- [ ] **Step 4:** `layout.tsx`: `<html lang="pl" suppressHydrationWarning>`, fonty przez `next/font/google` (`Source_Serif_4` z `subsets: ['latin','latin-ext']`, `variable: '--font-serif'`; `Noto_Serif_JP` z `weight: ['400','600']`, `preload: false`, `variable: '--font-jp'`), `ThemeProvider` z next-themes (`attribute="class"`, `defaultTheme="system"`, `enableSystem`). Metadata: `title: { default: 'Nihongo PL', template: '%s · Nihongo PL' }`, opis „Kurs japońskiego po polsku, od pierwszego znaku do egzaminu JLPT N5.”
- [ ] **Step 5:** Skrypty w `package.json`: `"test": "vitest run"`, `"test:e2e": "playwright test"`. `vitest.config.ts` z jsdom, setup `@testing-library/jest-dom`, `include: ['tests/unit/**/*.test.{ts,tsx}']`. `playwright.config.ts` z `webServer: { command: 'npm run build && npm run start', port: 3000 }`, projekty: Desktop Chrome i `viewport: { width: 360, height: 740 }`.
- [ ] **Step 6:** Testy dymne: `tests/unit/smoke.test.ts` (`expect(1+1).toBe(2)` tylko po to, by sprawdzić konfigurację) i `tests/e2e/smoke.spec.ts` (`page.goto('/')`, `expect(page.getByRole('heading', { level: 1 })).toHaveText('Nihongo PL')`, `expect(page).toHaveTitle('Nihongo PL')`).
- [ ] **Step 7:** Run: `npm test` oraz `npm run test:e2e`. Expected: oba PASS.
- [ ] **Step 8:** `git init -b main`, `git remote add origin https://github.com/norbikowaty/nihongo_pl.git`, `git add -A`, `git commit -m "Initial project setup"`, `git push -u origin main`.

### Task 2: Schematy treści, katalog kursów, kana

**Files:**
- Create: `src/content/schema.ts`, `src/content/catalog.ts`, `src/content/kana.ts`, `src/content/lessons/index.ts` (na razie pusta lista), `tests/unit/content.test.ts`

**Interfaces:**
- Produces (`schema.ts`, typy z `z.infer`):
  - `Seg = { t: string; r?: string }` — fragment tekstu z opcjonalną furiganą
  - `JaText = { segs: Seg[]; romaji: string }`
  - `Word = { id: string; ja: JaText; pl: string; jmdict?: string }` (`jmdict` = id wpisu, uzupełnia Task 8)
  - `Example = { ja: JaText; pl: string }`
  - `Exercise = { type: 'build'; prompt: string; tiles: { ja: JaText }[]; answer: number[] } | { type: 'choice'; prompt: string; ja?: JaText; options: string[]; answer: number; why: string } | { type: 'kana'; items: { kana: string; romaji: string }[]; choices: number }`
  - `Step = { kind: 'intro'; lead: string; sentence: Example; after: string } | { kind: 'newKana'; chars: string[] } | { kind: 'pattern'; blocks: { pattern: JaText; meaning: string }[]; explanation: string } | { kind: 'examples'; items: Example[] } | { kind: 'exercise'; items: Exercise[] } | { kind: 'summary'; points: string[]; words: Word[] }`
  - `Lesson = { id: string; course: CourseId; section: string; slug: string; title: JaText | string; minutes: number; kind: 'lesson' | 'test'; steps: Step[] }` z refine: `kind==='lesson'` → dokładnie 5 kroków, ostatni `summary`; `kind==='test'` → 1 krok `exercise`; `answer` w `build` jest permutacją podzbioru indeksów `tiles`; `choice.answer < options.length`.
  - `CourseId = 'pismo' | 'gramatyka' | 'slownictwo' | 'kanji' | 'czytanie' | 'egzamin'`
  - `Course = { id: CourseId; glyph: string; title: string; meta: string; sections: { id: string; title: string; items: { slug: string; title: string; label: string }[] }[] }`
- Produces (`catalog.ts`): `export const courses: Course[]`; dane 1:1 z prototypu (zakładka Kursy, w tym „rōmaji domyślnie włączone” w meta Pisma; `label` to „20 min” / „64 słowa” itd.); slug elementu = id lekcji bez kursu, np. `pierwsze-zdania/wa-desu`.
- Produces (`kana.ts`): `hiragana: KanaRow[]`, `katakana: KanaRow[]`, gdzie `KanaRow = { row: string; cells: ({ kana: string; romaji: string } | null)[] }` (46 podstawowych + osobno `dakuten` i `yoon`), rōmaji w systemie Hepburna (し shi, ち chi, つ tsu, ふ fu, を o, ん n).
- Produces (`lessons/index.ts`): `export const lessons: Lesson[]`, `getLesson(course: string, slug: string): Lesson | undefined`.

- [ ] **Step 1: Testy** w `tests/unit/content.test.ts`:
  - `catalog parses` — `z.array(CourseSchema).parse(courses)` nie rzuca; `courses.map(c => c.id)` równa się `['pismo','gramatyka','slownictwo','kanji','czytanie','egzamin']`.
  - `vocabulary topic labels sum to 771` — suma liczb z `label` sekcji kursu `slownictwo` to 771.
  - `hiragana has 46 base characters` i `katakana has 46 base characters` (liczone nie-null komórki).
  - `romaji is Hepburn` — `し→shi`, `ち→chi`, `つ→tsu`, `ふ→fu`, `を→o`, `ん→n`.
  - `lesson schema rejects 4-step lesson` i `rejects build answer index out of range`.
  - `every lesson is listed in the catalog` — każdy `lessons[i]` ma element katalogu z tym samym `slug` w kursie `course` (na razie lista pusta, test przechodzi trywialnie, pilnuje kolejnych tasków).
- [ ] **Step 2:** Run `npm test -- content`. Expected: FAIL (brak modułów).
- [ ] **Step 3:** Zaimplementuj pliki z Interfaces.
- [ ] **Step 4:** Run `npm test -- content`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Add content schema and course catalog"`.

### Task 3: Powtórki FSRS

**Files:**
- Create: `src/lib/srs.ts`, `tests/unit/srs.test.ts`

**Interfaces:**
- Produces:
  - `CardState` — serializowalny odpowiednik karty ts-fsrs (daty jako ISO string)
  - `Rating = 'znowu' | 'trudne' | 'dobrze' | 'latwe'` (Again, Hard, Good, Easy)
  - `newCard(now: Date): CardState`
  - `rate(card: CardState, rating: Rating, now: Date): CardState`
  - `isDue(card: CardState, now: Date): boolean`
  - `dueIds(cards: Record<string, { card: CardState }>, now: Date): string[]` — posortowane od najdawniej należnych
  - `formatInterval(ms: number): string` i `intervalLabel(card: CardState, rating: Rating, now: Date): string` — `'< 1 min'`, `'10 min'`, `'1 dzień'`, `'2 dni'`, `'5 dni'` (polska odmiana: 1 dzień, 2–4 dni, 5+ dni; minuty i godziny analogicznie: `min`, `godz.`)

- [ ] **Step 1: Testy:** `new card is due immediately`; `rating dobrze moves due into the future`; `znowu schedules sooner than latwe` (porównanie `due` po obu ocenach z tej samej karty); `rate does not mutate input`; `formatInterval uses Polish plural` — `86_400_000 → '1 dzień'`, `2*86_400_000 → '2 dni'`, `5*86_400_000 → '5 dni'`, `30_000 → '< 1 min'`.
- [ ] **Step 2:** Run `npm test -- srs`. Expected: FAIL.
- [ ] **Step 3:** Zaimplementuj na `fsrs()` z ts-fsrs z domyślnymi parametrami, `enable_fuzz: false` (powtarzalne testy).
- [ ] **Step 4:** Run `npm test -- srs`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Add FSRS review scheduling"`.

### Task 4: Zapis postępu

**Files:**
- Create: `src/lib/progress/schema.ts`, `src/lib/progress/store.ts`, `src/lib/progress/useProgress.ts`, `tests/unit/progress.test.ts`

**Interfaces:**
- Consumes: `Lesson`, `Word` (Task 2); `CardState`, `newCard` (Task 3).
- Produces:
  - `STORAGE_KEY = 'nihongo-pl:progress'`
  - `ReadingLevel = 0 | 1 | 2` (0 bez pomocy, 1 furigana, 2 furigana + rōmaji); `ReadingContext = 'pismo' | 'reszta'`
  - `Progress = { version: 1; lessons: Record<string, { status: 'started' | 'done'; step: number; updatedAt: string }>; cards: Record<string, { card: CardState; updatedAt: string }>; notes: Record<string, { text: string; updatedAt: string }>; settings: { reading: Record<ReadingContext, ReadingLevel> } }`
  - `emptyProgress(): Progress` (reading: `{ pismo: 2, reszta: 1 }`)
  - `parseProgress(raw: string | null): Progress` — każdy błąd → `emptyProgress()`
  - `loadProgress(storage: Storage | null): Progress`, `saveProgress(p: Progress, storage: Storage | null): void` (wyjątek przy zapisie połknięty)
  - czyste funkcje (zwracają nowy obiekt): `setLessonStep(p, lessonId, step, now: Date)`, `completeLesson(p, lesson: Lesson, now: Date)` (status `done` + karta `word:<id>` dla każdego słowa z `summary.words` i `kana:<znak>` dla każdego znaku z `newKana`, bez nadpisywania istniejących kart), `setReading(p, ctx, level)`, `setNote(p, lessonId, text, now)`, `applyReview(p, cardId, card: CardState, now)`
  - `useProgress(): { progress: Progress; update: (fn: (p: Progress) => Progress) => void }` — `useSyncExternalStore` z `getServerSnapshot` zwracającym jeden stały obiekt `emptyProgress()`; nasłuch `storage` z innych kart.

- [ ] **Step 1: Testy** w `tests/unit/progress.test.ts`:
  - `parseProgress returns empty for invalid JSON` (`'{oops'`), `for other version` (`{"version":2}`), `for missing fields` (`{"version":1}`) — wynik `toEqual(emptyProgress())`.
  - `loadProgress works without storage` — `loadProgress(null)` równa się `emptyProgress()`.
  - `saveProgress swallows quota errors` — atrapa `Storage`, której `setItem` rzuca; `expect(() => saveProgress(p, s)).not.toThrow()`.
  - `completeLesson adds one card per word and keeps existing cards` — lekcja z 2 słowami; karta `word:a` istniała wcześniej z innym `updatedAt`, po wywołaniu zostaje bez zmian; `Object.keys(cards).length === 2`; `lessons[id].status === 'done'`.
  - `default reading levels` — `emptyProgress().settings.reading` równa się `{ pismo: 2, reszta: 1 }`.
  - `round trip` — `parseProgress(JSON.stringify(p))` równa się `p`.
- [ ] **Step 2:** Run `npm test -- progress`. Expected: FAIL.
- [ ] **Step 3:** Zaimplementuj. `parseProgress` waliduje zod-em `ProgressSchema` (`safeParse`).
- [ ] **Step 4:** Run `npm test -- progress`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Add local progress store"`.

### Task 5: Powłoka strony: nagłówek, stopka, tryb nocny, pomoc w czytaniu

**Files:**
- Create: `src/lib/header-visibility.ts`, `src/lib/reading.ts`, `src/components/shell/*.tsx`, `src/components/ja/Ja.tsx`, `src/components/ja/Prose.tsx`, `src/lib/prose.ts`, `tests/unit/header.test.ts`, `tests/unit/ja.test.tsx`, `tests/e2e/shell.spec.ts`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

**Interfaces:**
- Consumes: `useProgress`, `setReading`, `ReadingLevel`, `ReadingContext` (Task 4); `JaText` (Task 2).
- Produces:
  - `HeaderState = { lastY: number; acc: number; hidden: boolean }`, `initialHeader: HeaderState`, `nextHeader(s: HeaderState, y: number): HeaderState` ze stałymi `SHOW_ZONE = 80`, `HIDE_AFTER = 140`, `SHOW_AFTER = 70` (algorytm jak w prototypie: kumulacja przesunięcia w jednym kierunku, reset przy zmianie kierunku).
  - `readingContextFor(pathname: string): ReadingContext` — `'/kursy/pismo'…` → `'pismo'`, reszta → `'reszta'`.
  - `<Ja text={JaText} size?: 'sm'|'md'|'lg'|'xl' />` — `<span lang="ja" class="jp">` z `<ruby>seg.t<rt>seg.r</rt></ruby>` dla segmentów z `r`, potem `<span class="rm">romaji</span>`.
  - `splitProse(text: string): { ja: boolean; text: string }[]` — dzieli na ciągi znaków japońskich (zakresy: hiragana, katakana, CJK, znaki `。、・ー〜`) i pozostałe; `<Prose text={string} />` renderuje akapity (`\n\n`) z japońskimi fragmentami w `<span lang="ja" class="jp">`.
  - `ReadingProvider` ustawia na wrapperze treści klasę `lv0|lv1|lv2` według kontekstu z `usePathname()`. CSS: `.lv0 rt { visibility: hidden }`, `.rm { display: none }`, `.lv2 .rm { display: block }`.
  - `Header`: znak 日本語 (prostokąt `bg-ac text-aci`) + „Nihongo PL” (link `/`), linki: Strona główna `/`, Kursy `/kursy`, Powtórki `/powtorki`, Słownik `/slownik`, Kana `/kana`, Egzamin `/egzamin` z `aria-current="page"` na aktywnym; `ReadingSwitch` (trzy przyciski 漢字 / ふりがな / rōmaji z `aria-pressed` i `title` jak w prototypie); `ThemeToggle` (`aria-label` „Włącz tryb nocny” / „Włącz tryb dzienny”); poniżej 1000 px linki w `MobileMenu` (przycisk „Menu” z `aria-expanded`, szuflada zamykana Escape i kliknięciem linku). Ikony konta brak.
  - `Footer`: treść ze spec §5 (Autor: norbikowaty → `https://github.com/norbikowaty`, linki `/regulamin`, `/prywatnosc`, `/kontakt`, `/licencje`, „© 2026 Nihongo PL”).
  - `ScrollToTop`: efekt na zmianę `usePathname()` → `window.scrollTo(0, 0)`.

- [ ] **Step 1: Testy jednostkowe:**
  - `header stays visible near top` — z `hidden: true` i `y = 50` → `hidden: false`.
  - `header hides only after 140px down` — sekwencja y: 100, 200, 239 → widoczny; 241 → ukryty (od `lastY: 100`).
  - `header shows after 70px up` — z ukrytego przy y=600: 560 → ukryty, 529 → widoczny.
  - `direction change resets accumulation`.
  - `readingContextFor` — `/kursy/pismo/hiragana-1` → `pismo`, `/kursy/gramatyka/x` → `reszta`, `/` → `reszta`.
  - `Ja renders ruby and romaji` — `<Ja text={{ segs:[{t:'私',r:'わたし'},{t:'は'}], romaji:'Watashi wa' }} />`: jest `rt` o treści `わたし`, element z `lang="ja"`, tekst `Watashi wa` w `.rm`.
  - `splitProse` — `'Partykuła は i です.'` → `[{ja:false,'Partykuła '},{ja:true,'は'},{ja:false,' i '},{ja:true,'です'},{ja:false,'.'}]`.
- [ ] **Step 2:** Run `npm test`. Expected: nowe testy FAIL.
- [ ] **Step 3:** Zaimplementuj logikę i komponenty; nagłówek `sticky top-0`, `transform: translateY(-100%)` gdy ukryty, przejście 280 ms, wyłączone przy `prefers-reduced-motion`.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5: Test e2e** `tests/e2e/shell.spec.ts`: przełączenie trybu nocnego dodaje klasę `dark` na `html` i przetrwa przeładowanie; przełączenie na `漢字` ukrywa `rt` (`toBeHidden` / `visibility`) i przetrwa przeładowanie; po przewinięciu w dół o 1000 px nagłówek ma `transform` różny od `none`, po przewinięciu w górę o 100 px znowu `none`; stopka zawiera link do `https://github.com/norbikowaty`; na 360 px brak poziomego przewijania (`document.documentElement.scrollWidth <= 360`), a menu otwiera się przyciskiem „Menu”.
- [ ] **Step 6:** Run `npm run test:e2e -- shell`. Expected: PASS.
- [ ] **Step 7:** Commit: `git commit -m "Add header, footer, theme and reading aid"`.

### Task 6: Spis kursów

**Files:**
- Create: `src/components/courses/CourseToc.tsx`, `src/app/kursy/page.tsx`, `tests/unit/course-toc.test.tsx`

**Interfaces:**
- Consumes: `courses` (Task 2), `lessons`, `getLesson` (Task 2), `useProgress` (Task 4).
- Produces: `<CourseToc courses={Course[]} progress={Progress} />` (każdy `<details>` ma `id` równe id kursu, więc `/kursy#gramatyka` przewija do Gramatyki i ją rozwija); `lessonState(course: CourseId, slug: string, progress: Progress): 'done' | 'current' | 'open' | 'soon'` w `src/lib/lessons.ts` (`soon` = brak lekcji w `lessons`; `current` = pierwsza nieukończona dostępna lekcja kursu); `courseSummary(course, progress): string` → „ukończony”, „nie zaczęty” albo „1 / 36”.

- [ ] **Step 1: Testy:** `lessonState returns soon for unlisted lesson`; `first unfinished available lesson is current`; `CourseToc opens the course with a current lesson` (ten `<details>` ma `open`, pozostałe nie); `soon items are not links` (tekst „wkrótce”, brak `<a>`); `available items link to /kursy/<kurs>/<slug>`.
- [ ] **Step 2:** Run `npm test -- course-toc`. Expected: FAIL.
- [ ] **Step 3:** Zaimplementuj według prototypu (glif, tytuł, meta, stan, chevron; sekcje w siatce 3 kolumn, 1 kolumna < 1000 px; ✓ / ● / „wkrótce”). Strona `/kursy`: h1 „Spis kursów N5” i zdanie z prototypu.
- [ ] **Step 4:** Run `npm test -- course-toc`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Add course list page"`.

### Task 7: Odtwarzacz lekcji

**Files:**
- Create: `src/app/kursy/[kurs]/[lekcja]/page.tsx`, `src/app/not-found.tsx` (h1 „Nie ma takiej strony”, link „Spis kursów” → `/kursy`), `src/components/lesson/*`, `tests/unit/lesson.test.tsx`
- Create (dane testowe): `tests/fixtures/lesson.ts` — jedna lekcja `kind:'lesson'` z każdym typem ćwiczenia

**Interfaces:**
- Consumes: `getLesson`, `Lesson`, `Step`, `Exercise` (Task 2); `useProgress`, `setLessonStep`, `completeLesson`, `setNote` (Task 4); `<Ja>`, `<Prose>` (Task 5).
- Produces:
  - `generateStaticParams()` z `lessons`; nieznana lekcja → `notFound()`.
  - `clampStep(raw: string | undefined, total: number): number` w `src/lib/lessons.ts` (1-based; `undefined`, `NaN`, `< 1` → 1; `> total` → total).
  - `stepLabel(kind: Step['kind']): string` — intro „Wprowadzenie”, newKana „Nowe znaki”, pattern „Wzór”, examples „Przykłady”, exercise „Ćwiczenie”, summary „Podsumowanie”.
  - `<LessonPlayer lesson={Lesson} />` — pasek kroków (`role="tablist"`, przycisk na krok), treść kroku, „Wstecz” / „Krok n z N” / „Dalej” („Podsumowanie” na przedostatnim, „Zakończ lekcję” na ostatnim). Zmiana kroku: `router.replace('?krok=n', { scroll: false })` + przewinięcie do nagłówka lekcji + `setLessonStep`. „Zakończ lekcję” → `completeLesson` i przejście do następnej dostępnej lekcji albo do `/kursy`.
  - `<LessonAside>`: „Słowa w tej lekcji” (słowa z kroku `summary`) i „Twoja notatka” (`<textarea>` z `<label>`, zapis `setNote` po 500 ms bezczynności).
  - Ćwiczenia: `SentenceBuilder` (klocki jak w prototypie, „Sprawdź” / „Od nowa”, wynik w `aria-live`), `Choice` (przyciski opcji, po wyborze poprawna na `ok`, błędna na `ac`, zdanie `why`), `KanaQuiz` (znak, `choices` odpowiedzi rōmaji losowanych z tego samego zestawu, kolejne znaki, wynik na końcu).
  - Test działu (`kind:'test'`): bez paska kroków, lista pytań `choice`, wynik „x z n”, ukończenie przy ≥ 80% poprawnych.

- [ ] **Step 1: Testy jednostkowe:** `clampStep` dla `'0'→1`, `'9'` przy 5 → 5, `'abc'→1`, `undefined→1`, `'3'→3`; `SentenceBuilder accepts only the answer order` (kliknięcia w złej kolejności → komunikat „Jeszcze nie…”, w dobrej → „Dobrze”); `Choice shows explanation after answer`; `KanaQuiz reports score`; `test lesson completes at 80%` (4 z 5 → ukończona, 3 z 5 → nie).
- [ ] **Step 2:** Run `npm test -- lesson`. Expected: FAIL.
- [ ] **Step 3:** Zaimplementuj według prototypu (karta kroku na `bg-sf`, wzór na `bg-bg`, przeczenie na `bg-as`, akcent na partykułach przez segmenty).
- [ ] **Step 4:** Run `npm test -- lesson`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Add lesson player"`.

### Task 8: Weryfikacja słów (JMdict) i kolejność kresek (KanjiVG)

**Files:**
- Create: `scripts/verify-words.ts`, `scripts/fetch-kanjivg.ts`, `public/kanjivg/*.svg`, `src/components/lesson/steps/KanaStrokes.tsx`

**Interfaces:**
- Consumes: `lessons`, `Word` (Task 2).
- Produces:
  - `npx tsx scripts/verify-words.ts` — pobiera do `.cache/` najnowsze wydanie `jmdict-eng` z projektu jmdict-simplified (GitHub releases scriptin/jmdict-simplified; plik JSON), dla każdego `Word` sprawdza, że istnieje wpis z pisownią równą złączonym `segs[].t` i czytaniem równym złączonym `r ?? t`; wypisuje id wpisu i angielskie znaczenia do ręcznego porównania z `pl`; kod wyjścia 1, jeśli któreś słowo nie istnieje. Zapisuje znalezione id do pola `jmdict` nie automatycznie, tylko wypisuje je do skopiowania.
  - `npx tsx scripts/fetch-kanjivg.ts <znaki>` — pobiera `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/<5-cyfrowy hex>.svg` do `public/kanjivg/`.
  - `<KanaStrokes char={string} />` — `<img src="/kanjivg/<hex>.svg" alt="Kolejność kresek znaku X">`, w ciemnym trybie z filtrem `invert(1)`.

- [ ] **Step 1:** Napisz oba skrypty; uruchom `fetch-kanjivg` dla wszystkich 92 znaków podstawowych kana (+ dźwięczne i małe znaki z `kana.ts`). Expected: plik dla każdego znaku w `public/kanjivg/`.
- [ ] **Step 2:** Test jednostkowy `kanjivg file exists for every kana` (fs: każdy znak z `kana.ts` ma plik).
- [ ] **Step 3:** Run `npm test`. Expected: PASS.
- [ ] **Step 4:** Commit: `git commit -m "Add word verification and stroke order assets"`.

### Task 9: Treść: kurs Pisma i dział 1 Gramatyki

**Files:**
- Create: `src/content/lessons/pismo/*.ts` (12 lekcji), `src/content/lessons/gramatyka/pierwsze-zdania/*.ts` (4 lekcje + test), wpisy w `lessons/index.ts`, `tests/e2e/lesson.spec.ts`

**Interfaces:**
- Consumes: `Lesson` (Task 2), `kana.ts`, skrypt weryfikacji (Task 8).
- Produces: lekcje o slugach z katalogu (Task 2). Gramatyka dział 1: `pierwsze-zdania/desu`, `pierwsze-zdania/wa-desu`, `pierwsze-zdania/ka`, `pierwsze-zdania/no`, `pierwsze-zdania/test`.

- [ ] **Step 1:** Lekcja `pierwsze-zdania/wa-desu` — treść 1:1 z prototypu (wprowadzenie, wzór A は B です i przeczenie じゃありません, 4 przykłady z rōmaji, ćwiczenie z klockami 私・は・学生・です + を jako fałszywy klocek, podsumowanie, 6 słów). Pozostałe 3 lekcje i test (8–10 pytań) w tym samym układzie i tonie.
- [ ] **Step 2:** Lekcje Pisma: kroki `newKana` → `exercise` (`kana`) → `examples` (słowa tylko z już poznanych znaków) → `exercise` (`choice`) → `summary`. Podział znaków według katalogu.
- [ ] **Step 3:** Run `npx tsx scripts/verify-words.ts`. Expected: kod 0. Porównaj wypisane angielskie znaczenia z polskimi i popraw rozbieżności.
- [ ] **Step 4: Test e2e** `tests/e2e/lesson.spec.ts`: `/kursy/gramatyka/pierwsze-zdania/wa-desu?krok=9` pokazuje krok 5; `?krok=abc` i `?krok=0` pokazują krok 1; przejście do kroku 3 i przeładowanie zostaje na kroku 3; `/kursy/gramatyka/to-i-tamto/kore-sore-are` (wkrótce) i `/kursy/xyz/abc` dają stronę 404 z linkiem „Spis kursów”; ułożenie zdania 私・は・学生・です daje „Dobrze”; po „Zakończ lekcję” `/kursy` pokazuje ✓ przy tej lekcji.
- [ ] **Step 5:** Run `npm test` (test „every lesson is listed in the catalog” teraz faktycznie coś sprawdza) i `npm run test:e2e -- lesson`. Expected: PASS.
- [ ] **Step 6:** Commit: `git commit -m "Add writing course and first grammar section"`.

### Task 10: Strona główna i Powtórki

**Files:**
- Create: `src/app/page.tsx` (zastępuje tymczasową), `src/components/home/TodayBlock.tsx`, `src/app/powtorki/page.tsx`, `src/components/review/ReviewSession.tsx`, `src/content/egzamin.ts`, `tests/unit/review.test.tsx`, `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `useProgress`, `applyReview` (Task 4); `dueIds`, `rate`, `intervalLabel` (Task 3); `lessonState` (Task 6); `lessons` (Task 2).
- Produces:
  - `egzaminFacts` w `src/content/egzamin.ts`: `{ checkedAt: '2026-10-25', parts: [{ name: 'Słownictwo', scope: 'zapis i znaczenie słów, kanji z czytaniem', minutes: 20 }, { name: 'Gramatyka i czytanie', scope: 'budowa zdań, krótkie teksty', minutes: 40 }, { name: 'Słuchanie', scope: 'krótkie rozmowy i polecenia', minutes: 30 }], scores: { knowledgeReading: { max: 120, min: 38 }, listening: { max: 60, min: 19 }, total: { max: 180, pass: 80 } }, poland: { cities: ['Warszawa', 'Gdańsk'], host: 'Polsko-Japońska Akademia Technik Komputerowych', nextDate: null }, sources: [3 adresy jlpt.jp ze spec §8] }`. `nextDate: null`, bo data dla Polski nie jest potwierdzona; strony pokazują wtedy „Termin i zapisy podaje organizator”.
  - `nextLesson(progress: Progress): Lesson` — pierwsza nieukończona dostępna lekcja według kolejności z katalogu (Pismo przed Gramatyką).
  - `TodayBlock`: przed montowaniem i przy pustym postępie: „Zacznij od hiragany” → pierwsza lekcja Pisma; z postępem: tytuł następnej lekcji, przykładowe zdanie z kroku `intro`, jeśli jest, pasek „krok x z N”, „Kontynuuj lekcję”; obok liczba należnych powtórek i „Zacznij powtórkę” (lub „Brak powtórek na dziś”).
  - Skróty (4): Tabela kana `/kana`, Słownik N5 `/slownik`, Lista kanji `/slownik?typ=kanji`, Gramatyka w pigułce `/kursy#gramatyka`.
  - Blok „Egzamin JLPT N5” z prototypu (lista `dl`) i link „Wszystko o egzaminie”.
  - `ReviewSession`: karta z przodem (japoński), „Pokaż odpowiedź”, potem czytanie, znaczenie i cztery oceny z `intervalLabel`; po ocenie `applyReview`; koniec: „Powtórki na dziś zrobione”. Stan pusty: zdanie i link do `nextLesson`.

- [ ] **Step 1: Testy:** `egzamin pass mark is 80 of 180` (`egzaminFacts.scores.total.pass === 80`, suma minut części = 90); `nextLesson starts with writing course`; `nextLesson skips done lessons`; `ReviewSession shows empty state without cards`; `rating a card removes it from today's queue`.
- [ ] **Step 2:** Run `npm test -- review`. Expected: FAIL.
- [ ] **Step 3:** Zaimplementuj. Blok z postępem renderuje się dopiero po montowaniu (flaga `mounted` albo snapshot serwera z Task 4), żeby uniknąć ostrzeżeń hydracji.
- [ ] **Step 4:** Run `npm test -- review`. Expected: PASS.
- [ ] **Step 5: Test e2e** `home.spec.ts`: nowy użytkownik widzi „Zacznij od hiragany”; konsola nie zawiera „Hydration” ani „did not match”; na stronie głównej nie ma tekstu „Spis kursów N5”; po ukończeniu pierwszej lekcji Pisma strona główna pokazuje drugą lekcję i niezerową liczbę powtórek.
- [ ] **Step 6:** Run e2e. Expected: PASS.
- [ ] **Step 7:** Commit: `git commit -m "Add home page and reviews"`.

### Task 11: Kana, Słownik, Egzamin, strony prawne

**Files:**
- Create: `src/app/kana/page.tsx`, `src/app/slownik/page.tsx`, `src/app/egzamin/page.tsx`, `src/app/regulamin/page.tsx`, `src/app/prywatnosc/page.tsx`, `src/app/kontakt/page.tsx`, `src/app/licencje/page.tsx`, `tests/unit/pages.test.tsx`

**Interfaces:**
- Consumes: `hiragana`, `katakana` (Task 2), słowa ze wszystkich lekcji (Task 9), `<Ja>` (Task 5), `egzaminFacts` (Task 10).
- Produces:
  - `searchWords(words: Word[], query: string): Word[]` w `src/lib/dictionary.ts`.
  - `/egzamin`: sekcje i FAQ z prototypu, tabele generowane z `egzaminFacts`, źródła pod treścią jako zwykłe linki.
  - `/kana`: tabela 5 × 11 (kolumny od prawej jak w prototypie), przełącznik Hiragana / Katakana, rōmaji pod znakiem, pod tabelą znaki dźwięczne i małe.
  - `/slownik`: lista słów z lekcji (deduplikacja po `id`), wyszukiwarka (po japońsku, rōmaji i polsku, bez rozróżniania wielkości liter i polskich znaków diakrytycznych), `?typ=kanji` pokazuje listę kanji zestawu 1 (一–十 ze znaczeniami).
  - Strony prawne: szablony z nagłówkiem i akapitem „Treść do uzupełnienia”. `/licencje`: JMdict/EDRDG (CC BY-SA 4.0), KanjiVG (CC BY-SA 3.0), fonty (SIL OFL).

- [ ] **Step 1: Testy:** `kana page shows 46 hiragana`; `dictionary search ignores Polish diacritics` (`'ksiazka'` znajduje „książka”); `dictionary search matches romaji` (`'hon'`).
- [ ] **Step 2:** Run `npm test -- pages`. Expected: FAIL.
- [ ] **Step 3:** Zaimplementuj.
- [ ] **Step 4:** Run `npm test -- pages`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Add kana, dictionary, exam and legal pages"`.

### Task 12: Przegląd końcowy i wypchnięcie

**Files:**
- Create: `tests/e2e/a11y.spec.ts` (dev: `@axe-core/playwright`)

- [ ] **Step 1: Test e2e** `a11y.spec.ts`: dla `/`, `/kursy`, lekcji `wa-desu`, `/powtorki`, `/egzamin` w trybie jasnym i ciemnym axe nie zgłasza naruszeń `serious` ani `critical`; każda z tych stron przy 360 px ma `scrollWidth <= 360`; przejście linkiem z `/egzamin` (po przewinięciu na dół) do `/kursy` zaczyna się od `scrollY === 0`.
- [ ] **Step 2:** Run `npm run lint`, `npm test`, `npm run test:e2e`. Expected: wszystko PASS.
- [ ] **Step 3:** Run `npm run build` i `npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices --quiet` na `npm run start`. Expected: każda kategoria ≥ 90; zapisz wyniki w opisie dla właściciela.
- [ ] **Step 4:** Commit: `git commit -m "Add accessibility checks"` i `git push`.
- [ ] **Step 5:** Przekaż właścicielowi: `npm run dev` → http://localhost:3000. Podpięcie Vercela (`vercel login`, `vercel link`, `vercel deploy`) dopiero na jego wyraźne „tak”.
