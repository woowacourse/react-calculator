module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    radix: 'off',
    'no-unused-vars': 'off',
    'no-restricted-properties': 'off',
    'max-depth': ['error', 2],
    'no-return-assign': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'react/no-array-index-key': 'off',
  },
};
