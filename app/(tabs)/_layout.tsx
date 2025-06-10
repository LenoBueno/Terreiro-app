import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

type ScreenConfig = {
  name: string;
  options?: object;
};

const screens: (ScreenConfig | string)[] = [
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
  { name: 'add_frente' },
  { name: 'settings_new' },
  // Dynamic routes for herb details
  'herb_detail/lavender_detail',
  // Dynamic routes for fronts
  'fronts_detail/bara_detail',
  'fronts_detail/xapana_detail',
];

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      {screens.map((screen) => {
        if (typeof screen === 'string') {
          return <Stack.Screen key={screen} name={screen as any} />;
        }
        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name as any}
            options={screen.options || {}}
          />
        );
      })}
    </Stack>
  );
}