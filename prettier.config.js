/**
 * @type {import('prettier').Config}
 */
export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  overrides: [
    {
      files: '*.css',
      options: {
        printWidth: 120,
        proseWrap: 'preserve',
      },
    },
    {
      files: 'LICENSE',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
  ],
  plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-packagejson'],
  jsdocDescriptionWithDot: true,
  jsdocPreferCodeFences: true,
  jsdocCommentLineStrategy: 'multiline',
  jsdocKeepUnParseAbleExampleIndent: true,
  jsdocTagsOrder: '{"example":100}',
  jsdocSeparateTagGroups: true,
};
