import 'react-native-reanimated';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { PaperProvider } from 'react-native-paper';
import { initDB } from '@/components/database/database';
import { useColorScheme } from '@/hooks/useColorScheme';
import { registerBackgroundSync } from '@/services/background';
import { NavigationController } from '@/components/navigation';
import { SessionProvider } from '@/providers/auth/SessionProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    initDB();
    registerBackgroundSync();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <StatusBar style="auto" />
          <NavigationController />
        </SessionProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
