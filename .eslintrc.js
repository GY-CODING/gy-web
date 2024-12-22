module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    indent: ['warn', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react/no-unescaped-entities': 'warn',
    'no-constant-condition': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
