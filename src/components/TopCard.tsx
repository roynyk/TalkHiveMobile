import React from "react";
import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/utils";

interface TopCardProps {
  title: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export default function TopCard({ title, iconName }: TopCardProps) {
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center justify-between px-6 pb-5 bg-white border-b pt-14 dark:bg-slate-900 border-slate-100 dark:border-slate-800/80">
      {/* Bagian Kiri: Icon + Judul Biru Brand */}
      <View className="flex-row items-center gap-2">
        {iconName && (
          <MaterialIcons name={iconName} size={22} color="#2563eb" />
        )}
        <Text className="text-lg font-black text-blue-600 dark:text-blue-400">
          {title}
        </Text>
      </View>

      {/* Bagian Kanan: Foto Profil Bulat */}
      <Image
        source={{
          uri:
            getImageUrl(user?.photoProfile) ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(user?.fullName || "U"),
        }}
        className="w-10 h-10 border rounded-full border-slate-100 dark:border-slate-800"
      />
    </View>
  );
}
