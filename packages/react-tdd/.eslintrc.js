module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'import/no-unresolved': 'off', // /public 경로를 인식하지 못하는 문제가 있어서 off, import 경로는 ts에서 확인합니다.
    'import/order': getImportOrderRules(),
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  ignorePatterns: ['*.html', '*.cy.js', '*.cy.ts', '*.css'],
}

/**
 * @see https://www.npmjs.com/package/eslint-plugin-import
 * @see https://db2dev.tistory.com/entry/ESLint-importorder-규칙-설정하고-뒤죽박죽-import-코드-개선하기#newlines-between
 */
function getImportOrderRules() {
  return [
    'error',
    {
      groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'unknown'],
      pathGroups: [
        {
          pattern: '@/react*',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/hooks/*',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@/pages/*',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@/components/*',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '*.style',
          group: 'unknown',
        },
      ],
      pathGroupsExcludedImportTypes: ['@tanstack*'],
      alphabetize: {
        order: 'asc',
      },
    },
  ]
}
