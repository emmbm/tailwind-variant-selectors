import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
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
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      curly: ['error', 'all'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_' }
      ]
    }
  }
]);
