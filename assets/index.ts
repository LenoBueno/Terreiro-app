/**
 * Imports de imagens
 * Organize as importações por categoria
 */

// Imagens de autenticação
export const AuthImages = {
  // Exemplo:
  // background: require('./images/auth/background.jpg'),
};

// Imagens de ervas
export const HerbsImages = {
  alecrim: require('./images/herbs/alecrim.webp'),
  alfazema: require('./images/herbs/alfazema.webp'),
  aroeira: require('./images/herbs/aroeira.webp'),
  arruda: require('./images/herbs/arruda.webp'),
  espadaSaoJorge: require('./images/herbs/espada-sao-jorge.webp'),
  eucalipto: require('./images/herbs/eucalipto.webp'),
  guine: require('./images/herbs/guine.webp'),
};

// Imagens de eventos
export const EventImages = {
  // Exemplo:
  // default: require('./images/events/event-default.jpg'),
};

// Imagens de perfil
export const ProfileImages = {
  // Exemplo:
  // default: require('./images/profile/avatar-default.png'),
};

// Ícones da barra de navegação
export const TabIcons = {
  // Exemplo:
  // home: require('./icons/tab/home.png'),
  // events: require('./icons/tab/events.png'),
};

// Ícones comuns
export const CommonIcons = {
  // Exemplo:
  // user: require('./icons/common/user.png'),
  // settings: require('./icons/common/settings.png'),
};

// Exporta todos os assets em um único objeto para facilitar a importação
export default {
  ...AuthImages,
  ...EventImages,
  ...ProfileImages,
  ...TabIcons,
  ...CommonIcons,
  ...HerbsImages,
};
