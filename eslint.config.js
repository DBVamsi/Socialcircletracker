import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    // Configuration for React/frontend files
    files: ['src/**/*.{js,jsx}'], // More specific path for React code
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020, // Or 'latest' if preferred
      globals: { ...globals.browser, ...globals.serviceworker }, // Added serviceworker for completeness
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Configuration for Firebase Functions (Node.js environment)
    files: ['functions/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020, // Or the Node version specified in package.json (e.g., 18 -> ES2022)
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused 'context' if named '_'
    },
  },
  {
    // Global JS configuration (e.g. for vite.config.js, eslint.config.js itself)
    // This assumes these top-level files are ES Modules. If not, adjust sourceType.
    files: ['*.js'],
    ignores: ['functions/**/*', 'src/**/*', 'dist/**/*'], // Corrected and added dist
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node, // For build scripts, etc.
    },
    rules: {
      'no-unused-vars': ['warn'], // Be less strict with config files
    },
  }
])
