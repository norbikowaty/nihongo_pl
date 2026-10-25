import { expect, test } from "@playwright/test";

test("new visitor starts with hiragana, without hydration errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") errors.push(m.text());
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Zacznij od hiragany" })).toHaveAttribute(
    "href",
    "/kursy/pismo/hiragana/a-ko",
  );
  await expect(page.getByText("Spis kursów N5")).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(errors.filter((e) => /hydrat|did not match/i.test(e))).toEqual([]);
});

test("after the first lesson the home page moves on and shows reviews", async ({ page }) => {
  await page.goto("/kursy/pismo/hiragana/a-ko?krok=5");
  await page.getByRole("button", { name: "Zakończ lekcję" }).click();
  await expect(page).toHaveURL(/hiragana\/sa-to/);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("さ–そ i た–と");
  await expect(page.getByRole("link", { name: "Kontynuuj lekcję" })).toBeVisible();
  await expect(page.getByText("Brak powtórek na dziś")).toHaveCount(0);
});

test("review session works from the home page", async ({ page }) => {
  await page.goto("/kursy/pismo/hiragana/a-ko?krok=5");
  await page.getByRole("button", { name: "Zakończ lekcję" }).click();
  await page.goto("/powtorki");
  await page.getByRole("button", { name: "Pokaż odpowiedź" }).click();
  await page.getByRole("button", { name: /^Dobrze/ }).click();
  await expect(page.getByText(/do powtórki/)).toBeVisible();
});
