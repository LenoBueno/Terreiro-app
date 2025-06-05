import { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { TenantProvider } from '@/context/TenantContext';
import { DrawerContent } from '@/components/DrawerContent';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <TenantProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <Drawer
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                backgroundColor: 'transparent',
                width: '100%',
              },
              overlayColor: 'rgba(0, 0, 0, 0.5)',
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="(auth)" options={{ swipeEnabled: false }} />
            <Drawer.Screen name="(tabs)" />
            <Drawer.Screen name="+not-found" options={{ title: 'Oops!' }} />
          </Drawer>
        </AuthProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}