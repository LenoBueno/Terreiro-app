import { Tabs } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Chrome as Home, BookOpen, Calendar, MessageSquare, Droplets, Leaf, Bath } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reading"
        options={{
          title: 'Leitura',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Mensagens',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cleaning"
        options={{
          title: 'Limpeza',
          tabBarIcon: ({ color, size }) => <Droplets size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="herbs"
        options={{
          title: 'Ervas',
          tabBarIcon: ({ color, size }) => <Leaf size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="baths"
        options={{
          title: 'Banhos',
          tabBarIcon: ({ color, size }) => <Bath size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}