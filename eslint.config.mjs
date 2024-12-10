import globals from "globals"
import pluginJs from "@eslint/js"
import tsEslint from "typescript-eslint"
import stylistic from "@stylistic/eslint-plugin"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  stylistic.configs['disable-legacy'],
  stylistic.configs.customize({
    indent: 4,
    quotes: 'single',
    semi: false,
    commaDangle: 'never',
  })
];