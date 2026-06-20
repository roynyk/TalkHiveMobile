import React, { useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Circle, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

export default function LoginScreen({ navigation }: any) {
  const [validation, setValidation] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogin = async () => {
    if (!validation || !password) {
      Alert.alert("Error", "Semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        validation,
        password,
      });

      const { token, data } = response.data;

      Alert.alert("Sukses", `Selamat datang kembali, ${data.fullName}!`);
      await signIn(token);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Terjadi kesalahan koneksi.";
      Alert.alert("Login Gagal", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        className="flex-1 bg-blue-600 dark:bg-blue-950"
      >
        <View className="h-[28%] justify-end p-8 relative pb-10">
          <View className="absolute top-[-50px] left-[-30px] w-48 h-48 rounded-full bg-white/5" />
          <View className="absolute top-[20px] right-[-45px] w-64 h-64 rounded-full bg-white/10" />

          {/* Logo & Judul Sambutan */}
          <View className="z-10 flex-row items-center justify-between">
            <View>
              <Text className="text-4xl font-extrabold tracking-tight text-white">
                Hello!
              </Text>
              <Text className="mt-1 text-base font-medium text-blue-100/95">
                Welcome to TalkHive
              </Text>
            </View>
            {/* Logo Circle TalkHive */}
            <View className="p-3.5 rounded-3xl bg-white/10 border border-white/20">
              <Circle
                size={32}
                color="#ffffff"
                strokeWidth={2.5}
                fill="rgba(255, 255, 255, 0.2)"
              />
            </View>
          </View>
        </View>

        {/* 2. SISI BAWAH: Card Form Login Kapsul (Mendukung Dark Mode) */}
        <View className="flex-grow bg-white dark:bg-slate-900 rounded-t-[40px] px-8 pt-10 pb-8 border-t border-slate-100 dark:border-slate-800/80 shadow-2xl">
          <Text className="mb-6 text-2xl font-black text-blue-600 dark:text-blue-400">
            Login
          </Text>

          <View className="gap-5">
            {/* Input Email / Username */}
            <View className="relative justify-center">
              <View className="absolute z-10 left-4">
                <Mail size={18} color="#94A3B8" />
              </View>
              <Input
                className="pl-12 pr-4 text-sm font-medium border rounded-full h-14 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40"
                placeholder="Email or Username"
                placeholderTextColor={isDark ? "#4b5563" : "#9ca3af"}
                value={validation}
                onChangeText={setValidation}
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            {/* Input Password */}
            <View>
              <View className="relative justify-center">
                <View className="absolute z-10 left-4">
                  <Lock size={18} color="#94A3B8" />
                </View>
                <Input
                  className="pl-12 pr-12 text-sm font-medium border rounded-full h-14 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40"
                  placeholder="Password"
                  placeholderTextColor={isDark ? "#4b5563" : "#9ca3af"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute p-1 right-4"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#94A3B8" />
                  ) : (
                    <Eye size={18} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Lupa Password */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Forgot Password",
                    "Fitur reset password akan segera hadir!",
                  )
                }
                className="self-end mt-2"
              >
                <Text className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wide">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tombol Login Utama Kapsul */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="items-center justify-center mt-3 bg-blue-600 rounded-full shadow-lg h-14 active:bg-blue-700 dark:bg-blue-500 shadow-blue-500/20"
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text className="text-base font-bold tracking-wide text-white">
                  Login
                </Text>
              )}
            </TouchableOpacity>

            {/* Pembatas "Or login with" */}
            <View className="flex-row items-center my-4">
              <View className="flex-grow h-[1px] bg-slate-200 dark:bg-slate-800" />
              <Text className="mx-4 text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                Or login with
              </Text>
              <View className="flex-grow h-[1px] bg-slate-200 dark:bg-slate-800" />
            </View>

            {/* Grid Login Sosial Media */}
            <View className="flex-row justify-center gap-4">
              <TouchableOpacity className="items-center justify-center w-16 bg-white border shadow-sm h-14 dark:bg-slate-800 rounded-2xl border-slate-100 dark:border-slate-800/80 shadow-slate-100 dark:shadow-none">
                <FontAwesome name="facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity className="items-center justify-center w-16 bg-white border shadow-sm h-14 dark:bg-slate-800 rounded-2xl border-slate-100 dark:border-slate-800/80 shadow-slate-100 dark:shadow-none">
                <FontAwesome name="google" size={24} color="#EA4335" />
              </TouchableOpacity>
              <TouchableOpacity className="items-center justify-center w-16 bg-white border shadow-sm h-14 dark:bg-slate-800 rounded-2xl border-slate-100 dark:border-slate-800/80 shadow-slate-100 dark:shadow-none">
                <FontAwesome
                  name="apple"
                  size={24}
                  color={isDark ? "#ffffff" : "#000000"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Link Pendaftaran */}
          <View className="flex-row items-center justify-center gap-1 mt-10">
            <Text className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Don't have account?
            </Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Register", "Fitur registrasi akan segera hadir!")
              }
            >
              <Text className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
