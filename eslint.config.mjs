import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const nodeGlobals = {
  require: 'readonly',
  module: 'readonly',
  exports: 'writable',
  global: 'readonly',
  process: 'readonly',
  Buffer: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
};

const jestGlobals = {
  describe: 'readonly',
  test: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  jest: 'readonly',
};

export default [
  // Base JS config
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: nodeGlobals,
    },
    rules: {
      // Enforce 2-space indentation
      indent: ['error', 2],
      // Enforce semicolons at the end of statements
      semi: ['error', 'always'],
      // Prefer single quotes for strings
      quotes: ['error', 'single', { avoidEscape: true }],
      // Enforce consistent spacing before function parentheses
      'space-before-function-paren': ['error', 'never'],
      // Disallow unused variables
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Prefer `const` over `let` where possible
      'prefer-const': 'error',
      // Disallow `console` except for warning or error messages
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Encourage using `arrow functions` where appropriate
      'prefer-arrow-callback': 'error',
      // Disallow `var` (use `let` or `const`)
      'no-var': 'error',
      // Enforce consistent spacing around operators
      'space-infix-ops': 'error',
      // Encourage the use of strict equality (`===`)
      eqeqeq: ['error', 'always'],
    },
  },
  // Jest globals for test files
  {
    files: ['test/**/*', '**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: { ...nodeGlobals, ...jestGlobals },
    },
    rules: {
      // Disable no-undef for test files
      'no-undef': 'off',
    },
  },
  // Allow console and unused vars in CLI and template files
  {
    files: ['bin/**/*.js', 'templates/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
    },
  },
  // Prettier must be last
  prettierRecommended,
];
