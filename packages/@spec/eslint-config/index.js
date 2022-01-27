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
    // 正在想办法解决 unknown 无法代替 any 的问题
    '@typescript-eslint/no-explicit-any': 'off',
    'tsdoc/syntax': 'warn',
    // 防止意外导入
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
