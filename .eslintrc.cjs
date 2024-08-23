module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },

  ignorePatterns: ['dist', '.eslintrc.cjs', 'dist-electron'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react-hooks',
    '@typescript-eslint',
    'tailwindcss'
  ],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
      ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  }
}
