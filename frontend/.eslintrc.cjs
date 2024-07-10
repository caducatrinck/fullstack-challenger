/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-console': 'warn',
    semi: ['error', 'always'],
    'vue/no-v-html': 'off',
    'vue/no-unused-vars': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-multiple-template-root': 'off',
    'vue/require-prop-types': 'error',
    'vue/require-default-prop': 'error',
    'vue/attribute-hyphenation': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSTypeAliasDeclaration',
        message: 'Declare types in a dedicated .d.ts file.'
      },
      {
        selector: 'TSInterfaceDeclaration',
        message: 'Declare interfaces in a dedicated .d.ts file.'
      }
    ]
  }
};
