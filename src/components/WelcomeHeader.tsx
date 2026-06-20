import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";

export default function WelcomeHeader() {
  return (
    <View className="flex-row items-center justify-between px-6 pb-5 bg-white border-b pt-14 dark:bg-slate-900 border-slate-100 dark:border-slate-800/80">
      <View className="gap-1">
        <Text className="text-2xl font-black text-slate-800 dark:text-slate-100">
          Hello, @johndoe!
        </Text>
        <Text className="text-xs text-slate-400 dark:text-slate-500">
          Here is your performance overview.
        </Text>
      </View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        }}
        className="w-12 h-12 border rounded-full border-slate-100 dark:border-slate-800"
      />
    </View>
  );
}
