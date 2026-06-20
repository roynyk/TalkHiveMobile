import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

// Komponen UI dasar kita
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

// Definisi properti yang diterima oleh komponen
interface CardGraphicsProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  value: string;
  label: string;
  percentage: string;
  trend?: "up" | "down" | "neutral";
}

export default function CardGraphics({
  iconName,
  value,
  label,
  percentage,
  trend = "neutral",
}: CardGraphicsProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Warna ikon berdasarkan tema gelap/terang
  const iconColor = isDark ? "#94A3B8" : "#64748B";

  // Tentukan warna badge persentase berdasarkan trend
  let badgeBg = "bg-slate-100 dark:bg-slate-800";
  let badgeText = "text-slate-500 dark:text-slate-400";
  let trendSymbol = "";

  if (trend === "up") {
    badgeBg = "bg-green-100 dark:bg-green-950/50";
    badgeText = "text-green-600 dark:text-green-400";
    trendSymbol = "↑ ";
  } else if (trend === "down") {
    badgeBg = "bg-red-100 dark:bg-red-950/50";
    badgeText = "text-red-600 dark:text-red-400";
    trendSymbol = "↓ ";
  }

  return (
    // Lebar 48% (w-[48%]) agar muat 2 kolom berdampingan secara otomatis
    <Card className="w-[48%] p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm">
      {/* Baris Atas: Icon Bulat dan Persentase */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
          <MaterialIcons name={iconName} size={22} color={iconColor} />
        </View>
        <View className={`px-2 py-0.5 rounded-full ${badgeBg}`}>
          <Text className={`text-[10px] font-bold ${badgeText}`}>
            {trendSymbol}
            {percentage}
          </Text>
        </View>
      </View>

      {/* Baris Bawah: Angka Statistik dan Label */}
      <View className="gap-1">
        <Text className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          {value}
        </Text>
        <Text className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          {label}
        </Text>
      </View>
    </Card>
  );
}
