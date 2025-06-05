import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { MaterialIcons } from '@expo/vector-icons';

type DrawerItem = {
  route: string;
  label: string;
  adminOnly?: boolean;
};

const drawerItems: DrawerItem[] = [
  { route: '/(tabs)', label: 'Início' },
  { route: '/(tabs)/fronts', label: 'Frentes' },
  { route: '/(tabs)/events', label: 'Eventos' },
  { route: '/(tabs)/reading', label: 'Leitura' },
  { route: '/(tabs)/messages', label: 'Mensagens' },
  { route: '/(tabs)/cleaning', label: 'Limpeza' },
  { route: '/(tabs)/purchases', label: 'Compras' },
  { route: '/(tabs)/sales', label: 'Vendas' },
  { route: '/(tabs)/herbs', label: 'Ervas' },
  { route: '/(tabs)/baths', label: 'Banhos' },
  { route: '/(tabs)/chat', label: 'Chat' },
  { route: '/(tabs)/users', label: 'Usuários', adminOnly: true },
];

export function DrawerContent({ navigation }: DrawerContentComponentProps) {
  const { user, signOut } = useAuth();
  const { currentTenant } = useTenant();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = Boolean(user?.role === 'admin' || user?.role === 'superadmin');

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };
  
  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const handleNavigation = (route: string) => {
    closeDrawer();
    if (pathname !== route) {
      router.push(route as any);
    }
  };

  const isActive = (route: string) => {
    if (!pathname || !route) return false;
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const renderDrawerItems = () => {
    return drawerItems
      .filter(item => !item.adminOnly || isAdmin)
      .map((item) => (
        <TouchableOpacity 
          key={item.route}
          style={[
            styles.menuItem,
            isActive(item.route) && styles.activeMenuItem
          ]}
          onPress={() => handleNavigation(item.route)}
        >
          <Text style={[
            styles.menuText,
            isActive(item.route) && styles.activeMenuText
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ));
  };

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="blur-on" size={24} color="#006400" style={styles.logoIcon} />
          <Text style={styles.logoText}>Ylê Axé Xangô & Oxum</Text>
          <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.menuTitle}>Menu</Text>

      <View style={styles.menuSection}>
        {renderDrawerItems()}
      </View>

      <View style={styles.footer}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Image 
              source={require('@/assets/images/profile/user.jpg')} 
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>Leno</Text>
            <Text style={styles.userRole}>Admin</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
              <MaterialIcons name="logout" size={24} color="#B71C1C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    height: '100%',
    minHeight: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoIcon: {
    marginRight: 10,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#006400',
    flex: 1,
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#006400',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 4,
  },
  menuTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#757575',
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 8,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(0, 100, 0, 0.1)',
  },
  activeMenuText: {
    color: '#006400',
    fontFamily: 'Inter-Bold',
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#006400',
  },
  footer: {
    padding: 16,
    marginTop: 'auto',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
  },
  userRole: {
     fontFamily: 'Inter-Regular',
     fontSize: 14,
     color: '#757575',
   },
   iconContainer: {
     flexDirection: 'row',
     alignItems: 'center',
   },
});