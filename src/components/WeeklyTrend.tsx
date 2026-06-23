import React from "react";
import { View } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function WeeklyTrend() {
  // Data dummy perkembangan followers selama 7 hari terakhir (statis)
  // Sangat mudah dipelajari dan diubah nilainya sewaktu-waktu
  const dailyData = [35, 48, 42, 65, 58, 78, 92]; // Pola naik dari Senin ke Minggu (dalam persen %)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card className="p-5 mb-6 bg-white border shadow-sm dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
      {/* Header Kartu */}
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-base font-black text-slate-800 dark:text-slate-100">
            Followers Growth
          </Text>
          <Text className="text-xs text-slate-400 dark:text-slate-500">
            Weekly performance overview
          </Text>
        </View>
        {/* Persentase Naik Dummy */}
        <Text className="text-xs font-bold text-blue-600 dark:text-blue-400">
          ▲ +15.4%
        </Text>
      </View>

      {/* Area Grafik Batang */}
      <View className="flex-row items-end justify-between h-24 px-2">
        {dailyData.map((value, index) => (
          <View key={index} className="items-center flex-1">
            {/* Tiang Track Abu-abu */}
            <View className="w-3.5 h-20 bg-slate-100 dark:bg-slate-800 rounded-full justify-end overflow-hidden">
              {/* Batang Aktif Biru (Tinggi diatur sesuai array dummy di atas) */}
              <View
                style={{ height: `${value}%` }}
                className="w-full bg-blue-500 rounded-full dark:bg-blue-600"
              />
            </View>

            {/* Label Hari */}
            <Text className="mt-2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
              {days[index]}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
