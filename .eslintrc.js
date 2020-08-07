module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],

  plugins: ['prettier'],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
