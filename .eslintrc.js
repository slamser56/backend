module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'new-cap': 'off',
    'no-throw-literal': 'off',
    'no-underscore-dangle':  ['error', { 'allow': ['_id'] }],
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'off',
    'max-len': ["error", { "code": 120 }],
    'import/extensions': [
       'error',
       'ignorePackages',
       {
         js: 'never',
         jsx: 'never',
         ts: 'never',
         tsx: 'never'
       }
    ]
 }
};
