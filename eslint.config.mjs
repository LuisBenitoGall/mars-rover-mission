import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.vitest.json"],
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // aquí añadiremos reglas si hace falta, sin convertir esto en una religión
    }
  }
];
