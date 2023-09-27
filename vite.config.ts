import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {},
  build: {
    rollupOptions: {
      input: ["src", "!src/**/*.spec.*"],
    },
  },
});
