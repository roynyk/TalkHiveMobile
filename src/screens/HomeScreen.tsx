import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";

// Import Komponen Kita
import WelcomeHeader from "../components/WelcomeHeader";
import CardGraphics from "../components/CardGraphics";
import { Text } from "@/components/ui/text";

export default function HomeScreen({ navigation }: any) {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      {/* 1. Header Custom */}
      <WelcomeHeader />

      {/* Kita gunakan ScrollView agar layar nyaman di-scroll jika ada banyak card */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        className="flex-grow px-5 pt-6"
      >
        {/* Subtitle kecil tambahan */}
        <View className="p-4 mb-4 border bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800/80 rounded-2xl">
          <Text className="text-xs font-bold text-blue-600 uppercase">
            Quick Insight
          </Text>
          <Text className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Your engagement is up 12% this week!
          </Text>
        </View>

        {/* 2. Grid Utama (Render 4 Kali CardGraphics) */}
        <View className="flex-row flex-wrap justify-between mb-6 gap-y-4">
          <CardGraphics
            iconName="people-outline"
            value="1,204"
            label="Followers"
            percentage="2.4%"
            trend="up"
          />
          <CardGraphics
            iconName="chat-bubble-outline"
            value="45"
            label="Threads"
            percentage="0.0%"
            trend="neutral"
          />
          <CardGraphics
            iconName="favorite-border"
            value="8,430"
            label="Total Likes"
            percentage="8.1%"
            trend="up"
          />
          <CardGraphics
            iconName="reply"
            value="1,120"
            label="Replies"
            percentage="4.2%"
            trend="up"
          />
        </View>

        {/* Tombol Logout (sementara untuk tes keluar) */}
        <TouchableOpacity
          onPress={signOut}
          className="w-full bg-red-600 dark:bg-red-700 py-3.5 rounded-xl items-center"
        >
          <Text className="text-base font-bold text-white">
            Keluar (Logout)
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
