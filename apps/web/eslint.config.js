import next from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'

/** @type {import('@types/eslint').Linter.FlatConfig[]} */
export default [
  ...tseslint.configs.recommended,
  {
    plugins: {
      'next': next,
    },
    rules: {
      // Allow unused variables when prefixed with underscore
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      'next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
]