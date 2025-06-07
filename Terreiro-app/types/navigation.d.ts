import { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Tipos de navegação para a aplicação
 * 
 * Este arquivo define os tipos para as rotas e parâmetros de navegação
 * usando o React Navigation com TypeScript.
 */

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/**
 * Parâmetros para as rotas de autenticação
 */
export type AuthStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
  'reset-password': { token: string };
};

/**
 * Parâmetros para as rotas principais (tabs)
 */
export type TabParamList = {
  'index': undefined;          // Tela inicial
  'explore': undefined;       // Explorar
  'shop': undefined;          // Loja
  'messages': undefined;      // Mensagens
  'profile': undefined;       // Perfil
  'events': undefined;        // Eventos
  'calendar': undefined;      // Calendário
  'settings': undefined;      // Configurações
};

/**
 * Parâmetros para as rotas da aplicação
 */
// Criando um tipo que combina as rotas de autenticação com as outras rotas
type CombinedRoutes = {
  // Rotas principais (tabs)
  '(tabs)': NavigatorScreenParams<TabParamList>;
  
  // Rotas de autenticação
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
  'reset-password': { token: string };
  
  // Rotas de modais
  'event-details': { eventId: string };
  'product-details': { productId: string };
  'message-details': { messageId: string };
  
  // Outras rotas
  'not-found': undefined;
  'web-view': { url: string; title?: string };
};

export type RootStackParamList = CombinedRoutes;

// Tipos utilitários para navegação
type NavigationProp = import('@react-navigation/native').NavigationProp<RootStackParamList>;
type RouteProp = import('@react-navigation/native').RouteProp<RootStackParamList>;

/**
 * Extensões para os hooks de navegação
 */
declare module '@react-navigation/native' {
  export function useNavigation<T = NavigationProp>(): T;
  export function useRoute<T = RouteProp>(): T;
}

/**
 * Tipos para os parâmetros de navegação
 */
export type NavigationParams = {
  [key: string]: any;
};
