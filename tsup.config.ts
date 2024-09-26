import { defineConfig } from "tsup";
import tsconfigPaths from "tsconfig-paths";

tsconfigPaths.register(); // Registra os aliases do tsconfig

export default defineConfig({
  entry: ["src", "!src/tests"],
  outDir: "build",
  splitting: false,
  sourcemap: true,
  clean: true,
});
