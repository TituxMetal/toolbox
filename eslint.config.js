import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', 'dev-dist', 'node_modules']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
      'import': importPlugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'FunctionDeclaration',
          message:
            'Use arrow function expressions for components and utility functions instead of function declarations.'
        }
      ],
      'import/no-default-export': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [
        'error',
        {
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
          'pathGroups': [
            { pattern: 'node:*', group: 'builtin' },
            { pattern: '~/**', group: 'internal', position: 'after' }
          ],
          'pathGroupsExcludedImportTypes': ['builtin']
        }
      ],
      'import/newline-after-import': [
        'error',
        {
          count: 1,
          considerComments: true
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports'
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_*',
          argsIgnorePattern: '^_*'
        }
      ]
    }
  },
  {
    // Apply this configuration only to the specified config files
    files: ['vite.config.ts', 'eslint.config.js', 'pwa-assets.config.ts'],
    rules: {
      // Disable the default export rule for configuration files
      'import/no-default-export': 'off',

      // Allow the 'function' keyword for configuration files (optional but common)
      'no-restricted-syntax': 'off'
    }
  }
]
