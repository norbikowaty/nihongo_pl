import type { Page } from "@playwright/test";

/** Opens a lesson at a later step, as if the learner had already worked up to it. */
export async function openStep(page: Page, path: string, step: number) {
  await page.goto(path);
  await page.evaluate(
    ([id, n]) => {
      const key = "nihongo-pl:progress";
      const p = JSON.parse(localStorage.getItem(key) ?? "null") ?? {
        version: 1,
        lessons: {},
        cards: {},
        notes: {},
        settings: { reading: { pismo: 2, reszta: 1 } },
      };
      p.lessons[id] = { status: "started", step: n, reached: n, updatedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(p));
    },
    [path.replace(/^\/kursy\//, ""), step] as const,
  );
  await page.goto(`${path}?krok=${step}`);
}
