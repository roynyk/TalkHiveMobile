import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import api from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import TopCard from "@/components/TopCard";
import { Text } from "@/components/ui/text";
import { getImageUrl } from "@/utils";
import { formatTimeAgo } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { ActivitySkeleton } from "@/components/Skeletons";

export default function ActivityScreen() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get("/mobile/activity");
      setActivities(response.data.data);
    } catch (error) {
      console.log("Error loading activities:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchActivities();
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <TopCard title="Creator Hub" iconName="notifications" />

      {loading ? (
        <View>
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
        </View>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 24,
            flexGrow: 1,
          }}
          ListHeaderComponent={
            <View className="pt-6 pb-4">
              <Text className="text-2xl font-black text-slate-800 dark:text-white">
                Recent Activity
              </Text>
            </View>
          }
          renderItem={({ item, index }) => {
            const isFirst = index === 0;
            const isLast = index === activities.length - 1;

            return (
              <View
                className={`flex-row items-start p-4 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 ${
                  isFirst ? "rounded-t-2xl" : ""
                } ${isLast ? "rounded-b-2xl border-b-0" : ""}`}
              >
                {/*Penanda Blue Dot (Belum Follow Back) */}
                {item.type === "follow" && !item.user.isFollowingBack && (
                  <View className="justify-center h-12 mr-2">
                    <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  </View>
                )}

                {/*Foto Profil & Overlay Icon Aksi */}
                <View className="relative mr-3">
                  <Image
                    source={{
                      uri:
                        getImageUrl(item.user.photoProfile) ||
                        "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(item.user?.fullName || "U"),
                    }}
                    className="w-12 h-12 border rounded-full border-slate-100 dark:border-slate-800"
                  />
                  {item.type === "like" && (
                    <View className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full p-0.5 shadow-sm">
                      <Ionicons name="heart" size={10} color="#ef4444" />
                    </View>
                  )}
                  {item.type === "reply" && (
                    <View className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full p-0.5 shadow-sm">
                      <Ionicons name="chatbubble" size={10} color="#3b82f6" />
                    </View>
                  )}
                </View>

                {/* Bagian Informasi Detail Aktivitas */}
                <View className="flex-1">
                  <Text className="text-sm text-slate-700 dark:text-slate-200">
                    <Text className="font-bold text-slate-900 dark:text-white">
                      @{item.user.username}
                    </Text>{" "}
                    {item.type === "follow" && "started following you"}
                    {item.type === "like" && "liked your thread"}
                    {item.type === "reply" && "replied to your thread"}
                  </Text>

                  {/* Detil konten jika disukai */}
                  {item.type === "like" && item.thread && (
                    <View className="mt-0.5">
                      {item.thread.content ? (
                        <Text
                          className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 italic"
                          numberOfLines={1}
                        >
                          "{item.thread.content}"
                        </Text>
                      ) : (
                        // Jika kosong
                        <View className="flex-row items-center gap-1 mt-0.5">
                          <Ionicons
                            name="image-outline"
                            size={13}
                            color="#94a3b8"
                          />
                          <Text className="text-xs italic text-slate-400 dark:text-slate-500">
                            [Image]
                          </Text>
                        </View>
                      )}
                    </View>
                  )}

                  {/* Detil kotak kutipan komentar jika dibalas */}
                  {item.type === "reply" && (
                    <View className="p-3 mt-2 border bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 rounded-xl">
                      {item.content ? (
                        // Jika ada teks balasan, tampilkan teksnya
                        <Text className="text-xs italic text-slate-600 dark:text-slate-400">
                          "{item.content}"
                        </Text>
                      ) : (
                        // Jika kosong
                        <View className="flex-row items-center gap-1.5">
                          <Ionicons
                            name="image-outline"
                            size={14}
                            color="#64748b"
                          />
                          <Text className="text-xs italic text-slate-500">
                            [Image]
                          </Text>
                        </View>
                      )}
                    </View>
                  )}

                  {/* Tanggal Lampau */}
                  <Text className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    {formatTimeAgo(item.createdAt)}
                  </Text>
                </View>

                {/* Badge Status Kanan  */}
                {item.type === "follow" && (
                  <View
                    className={`px-4 py-1.5 rounded-full ${
                      item.user.isFollowingBack
                        ? "bg-slate-100 dark:bg-slate-800"
                        : "bg-blue-600"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        item.user.isFollowingBack
                          ? "text-slate-400 dark:text-slate-500"
                          : "text-white"
                      }`}
                    >
                      {item.user.isFollowingBack ? "Following" : "Follow Back"}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
          // Pull-to-refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0062ff"]}
            />
          }
          // Empty State ramah
          ListEmptyComponent={
            <View className="items-center justify-center flex-grow px-4 py-20">
              <Text className="mb-1 text-base font-bold text-center text-slate-800 dark:text-slate-100">
                No Recent Activity
              </Text>
              <Text className="text-xs leading-relaxed text-center text-slate-400 dark:text-slate-500">
                When people like, reply to your threads, or follow you, it will
                show up here.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
