import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // One retry for rare local stalls of the Windows dev machine; retried tests are still reported as flaky.
  retries: 1,
  reporter: "list",
  use: {
    // 127.0.0.1, not localhost: on Windows the localhost lookup made parallel browsers stall for ~10 s.
    baseURL: "http://127.0.0.1:3000",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 } } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
