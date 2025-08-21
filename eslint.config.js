import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      react.configs['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'plugin:prettier/recommended',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'warn',
      'react/display-name': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: false,
          printWidth: 130,
          tabWidth: 2,
        },
      ],
    },
  },
]);

