import React from "react";
import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Komponen UI dasar kita
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getImageUrl } from "@/utils";
import { CardThreadProps } from "@/types/Thread";

export default function CardThread({
  content,
  image,
  likes,
  replies,
}: CardThreadProps) {
  return (
    <Card className="p-5 mb-4 bg-white border shadow-sm dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
      {/* Isi Teks Thread */}
      <Text className="mb-3 text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
        {content}
      </Text>

      {/* Gambar Thread (Hanya dirender jika ada gambarnya) */}
      {image && (
        <View className="items-center justify-center w-full h-64 mb-3 overflow-hidden border rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-800">
          <Image
            source={{ uri: getImageUrl(image) }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      )}

      {/* Baris Bawah: Likes & Replies */}
      <View className="flex-row items-center gap-6 pt-3 border-t border-slate-50 dark:border-slate-800/50">
        {/* Likes (Ikon Hati berwarna Indigo/Ungu sesuai mockup) */}
        <View className="flex-row items-center gap-1.5">
          <MaterialIcons name="favorite-border" size={18} color="#6366F1" />
          <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {likes}
          </Text>
        </View>

        {/* Replies (Ikon Balasan berwarna Slate) */}
        <View className="flex-row items-center gap-1.5">
          <MaterialIcons name="chat-bubble-outline" size={18} color="#64748B" />
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {replies}
          </Text>
        </View>
      </View>
    </Card>
  );
}
