import type { Options } from "tsup";

export const tsup: Options = {
  entry: ['"src", "!src/**/*.spec.*"'],
  config: "tsconfig.json",
};
