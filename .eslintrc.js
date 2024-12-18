module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // Añadir esta línea para especificar la versión de React
    },
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': [
      'error', // Añadir la severidad aquí
      {
        singleQuote: true,
        semi: true,
        endOfLine: 'auto',
      },
    ],
  },
};
