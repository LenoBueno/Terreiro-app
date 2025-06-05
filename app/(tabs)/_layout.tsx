import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

type ScreenConfig = {
  name: string;
  options?: object;
};

const screens: ScreenConfig[] = [
  { name: 'index' },
  { name: 'herbs' },
  { name: 'fronts' },
  { name: 'reading' },
  { name: 'baths' },
  { name: 'cleaning' },
  { name: 'events' },
  { name: 'messages' },
  { name: 'purchases' },
  { name: 'sales' },
  { name: 'chat' },
  { name: 'settings' },
  { name: 'superadmin' },
  { name: 'users' },
];

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name as any}
          options={screen.options || {}}
        />
      ))}
    </Stack>
  );
}