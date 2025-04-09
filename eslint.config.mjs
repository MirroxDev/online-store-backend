// eslint.config.mjs
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Базовая конфигурация ESLint
  js.configs.recommended,

  // Конфигурация для TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['eslint-recommended'].rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },

  // Конфигурация для NestJS
  {
    files: ['**/*.ts'],
    rules: {
      // Специфичные правила для NestJS
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },

  // Конфигурация для импортов
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Интеграция с Prettier
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },

  // Общие правила для всего проекта
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Используем @typescript-eslint/no-unused-vars вместо этого
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];