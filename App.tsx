import "./global.css";
import React from "react";
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

function FloatingThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="absolute z-50 items-center justify-center bg-white border rounded-full shadow-lg bottom-24 right-6 w-14 h-14 dark:bg-black border-slate-200 dark:border-slate-800"
    >
      <Text className="text-xl">{colorScheme === "dark" ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  // 2. Ambil status colorScheme di sini
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={{ flex: 1 }}>
          {/* 3. Pasang tema dinamis di NavigationContainer */}
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
