import { expect, test } from "@playwright/test";
import { openStep } from "./helpers";

test("new visitor starts with hiragana, without hydration errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") errors.push(m.text());
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Zacznij od hiragany" })).toHaveAttribute(
    "href",
    "/kursy/pismo/hiragana/a-o",
  );
  await expect(page.getByText("Spis kursów N5")).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(errors.filter((e) => /hydrat|did not match/i.test(e))).toEqual([]);
});

test("after the first lesson the home page moves on and shows reviews", async ({ page }) => {
  await openStep(page, "/kursy/pismo/hiragana/a-o", 5);
  await page.getByRole("button", { name: "Zakończ lekcję" }).click();
  await expect(page).toHaveURL(/hiragana\/ka-ko/);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("か・き・く・け・こ");
  await expect(page.getByRole("link", { name: "Kontynuuj lekcję" })).toBeVisible();
  await expect(page.getByText("Brak powtórek na dziś")).toHaveCount(0);
});

test("review session works after a lesson", async ({ page }) => {
  await openStep(page, "/kursy/pismo/hiragana/a-o", 5);
  await page.getByRole("button", { name: "Zakończ lekcję" }).click();
  await page.goto("/");
  await expect(page.getByText(/następna za 30 min/)).toBeVisible();
  // The first review comes 30 minutes after the lesson; move the clock of the saved cards instead of waiting.
  await page.evaluate(() => {
    const key = "nihongo-pl:progress";
    const p = JSON.parse(localStorage.getItem(key)!);
    for (const c of Object.values(p.cards) as { card: { due: string } }[]) c.card.due = new Date(Date.now() - 1000).toISOString();
    localStorage.setItem(key, JSON.stringify(p));
  });
  await page.goto("/powtorki");
  await page.getByRole("button", { name: "Pokaż odpowiedź" }).click();
  await page.getByRole("button", { name: /^Dobrze/ }).click();
  await expect(page.getByText(/Zostało: /)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Progi powtórek" })).toBeVisible();
});
