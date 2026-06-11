import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: ".",
  server: {
    port: 5173,
    strictPort: false,
  },
});
