import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      react: {
        version: "19.0.0",
      },
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactJSXRuntime,
  {
    files: ['**/*.{jsx,tsx}'], // Apply to React files
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    ignores: [
      '.next',      // Ignore .next directory
      'node_modules', // Ignore node_modules explicitly (optional)
    ],
  },
];
