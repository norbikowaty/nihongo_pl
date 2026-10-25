import { expect, test } from "@playwright/test";

test("night mode toggles and survives a reload", async ({ page }) => {
  // Day mode by default, even when the system is set to dark.
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.getByRole("button", { name: "Włącz tryb nocny" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Włącz tryb dzienny" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

// On a phone the reading switch lives in the menu.
async function openMenuIfPhone(page: import("@playwright/test").Page) {
  const menu = page.getByRole("button", { name: "Menu" });
  if (await menu.isVisible()) await menu.click();
}

test("reading aid level is remembered", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-reading", "1");
  await openMenuIfPhone(page);
  await page.getByRole("button", { name: "漢字" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-reading", "0");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-reading", "0");
  await openMenuIfPhone(page);
  await expect(page.getByRole("button", { name: "漢字" })).toHaveAttribute("aria-pressed", "true");
});

test("header hides on the way down and returns on a short scroll up", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => (document.body.style.minHeight = "5000px"));
  const header = page.locator("header").first();
  await page.mouse.wheel(0, 1000);
  await expect(header).toHaveAttribute("data-hidden", "true");
  await page.mouse.wheel(0, -100);
  await expect(header).toHaveAttribute("data-hidden", "false");
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
});

test("footer credits the author", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "norbikowaty" })).toHaveAttribute(
    "href",
    "https://github.com/norbikowaty",
  );
  for (const name of ["Regulamin", "Polityka prywatności", "Kontakt"]) {
    await expect(footer.getByRole("link", { name })).toBeVisible();
  }
});

test("phone layout has no horizontal scroll and a working menu", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Kursy" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
