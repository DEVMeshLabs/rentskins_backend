import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
});
