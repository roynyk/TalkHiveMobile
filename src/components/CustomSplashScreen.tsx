import React from "react";
import { View, Image, Text } from "react-native";

export default function CustomSplashScreen() {
  return (
    <View className="items-center justify-center flex-1 bg-blue-600 dark:bg-blue-950">
      <View className="items-center">
        <Image
          source={require("../../assets/splash-icon.png")}
          style={{ width: 130, height: 130, borderRadius: 28 }}
          resizeMode="contain"
        />
        <Text className="mt-5 text-3xl font-black tracking-wider text-white">
          TalkHive
        </Text>
        <Text className="mt-2 text-sm font-medium text-blue-100">
          Mobile Creator Hub
        </Text>
      </View>
    </View>
  );
}
