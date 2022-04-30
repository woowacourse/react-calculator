module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: 'react-app',
  rules: {
    'react/no-unused-class-component-methods': 'warn',
  },
};
