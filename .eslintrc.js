module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: { browser: true, node: true, es6: true },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
  },
};
