import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 2021, // Use the latest ECMAScript version
      sourceType: 'module', // Allows the use of imports
      globals: {
        // Define any global variables here if needed
        // e.g., myGlobal: 'readonly',
      },
    },
    rules: {
      'semi': ['error', 'always'], // Require semicolons
      'quotes': ['error', 'single'], // Enforce single quotes for strings
      'indent': ['error', 2], // Enforce 2-space indentation
      'no-console': 'off', // Warn on console.log statements
      'eqeqeq': ['error', 'always'], // Require === and !==
      'no-unused-vars': ['warn'], // Warn on unused variables
      'curly': ['error', 'all'], // Require curly braces for all control statements
      'no-multi-spaces': 'error', // Disallow multiple spaces
      'consistent-return': 'error', // Require return statements to either always or never specify values
      'array-callback-return': 'error', // Enforce return statements in callbacks of array methods
    },
  },
  {
    // Specific configuration for test files
    files: ['*.test.js', '*.spec.js'],
    rules: {
      'no-unused-expressions': 'off', // Allow unused expressions in tests
    },
  },
]);