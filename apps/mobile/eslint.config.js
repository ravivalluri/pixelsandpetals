// @ts-check

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
        exports: 'readonly',
        global: 'readonly',
      },
      parser: require('@typescript-eslint/parser'),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'react': require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React is not required to be imported in React 17+
      'react/prop-types': 'off', // Not using prop-types since using TypeScript
      'react/jsx-uses-react': 'off', // React is not required to be imported in React 17+
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off', // Using the TS version instead
      'no-undef': 'off', // Let TypeScript handle this
      'no-console': 'warn',
      'prefer-const': 'warn',
      'eqeqeq': 'warn',
      'no-var': 'warn',
      'camelcase': 'off', // Too many existing violations to address now
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'comma-dangle': ['warn', 'always-multiline'],
      'object-curly-spacing': ['warn', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'eol-last': ['warn', 'always'],
      'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],
    },
  },
];