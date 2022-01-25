// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  plugins: ['@typescript-eslint', 'import', 'tsdoc'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    // 不进行强制的 null 检查
    // 否则所有使用 ! 的地方都无法使用
    '@typescript-eslint/no-non-null-assertion': 'off',
    'tsdoc/syntax': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'tsdoc/syntax': 'off'
      }
    },
    {
      files: ['test', '__test__', '*.{spec,test}.ts'],
      env: {
        jest: true
      },
      rules: {
        'tsdoc/syntax': 'off',
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
}

module.exports = config
