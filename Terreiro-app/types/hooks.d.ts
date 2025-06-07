import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from './navigation';

declare module '@/hooks/useNavigationUtils' {
  /**
   * Hook que fornece utilitários de navegação
   */
  export function useNavigationUtils(): {
    /**
     * Formata a data atual no formato DD/MM/YYYY
     */
    formatDate: () => string;
    
    /**
     * Navega para uma rota específica com parâmetros opcionais
     * @param route - Rota de destino (ex: '/home')
     * @param params - Parâmetros opcionais para a rota
     */
    navigateTo: (route: `/${string}`, params?: Record<string, unknown>) => void;
    
    /**
     * Extrai o primeiro nome de um nome completo
     * @param fullName - Nome completo do usuário
     * @returns Primeiro nome ou 'Visitante' se não houver nome
     */
    getUserFirstName: (fullName?: string) => string;
  };
}

declare module '@/hooks/useThemeColor' {
  /**
   * Hook que retorna a cor baseada no tema atual (claro/escuro)
   * @param props - Objeto com as cores para tema claro e escuro
   * @param colorName - Nome da cor no tema (deve existir em Colors.light e Colors.dark)
   * @returns A cor correspondente ao tema atual
   */
  export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof import('@/constants/Colors').Colors.light & 
               keyof typeof import('@/constants/Colors').Colors.dark
  ): string;
}

declare module '@/hooks/useColorScheme' {
  /**
   * Hook que retorna o esquema de cores atual ('light' ou 'dark')
   */
  export function useColorScheme(): 'light' | 'dark' | null | undefined;
}

// Tipos para os parâmetros de navegação
type NavigationParams = {
  [key: string]: string | number | boolean | undefined;
};

// Extensões para o módulo de navegação
declare module '@react-navigation/native' {
  export function useNavigation<T = DrawerNavigationProp<RootStackParamList>>(): T;
  export function useRoute<T = any>(): { params: T };
}
