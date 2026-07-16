import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'

const restrictedSyntaxRules = [
  {
    selector: 'AssignmentExpression[left.object.object.name="window"][left.object.property.name="location"][left.property.name="href"]',
    message: "Don't use `window.location.href` to navigate. Use `useNavigate` from 'react-router-dom' instead.",
  },
  {
    selector: 'AssignmentExpression[left.object.name="location"][left.property.name="href"]',
    message: "Don't use `location.href` to navigate. Use `useNavigate` from 'react-router-dom' instead.",
  },
  {
    selector: "JSXOpeningElement[name.name='a']:has(JSXAttribute[name.name='href'][value.value=/^(?!https?:|\\u002F\\u002F|mailto:|tel:|#).+/])",
    message: "Don't use relative paths in <a> tags. Use NavLink from 'react-router-dom' instead.",
  },
]

const clientConfig = {
  name: 'ai-tools-guide/client',
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    parser: tsEslint.parser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    import: importPlugin,
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'no-undef': 'off',
    'no-empty': 'off',
    'no-unused-labels': 'off',
    'no-console': 'off',
    'prefer-const': 'off',
    'no-control-regex': 'off',
    'no-useless-escape': 'off',
    'no-case-declarations': 'off',
    'no-constant-binary-expression': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'next/link',
            message: "Importing from 'next/link' is prohibited. Use `Link` from 'react-router-dom' instead.",
          },
        ],
      },
    ],
    'no-restricted-syntax': ['error', ...restrictedSyntaxRules],
  },
}

export default [
  globalIgnores(['dist', '**/components/ui/**']),
  ...tsEslint.configs.recommended,
  clientConfig,
]
