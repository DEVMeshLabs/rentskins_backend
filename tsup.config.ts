import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  entry: ['"src", "!src/**/*.spec.*"'],
  entryPoints: ["src"],
  format: ["esm", "cjs"],
  legacyOutput: true,
  sourcemap: true,
  config: "tsconfig.json",
};
