import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/AppNavigationTypes";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id, name } = route.params;

  return (
    <View className="items-center justify-center flex-1 px-6 bg-white dark:bg-slate-900">
      <View className="items-center w-full p-6 mb-8 border bg-slate-50 dark:bg-slate-800 rounded-2xl border-slate-100 dark:border-slate-700">
        <Text className="mb-2 text-sm font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          Detail Produk
        </Text>
        <Text className="text-lg text-slate-800 dark:text-slate-200">
          ID Produk: <Text className="font-bold">{id}</Text>
        </Text>
        <Text className="mt-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          {name}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-full bg-slate-800 dark:bg-slate-700 py-3.5 rounded-lg items-center"
      >
        <Text className="text-base font-bold text-white">Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}
