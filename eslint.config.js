import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';
import ts from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default ts.config([
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  eslintConfigPrettier,
  {
    ignores: ['dist/'],
  },
  {
    plugins: {
      import: eslintPluginImport,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      curly: ['error', 'all'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_' },
      ],
      'import/newline-after-import': [
        'error',
        { count: 1, exactCount: true, considerComments: true },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
    },
  },
]);
