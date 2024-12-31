import babelParser from "@babel/eslint-parser";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import sonarjs from "eslint-plugin-sonarjs";

// names for eslint-config inspector
pluginReact.configs.flat.recommended.name = "eslint-plugin-react";
pluginReact.configs.flat["jsx-runtime"].name =
  "eslint-plugin-react/jsx-runtime";
pluginPrettierRecommended.name = "eslint-plugin-prettier";
sonarjs.configs.recommended.name = "eslint-plugin-sonarjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { name: "parsed-files config", files: ["**/*.{js,mjs,cjs,jsx}"] },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    name: "@stylistic/js",
    plugins: { "@stylistic/js": stylisticJs },
  },
  sonarjs.configs.recommended,
  {
    name: "eon-eslint",
    languageOptions: {
      parser: babelParser,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "sonarjs/pseudo-random": "off",
      "sonarjs/todo-tag": "warn",
    },
  },
  pluginPrettierRecommended,
];
