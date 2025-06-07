module.exports = {
  // Configurações básicas
  printWidth: 100, // Largura máxima da linha
  tabWidth: 2, // Tamanho do tab
  useTabs: false, // Usar espaços ao invés de tabs
  semi: true, // Adicionar ponto e vírgula no final das linhas
  singleQuote: true, // Usar aspas simples
  quoteProps: 'as-needed', // Só adicionar aspas nas propriedades quando necessário
  jsxSingleQuote: false, // Usar aspas duplas em JSX
  trailingComma: 'es5', // Adicionar vírgula no final de objetos e arrays
  bracketSpacing: true, // Adicionar espaço entre colchetes { foo: bar }
  bracketSameLine: false, // Colocar o > de uma tag JSX na última linha
  arrowParens: 'always', // Sempre usar parênteses em arrow functions com um único parâmetro
  endOfLine: 'lf', // Usar quebras de linha LF
  
  // Configurações específicas para arquivos
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 2,
      },
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        // Configurações específicas para arquivos JavaScript/TypeScript
        singleQuote: true,
        jsxSingleQuote: false,
      },
    },
    {
      files: '*.{css,scss,less}',
      options: {
        parser: 'css',
        singleQuote: true,
      },
    },
  ],
};
