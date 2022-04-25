module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'no-alert': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'max-depth': [1, 2],
  },
};
