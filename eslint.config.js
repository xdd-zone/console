import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default antfu(
  {
    ignores: [
      'dist',
      'node_modules',
      'docs/**',
      '*.md',
      'pnpm-lock.yaml',
      '**/dist/**',
    ],
    lessOpinionated: true,
    type: 'app',
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': ['off', { allow: ['warn', 'error', 'info'] }],
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
      'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-imports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-interfaces': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-object-types': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-objects': ['error', { order: 'asc', type: 'natural' }],
      'quote-props': ['error', 'as-needed'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'regexp/no-unused-capturing-group': 'off',
      'style/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],
      'style/max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],
      'style/max-statements-per-line': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigPrettier,
)
