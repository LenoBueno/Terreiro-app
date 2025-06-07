module.exports = {
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  rules: {
    // Regras de TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Não requerer anotações de tipo explícito em funções exportadas
    '@typescript-eslint/no-explicit-any': 'warn', // Avisar sobre o uso de 'any'
    '@typescript-eslint/ban-ts-comment': 'warn', // Avisar sobre comentários @ts-ignore
    '@typescript-eslint/consistent-type-imports': 'error', // Forçar imports de tipo consistentes
    
    // Regras de React
    'react/prop-types': 'off', // Desativar validação de PropTypes (usando TypeScript)
    'react/display-name': 'off', // Não exigir displayName em componentes
    'react/react-in-jsx-scope': 'off', // Não exigir import React em arquivos JSX (React 17+)
    'react-hooks/rules-of-hooks': 'error', // Verificar regras dos Hooks
    'react-hooks/exhaustive-deps': 'warn', // Verificar dependências de efeitos
    
    // Regras de importação
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'off', // Desativado pois o TypeScript já lida com isso
    
    // Outras regras
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Apenas permitir console.warn e console.error
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
  },
  settings: {
    react: {
      version: 'detect', // Detectar automaticamente a versão do React
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Desativar regras que conflitam com TypeScript
        'no-undef': 'off', // TypeScript já lida com isso
        'no-unused-vars': 'off', // Usar @typescript-eslint/no-unused-vars
      },
    },
  ],
};
