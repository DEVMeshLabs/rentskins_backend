import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/tests"],
  outDir: "build",
  splitting: false,
  sourcemap: true,
  clean: true,
});
