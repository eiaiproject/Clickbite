import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./qa",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: "http://localhost:5174",
    headless: true,
  },
  webServer: {
    command: "npx vite --port 5174 --strictPort",
    port: 5174,
    reuseExistingServer: true,
    timeout: 15000,
  },
});
