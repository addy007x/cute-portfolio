import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useMaliFonts,
  Mali_400Regular,
  Mali_500Medium,
  Mali_600SemiBold,
  Mali_700Bold,
} from '@expo-google-fonts/mali';
import { useFonts as useFredokaFonts, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';

import { Screen } from './src/components/BottomNav';
import PortfolioScreen from './src/screens/PortfolioScreen';
import MarketScreen from './src/screens/MarketScreen';
import EarnScreen from './src/screens/EarnScreen';
import HistoryScreen from './src/screens/HistoryScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [screen, setScreen] = useState<Screen>('portfolio');

  const [maliLoaded] = useMaliFonts({ Mali_400Regular, Mali_500Medium, Mali_600SemiBold, Mali_700Bold });
  const [fredokaLoaded] = useFredokaFonts({ Fredoka_600SemiBold });
  const fontsLoaded = maliLoaded && fredokaLoaded;

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <StatusBar style="dark" />
        {screen === 'portfolio' && <PortfolioScreen onNavigate={setScreen} />}
        {screen === 'market' && <MarketScreen onNavigate={setScreen} />}
        {screen === 'earn' && <EarnScreen onNavigate={setScreen} />}
        {screen === 'history' && <HistoryScreen onNavigate={setScreen} />}
      </View>
    </SafeAreaProvider>
  );
}
