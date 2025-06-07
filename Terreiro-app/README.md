# Terreiro App

Aplicativo móvel desenvolvido com React Native, Expo, TypeScript e Expo Router.

## 🚀 Começando

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Git

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd terreiro-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

## 🛠️ Estrutura do Projeto

```
terreiro-app/
├── app/                  # Rotas e telas do aplicativo
├── assets/               # Arquivos estáticos (imagens, fontes, etc.)
├── components/          # Componentes reutilizáveis
├── constants/           # Constantes e configurações
├── contexts/            # Contextos do React
├── hooks/               # Hooks personalizados
├── navigation/          # Configurações de navegação
├── types/               # Definições de tipos TypeScript
├── utils/               # Utilitários e funções auxiliares
├── .eslintrc.js         # Configuração do ESLint
├── .prettierrc          # Configuração do Prettier
├── babel.config.js      # Configuração do Babel
├── metro.config.js      # Configuração do Metro Bundler
├── tsconfig.json        # Configuração base do TypeScript
├── tsconfig.*.json      # Configurações específicas do TypeScript
└── package.json         # Dependências e scripts
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
EXPO_PUBLIC_API_URL=url_da_api
# Outras variáveis de ambiente
```

### Configurações do TypeScript

O projeto inclui várias configurações do TypeScript para diferentes cenários:

- `tsconfig.json` - Configuração base
- `tsconfig.dev.json` - Configuração para desenvolvimento
- `tsconfig.prod.json` - Configuração para produção
- `tsconfig.web.json` - Configuração para web
- `tsconfig.native.json` - Configuração para React Native
- `tsconfig.build.json` - Configuração para build
- `tsconfig.paths.json` - Aliases de caminho

## 🚦 Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm start

# Iniciar com cliente de desenvolvimento
npm run start:dev

# Iniciar em modo produção
npm run start:prod

# Iniciar no Android
expo start --android

# Iniciar no iOS
expo start --ios

# Iniciar na web
expo start --web
```

### Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Atualizar snapshots
npm run test:update
```

### Linting e Formatação

```bash
# Executar ESLint
npm run lint

# Corrigir problemas de linting
npm run lint:fix

# Formatar código com Prettier
npm run format
```

### Verificação de Tipos

```bash
# Verificar tipos
npm run typecheck

# Verificar tipos em modo watch
npm run typecheck:watch
```

## 🛠️ Ferramentas e Bibliotecas

- **UI**: React Native, Expo
- **Navegação**: Expo Router
- **Estilização**: StyleSheet, Styled Components
- **Gerenciamento de Estado**: Context API, Hooks
- **Tipagem**: TypeScript
- **Linting/Formatação**: ESLint, Prettier
- **Testes**: Jest, React Testing Library
- **Build**: Metro, Babel

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙌 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
