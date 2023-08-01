import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  entryPoints: ["src", "!src/**/*.spec.*"],
  format: ["esm", "cjs"],
  legacyOutput: true,
  sourcemap: true,
  config: "tsconfig.json",
};
