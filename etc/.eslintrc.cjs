module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'import/order': getImportOrderRules(),
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    'react/react-in-jsx-scope': 'off'
  }
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
          position: 'before'
        },
        {
          pattern: '@/hooks/*',
          group: 'internal',
          position: 'after'
        },
        {
          pattern: '@/pages/*',
          group: 'internal',
          position: 'after'
        },
        {
          pattern: '@/components/*',
          group: 'internal',
          position: 'after'
        },
        {
          pattern: '*.style',
          group: 'unknown'
        }
      ],
      pathGroupsExcludedImportTypes: ['@tanstack*'],
      alphabetize: {
        order: 'asc'
      }
    }
  ]
}
