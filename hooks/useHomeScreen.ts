import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { MenuItem } from '@/@types/screens';

export function useHomeScreen() {
  const { user } = useAuth();
  
  // Formatar o nome do usuário
  const getUserName = useCallback(() => {
    return user?.name?.split(' ')[0] || 'Visitante';
  }, [user?.name]);

  // Gerar os itens do menu
  const getMenuItems = useCallback((): MenuItem[] => [
    { 
      id: '1',
      title: 'Ervas',
      icon: 'spa',
      color: '#4CAF50',
      route: '/(tabs)/herbs',
      image: require('@/assets/images/home/ervas.png')
    },
    { 
      id: '2',
      title: 'Frentes',
      icon: 'account-balance',
      color: '#2196F3',
      route: '/(tabs)/fronts',
      image: require('@/assets/images/home/frentes.png')
    },
    { 
      id: '3',
      title: 'Leitura',
      icon: 'menu-book',
      color: '#9C27B0',
      route: '/(tabs)/reading',
      image: require('@/assets/images/home/leitura.png')
    },
    { 
      id: '4',
      title: 'Eventos',
      icon: 'event',
      color: '#FF5722',
      route: '/(tabs)/events',
      image: require('@/assets/images/home/leitura.png') // Usando leitura.png como fallback
    },
    { 
      id: '5',
      title: 'Banhos',
      icon: 'bathtub',
      color: '#00BCD4',
      route: '/(tabs)/baths',
      image: require('@/assets/images/home/banhos.webp')
    },
    { 
      id: '6',
      title: 'Limpeza',
      icon: 'cleaning-services',
      color: '#673AB7',
      route: '/(tabs)/cleaning',
      image: require('@/assets/images/home/limpeza.png')
    },
  ], []);

  return {
    userName: getUserName(),
    menuItems: getMenuItems(),
  };
}
