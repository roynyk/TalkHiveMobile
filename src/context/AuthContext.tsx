import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { UserType } from "@/types/User";

interface AuthContextType {
  userToken: string | null;
  user: UserType | null;
  isLoading: boolean;
  signIn: (token: string, userData: UserType) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek apakah token sudah ada saat aplikasi pertama kali dibuka
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      let userData = null;
      try {
        token = await SecureStore.getItemAsync("user_token");
        const savedUser = await SecureStore.getItemAsync("user_data");
        if (savedUser) {
          userData = JSON.parse(savedUser);
        }
      } catch (e) {
        console.log("Gagal mengambil token:", e);
      }
      setUserToken(token);
      setUser(userData);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const signIn = async (token: string, userData: UserType) => {
    await SecureStore.setItemAsync("user_token", token);
    await SecureStore.setItemAsync("user_data", JSON.stringify(userData));
    setUserToken(token);
    setUser(userData);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("user_token");
    await SecureStore.deleteItemAsync("user_data");
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, isLoading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook agar lebih mudah digunakan di file lain
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
