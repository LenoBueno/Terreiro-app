import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { Chrome as Home, Calendar, Users, MessageSquare, Settings, LogOut, ShieldAlert } from 'lucide-react-native';

export function DrawerContent(props: any) {
  const { user, signOut } = useAuth();
  const { currentTenant } = useTenant();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const isAdmin = user?.role === 'admin';
  const isSuperAdmin = user?.role === 'superadmin';

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/')}
        >
          <Home size={24} color="#000000" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        {isAdmin && (
          <>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/events')}
            >
              <Calendar size={24} color="#000000" />
              <Text style={styles.menuText}>Eventos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/users')}
            >
              <Users size={24} color="#000000" />
              <Text style={styles.menuText}>Usuários</Text>
            </TouchableOpacity>
          </>
        )}

        {isSuperAdmin && (
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/superadmin')}
          >
            <ShieldAlert size={24} color="#000000" />
            <Text style={styles.menuText}>Super Admin</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/chat')}
        >
          <MessageSquare size={24} color="#000000" />
          <Text style={styles.menuText}>Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <Settings size={24} color="#000000" />
          <Text style={styles.menuText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutItem]}
          onPress={handleSignOut}
        >
          <LogOut size={24} color="#B71C1C" />
          <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 'auto',
  },
  logoutItem: {
    marginTop: 8,
  },
  logoutText: {
    color: '#B71C1C',
  },
});