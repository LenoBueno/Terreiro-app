/// <reference types="@react-navigation/native" />

import { RootStackParamList, TabParamList } from './navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Tipos para os parâmetros de navegação
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Extensões para o módulo de navegação
declare module '@react-navigation/native' {
  export function useNavigation<T = NavigationProp<RootStackParamList>>(): T;
  export function useRoute<T = RouteProp<RootStackParamList>>(): T;
}

// Tipos para o tema
type ThemeColors = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
};

type Theme = {
  dark: boolean;
  colors: ThemeColors;
};

// Extensão para o tema
declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
