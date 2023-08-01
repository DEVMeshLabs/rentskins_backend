import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
const { resolve } = require("webpack");

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: "vitest",
        replacement: resolve(__dirname, "./src"),
      },
    ],
  },
});
