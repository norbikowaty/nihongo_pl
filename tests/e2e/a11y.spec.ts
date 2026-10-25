import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/kursy", "/kursy/gramatyka/pierwsze-zdania/wa-desu", "/powtorki", "/egzamin", "/kana", "/slownik"];

for (const scheme of ["light", "dark"] as const) {
  for (const path of pages) {
    test(`${path} has no serious accessibility issues (${scheme})`, async ({ page }) => {
      if (scheme === "dark") await page.addInitScript(() => localStorage.setItem("nihongo-pl:theme", "dark"));
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const { violations } = await new AxeBuilder({ page }).analyze();
      const serious = violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`);
      expect(serious).toEqual([]);
    });
  }
}

test("no page scrolls sideways on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const path of pages) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(360);
  }
});

test("a new page starts at the top", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/egzamin");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.getByRole("link", { name: "Zobacz kursy N5" }).click();
  await expect(page).toHaveURL(/\/kursy$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
