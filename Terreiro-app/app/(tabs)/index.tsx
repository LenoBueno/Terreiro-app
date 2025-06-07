import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ThemedText } from '@/components/ThemedText';
import { useNavigationUtils } from '@/hooks/useNavigationUtils';
import { MenuItem } from '@/types';
import { MenuItemCard, RecentActivities, HeaderInfo } from '@/components/home';

const menuItems: MenuItem[] = [
  { id: '1', title: 'Eventos', icon: 'event', route: '/(tabs)/events' },
  { id: '2', title: 'Mensagens', icon: 'message', route: '/(tabs)/messages' },
  { id: '3', title: 'Banhos', icon: 'bathtub', route: '/(tabs)/baths' },
  { id: '4', title: 'Ervas', icon: 'spa', route: '/(tabs)/herbs' },
  { id: '5', title: 'Leituras', icon: 'menu-book', route: '/(tabs)/reading' },
  { id: '6', title: 'Configurações', icon: 'settings', route: '/(tabs)/settings' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { formatDate, navigateTo, getUserFirstName } = useNavigationUtils();
  
  const formattedDate = formatDate();
  const userName = getUserFirstName(user?.name);

  return (
    <ScreenContainer>
      <HeaderInfo userName={userName} formattedDate={formattedDate} />
      
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Bem-vindo ao Terreiro App
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Navegação Rápida
        </ThemedText>
        
        <View style={styles.gridContainer}>
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={() => navigateTo(item.route)}
            />
          ))}
        </View>

        <RecentActivities />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
