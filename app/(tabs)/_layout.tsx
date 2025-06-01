import { Tabs } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { Chrome as Home, Users, Calendar, Settings, ShieldAlert } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  const isSuperAdmin = user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || isSuperAdmin;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      {isAdmin && (
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
      )}
      
      {isAdmin && (
        <Tabs.Screen
          name="users"
          options={{
            title: 'Users',
            tabBarIcon: ({ color, size }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
      )}
      
      {isSuperAdmin && (
        <Tabs.Screen
          name="superadmin"
          options={{
            title: 'Super',
            tabBarIcon: ({ color, size }) => (
              <ShieldAlert size={size} color={color} />
            ),
          }}
        />
      )}
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}