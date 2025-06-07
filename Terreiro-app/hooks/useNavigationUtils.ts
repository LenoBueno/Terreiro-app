import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/types/navigation';

declare module 'expo-router' {
  export function useRouter(): {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
    canGoBack: () => boolean;
    setParams: (params: Record<string, string>) => void;
  };
}

/**
 * Parâmetros de navegação genéricos
 */
type NavigationParams = Record<string, string | number | boolean | undefined>;

/**
 * Interface para o retorno do hook useNavigationUtils
 */
interface NavigationUtils {
  formatDate: () => string;
  navigateTo: (route: `/${string}`, params?: NavigationParams) => void;
  getUserFirstName: (fullName?: string) => string;
  getCurrentPath: () => string;
  getQueryParams: () => Record<string, string>;
}

/**
 * Utilitários de navegação para uso em componentes React
 * @returns Objeto com funções úteis para navegação
 */
function useNavigationUtils(): NavigationUtils {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  /**
   * Formata a data atual no formato DD/MM/YYYY
   * @returns Data formatada como string
   */
  const formatDate = (): string => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Navega para uma rota específica com parâmetros opcionais
   * @param route - Rota de destino (ex: '/home')
   * @param params - Parâmetros opcionais para a rota
   */
  const pathname = usePathname();
  const params = useLocalSearchParams();

  const navigateTo = (route: `/${string}`, routeParams?: NavigationParams): void => {
    const queryString = routeParams 
      ? '?' + new URLSearchParams(
          Object.entries(routeParams)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
        ).toString()
      : '';
    
    router.push(`${route}${queryString}`);
  };

  /**
   * Extrai o primeiro nome de um nome completo
   * @param fullName - Nome completo do usuário
   * @returns Primeiro nome ou 'Visitante' se não houver nome
   */
  const getUserFirstName = (fullName?: string): string => {
    if (!fullName?.trim()) return 'Visitante';
    return fullName.split(' ')[0];
  };

  return {
    formatDate,
    navigateTo,
    getUserFirstName,
    getCurrentPath: () => pathname,
    getQueryParams: () => (params as Record<string, string>) || {},
  };
}

export { useNavigationUtils };

// Adicionando a exportação padrão para compatibilidade
export default useNavigationUtils;
