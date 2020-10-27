module.exports = {
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint',
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'require-atomic-updates': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['dotenv'],
      },
    ],
  },
};
