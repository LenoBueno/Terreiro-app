# Guia de Contribuição

Obrigado por considerar contribuir para o projeto Terreiro App! Este guia tem como objetivo ajudar você a contribuir de forma eficaz.

## 📋 Antes de começar

- Verifique se há uma [issue](link-para-issues) aberta relacionada à sua contribuição.
- Se não houver uma issue relacionada, abra uma descrevendo o problema ou melhoria.
- Aguarde a aprovação da issue antes de começar a trabalhar nela.

## 🛠 Configuração do Ambiente

1. Faça um fork do repositório
2. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/terreiro-app.git
   cd terreiro-app
   ```
3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```
4. Crie um branch para sua feature/correção:
   ```bash
   git checkout -b feature/nome-da-sua-feature
   # ou
   git checkout -b fix/nome-da-correcao
   ```

## 🔧 Desenvolvimento

- Siga o [Guia de Estilo de Código](#-guia-de-estilo-de-código).
- Escreva testes para novas funcionalidades.
- Atualize a documentação conforme necessário.
- Certifique-se de que os testes passem localmente.

### Guia de Estilo de Código

- Use TypeScript em todo o código-fonte.
- Siga as convenções de nomenclatura do React/React Native.
- Componentes devem ser escritos em PascalCase.
- Funções e variáveis devem usar camelCase.
- Constantes devem usar UPPER_SNAKE_CASE.
- Use aspas simples (') para strings em JavaScript/TypeScript.
- Use 2 espaços para indentação.
- Inclua ponto e vírgula no final das instruções.
- Comente o código quando necessário para explicar lógicas complexas.

## 🧪 Testes

- Escreva testes unitários para novas funcionalidades.
- Execute todos os testes antes de enviar suas alterações:
  ```bash
  npm test
  # ou
  yarn test
  ```
- Certifique-se de que a cobertura de testes não diminua.

## 📝 Commit

- Faça commits atômicos e bem descritos.
- Use o formato convencional de commit:
  ```
  tipo(escopo): descrição breve
  
  Descrição mais detalhada se necessário
  
  [OPCIONAL] Issues relacionadas: #123, #456
  ```
  
  Exemplo:
  ```
  feat(login): adiciona autenticação com Google
  
  - Implementa login com Google OAuth
  - Adiciona botão de login na tela inicial
  
  Fixes #123
  ```

## 🔄 Pull Request

1. Atualize seu fork com a branch principal:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git checkout sua-branch
   git merge main
   ```
2. Resolva quaisquer conflitos.
3. Envie suas alterações para seu fork:
   ```bash
   git push origin sua-branch
   ```
4. Abra um Pull Request (PR) para a branch `main`.
5. Preencha o template de PR com todas as informações solicitadas.
6. Aguarde a revisão da equipe.

## 📚 Recursos Úteis

- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Documentação do Expo](https://docs.expo.dev/)
- [Guia de Estilo de Código do Airbnb](https://github.com/airbnb/javascript)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🙏 Agradecimentos

Obrigado por contribuir para o Terreiro App! Sua ajuda é muito valiosa.
