import "./global.css";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { TouchableOpacity, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import CustomSplashScreen from "./src/components/CustomSplashScreen";

// Mencegah splash screen native bawaan Expo Go menahan layar terlalu lama
SplashScreen.preventAutoHideAsync().catch(() => {});

function FloatingThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="absolute z-50 items-center justify-center bg-white border rounded-full shadow-lg bottom-32 right-6 w-14 h-14 dark:bg-black border-slate-200 dark:border-slate-800"
    >
      <Text className="text-xl">{colorScheme === "dark" ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    // Segera sembunyikan splash screen native Expo Go begitu JS siap
    SplashScreen.hideAsync().catch(() => {});

    // Tampilkan custom splash screen buatan kita selama 1.5 detik
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={{ flex: 1 }} className="bg-blue-600 dark:bg-blue-950">
          <NavigationContainer
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AppNavigator />
          </NavigationContainer>

          <FloatingThemeToggle />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
