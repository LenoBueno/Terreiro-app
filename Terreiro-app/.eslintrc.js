module.exports = {
  extends: [
    'expo',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'import', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      'babel-module': {},
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // Desativa a verificação de PropTypes em favor do TypeScript
    'react/react-in-jsx-scope': 'off', // Não é necessário importar React em arquivos .tsx com a versão 17+
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**/*.{js,jsx,ts,tsx}',
          '**/__mocks__/**/*.{js,jsx,ts,tsx}',
          '**/test-utils.{js,jsx,ts,tsx}',
        ],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/split-platform-components': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off', // Desativa a verificação de 'no-undef' para arquivos TypeScript
      },
    },
  ],
};
