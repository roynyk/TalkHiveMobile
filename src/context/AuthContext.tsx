import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek apakah token sudah ada saat aplikasi pertama kali dibuka
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      try {
        token = await SecureStore.getItemAsync("user_token");
      } catch (e) {
        console.log("Gagal mengambil token:", e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const signIn = async (token: string) => {
    await SecureStore.setItemAsync("user_token", token);
    setUserToken(token);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("user_token");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, signIn, signOut }}>
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
