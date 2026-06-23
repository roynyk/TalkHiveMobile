import React from "react";
import { View } from "react-native";

// 1. SKELETON UNTUK METRIKS CARD (HOME SCREEN)
export const HomeSkeleton = () => {
  return (
    <View className="w-[48%] p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm h-36 justify-between">
      <View className="flex-row items-center justify-between mb-5">
        <View className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <View className="w-12 h-5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </View>
      <View className="gap-2">
        <View className="w-20 rounded-md h-7 bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <View className="w-16 h-3.5 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </View>
    </View>
  );
};

// 2. SKELETON UNTUK GRAFIK (HOME SCREEN)
export const TrendSkeleton = () => {
  return (
    <View className="p-5 mb-6 bg-white border shadow-sm dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
      <View className="flex-row items-center justify-between mb-4">
        <View className="h-5 rounded-md w-28 bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <View className="w-16 h-4 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </View>
      <View className="w-full h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
    </View>
  );
};

// 3. SKELETON UNTUK BANNER INSIGHT (HOME SCREEN)
export const InsightSkeleton = () => {
  return (
    <View className="p-4 mb-4 bg-white border dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
      <View className="w-24 h-4 mb-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <View className="w-full h-5 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
    </View>
  );
};

// 4. SKELETON UNTUK CARD THREAD (ANALYTICS SCREEN)
export const AnalyticSkeleton = () => {
  return (
    <View className="p-5 mb-4 bg-white border shadow-sm dark:bg-slate-900 rounded-3xl border-slate-100 dark:border-slate-800">
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <View className="ml-3">
            <View className="w-32 h-4 mb-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <View className="w-16 h-3 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </View>
        </View>
      </View>
      <View className="mb-6">
        <View className="w-full h-4 mb-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <View className="w-3/4 h-4 mb-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <View className="w-1/2 h-4 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </View>
      <View className="h-[1px] bg-slate-100 dark:bg-slate-800 w-full mb-4" />
      <View className="flex-row items-center gap-6">
        <View className="flex-row items-center">
          <View className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <View className="w-8 h-4 ml-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </View>
        <View className="flex-row items-center">
          <View className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <View className="w-8 h-4 ml-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </View>
      </View>
    </View>
  );
};

// 5. SKELETON UNTUK LIST NOTIFIKASI/AKTIVITAS (ACTIVITY SCREEN)
export const ActivitySkeleton = () => {
  return (
    <View className="flex-row items-start p-4 bg-white border-b dark:bg-slate-900 border-slate-100 dark:border-slate-800/80">
      <View className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <View className="flex-1 ml-4">
        <View className="flex-row items-center mb-2">
          <View className="w-24 h-4 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <View className="w-32 h-3 ml-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </View>
        <View className="w-full h-10 mt-2 bg-slate-50 dark:bg-slate-800 rounded-xl animate-pulse" />
      </View>
    </View>
  );
};

// 6. SKELETON UNTUK PROFIL LENGKAP (PROFILE SCREEN)
export const ProfileSkeleton = () => {
  return (
    <View className="items-center flex-1 px-5 pt-16 bg-slate-50 dark:bg-slate-950">
      {/* Avatar Bulat */}
      <View className="border-4 border-white rounded-full shadow-sm w-28 h-28 bg-slate-200 dark:bg-slate-800 animate-pulse dark:border-slate-900" />

      {/* Teks Nama & Username */}
      <View className="h-6 mt-4 rounded-md w-36 bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <View className="w-24 h-4 mt-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />

      {/* Deskripsi Bio */}
      <View className="w-4/5 h-3.5 mt-4 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <View className="w-2/3 h-3.5 mt-2 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />

      {/* Angka Followers & Following */}
      <View className="flex-row gap-12 mt-6">
        <View className="items-center">
          <View className="w-8 h-5 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <View className="w-16 h-3 mt-1.5 rounded-md bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
        </View>
        <View className="items-center">
          <View className="w-8 h-5 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <View className="w-16 h-3 mt-1.5 rounded-md bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
        </View>
      </View>

      {/* List Menu List Item */}
      <View className="w-full mt-8 overflow-hidden bg-white border shadow-sm dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
        {[1, 2, 3].map((val) => (
          <View
            key={val}
            className="flex-row items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800/40"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <View className="w-24 h-4 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </View>
            <View className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </View>
        ))}
      </View>

      {/* Tombol Logout */}
      <View className="items-center w-full py-6 mt-6 bg-slate-100 dark:bg-slate-900/40 rounded-2xl animate-pulse" />
    </View>
  );
};
