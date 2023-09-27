import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    ...configDefaults.exclude,
    exclude: ["./src/useCases/*.spec.ts"],
  },
});
