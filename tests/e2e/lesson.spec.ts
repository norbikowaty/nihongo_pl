import { expect, test } from "@playwright/test";
import { openStep } from "./helpers";

const LESSON = "/kursy/gramatyka/pierwsze-zdania/wa-desu";
const selectedStep = (page: import("@playwright/test").Page) =>
  page.getByRole("tablist", { name: "Kroki lekcji" }).getByRole("tab", { selected: true });

test("step number in the address is clamped to the steps reached", async ({ page }) => {
  await page.goto(`${LESSON}?krok=5`);
  await expect(page.getByText("Krok 1 z 5")).toBeVisible();
  await openStep(page, LESSON, 5);
  await page.goto(`${LESSON}?krok=9`);
  await expect(page.getByText("Krok 5 z 5")).toBeVisible();
  await page.goto(`${LESSON}?krok=abc`);
  await expect(page.getByText("Krok 1 z 5")).toBeVisible();
  await page.goto(`${LESSON}?krok=0`);
  await expect(page.getByText("Krok 1 z 5")).toBeVisible();
});

test("reload keeps the current step", async ({ page }) => {
  await page.goto(LESSON);
  await page.getByRole("button", { name: "Dalej" }).click();
  await page.getByRole("button", { name: "Dalej" }).click();
  await expect(page).toHaveURL(/krok=3/);
  await page.reload();
  await expect(page.getByText("Krok 3 z 5")).toBeVisible();
  await expect(selectedStep(page)).toHaveCount(1);
});

test("unknown and upcoming lessons show the not-found page", async ({ page }) => {
  // With Cache Components the not-found page streams with status 200 and a noindex tag.
  for (const url of ["/kursy/gramatyka/to-i-tamto/kore-sore-are", "/kursy/xyz/abc"]) {
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nie ma takiej strony");
    expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBeGreaterThan(0);
    await expect(page.locator("#tresc").getByRole("link", { name: "Spis kursów" })).toBeVisible();
  }
});

test("sentence builder accepts the right order", async ({ page }) => {
  await openStep(page, LESSON, 4);
  for (const t of ["私", "は", "学生", "です"]) {
    // The step also has a choice question with a は option; the sentence tiles come first.
    await page.getByRole("button", { name: t, exact: true }).first().click();
  }
  await page.getByRole("button", { name: "Sprawdź" }).click();
  await expect(page.getByRole("status").first()).toHaveText(/Dobrze/);
});

test("furigana follows the reading switch", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(LESSON);
  const rt = page.locator("rt").first();
  await expect(rt).toBeVisible();
  await page.getByRole("button", { name: "漢字" }).click();
  await expect(rt).toBeHidden();
  await page.getByRole("button", { name: "rōmaji" }).click();
  await expect(page.locator(".rm", { hasText: "Watashi wa gakusei desu." }).first()).toBeVisible();
});

test("finishing the lesson marks it done in the course list", async ({ page }) => {
  await openStep(page, LESSON, 5);
  await page.getByRole("button", { name: "Zakończ lekcję" }).click();
  // The next lesson in study order is the first writing lesson.
  await expect(page).toHaveURL(/\/kursy\/pismo\/hiragana\/a-o$/);
  await page.goto("/kursy");
  await page.locator("summary", { hasText: "Gramatyka N5" }).click();
  await expect(page.getByRole("link", { name: /Partykuła は i です.*ukończona/ })).toBeVisible();
});
