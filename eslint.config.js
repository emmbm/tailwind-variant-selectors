import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    ignores: ['dist/'],
    rules: {
      'import/no-duplicates': 'error',
      curly: ['error', 'all'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_' }
      ]
    }
  }
];
