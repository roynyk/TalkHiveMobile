import React from "react";
import { View } from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function WeeklyTrend() {
  return (
    <Card className="p-5 mb-6 bg-white border shadow-sm dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
      {/* Header Card */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-base font-black text-slate-800 dark:text-slate-100">
          Weekly Trend
        </Text>
        <Text className="text-xs font-bold text-blue-600 dark:text-blue-400">
          View Details
        </Text>
      </View>

      {/* SVG Wrapper Container */}
      <View className="w-full h-32 p-2 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950/40">
        <Svg viewBox="0 0 300 100" width="100%" height="100%">
          <Defs>
            {/* Definisikan gradien warna biru ke transparan */}
            <LinearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <Stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* 1. Menggambar area gradien di bawah garis kurva */}
          <Path
            d="M 0 80 C 70 80, 100 65, 150 45 C 200 25, 230 15, 300 15 L 300 100 L 0 100 Z"
            fill="url(#blueGradient)"
          />

          {/* 2. Menggambar garis kurva melengkung utama */}
          <Path
            d="M 0 80 C 70 80, 100 65, 150 45 C 200 25, 230 15, 300 15"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3.5"
          />

          {/* 3. Titik indikator bulat di tengah kurva */}
          <Circle
            cx="150"
            cy="45"
            r="4.5"
            fill="#ffffff"
            stroke="#2563eb"
            strokeWidth="2.5"
          />

          {/* 4. Titik indikator bulat di ujung kanan kurva */}
          <Circle
            cx="300"
            cy="15"
            r="4.5"
            fill="#ffffff"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
        </Svg>
      </View>
    </Card>
  );
}
