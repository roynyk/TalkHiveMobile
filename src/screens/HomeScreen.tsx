import React, { useEffect, useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import WelcomeHeader from "../components/WelcomeHeader";
import CardGraphics from "../components/CardGraphics";
import WeeklyTrend from "../components/WeeklyTrend";
import {
  HomeSkeleton,
  InsightSkeleton,
  TrendSkeleton,
} from "@/components/Skeletons";
import { Text } from "@/components/ui/text";
import api from "@/services/api";
import { getQuickInsight } from "@/utils";

export default function HomeScreen({ navigation }: any) {
  const [metriks, setMetriks] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMetriks();
  }, []);

  const fetchMetriks = async () => {
    try {
      setLoading(true);
      const reponse = await api.get("/mobile/home");
      setMetriks(reponse.data.data);
    } catch (error) {
      console.log(`Gagal mengambil metrik: ${error}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMetriks();
  };

  const getTrend = (growth: string): "up" | "down" | "neutral" => {
    if (!growth || growth === "0.0") return "neutral";
    if (growth.startsWith("-")) return "down";
    return "up";
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <WelcomeHeader />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0062ff"]}
          />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 px-5 pt-6"
      >
        {/* A. SKELETON / INSIGHT BANNER */}
        {loading ? (
          <InsightSkeleton />
        ) : (
          <View className="p-4 mb-4 border bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800/80 rounded-2xl">
            <Text className="text-xs font-bold text-blue-600 uppercase">
              Quick Insight
            </Text>
            <Text className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {getQuickInsight(metriks)}
            </Text>
          </View>
        )}

        {/* B. SKELETON / GRID 2x2 METRIKS */}
        {loading ? (
          <View className="flex-row flex-wrap justify-between mb-6 gap-y-4">
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between mb-6 gap-y-4">
            <CardGraphics
              iconName="people-outline"
              value={metriks?.followers?.total?.toLocaleString() || "0"}
              label="Followers"
              percentage={`${Math.abs(parseFloat(metriks?.followers?.growth || "0"))}%`}
              trend={getTrend(metriks?.followers?.growth)}
            />
            <CardGraphics
              iconName="chat-bubble-outline"
              value={metriks?.threads?.total?.toLocaleString() || "0"}
              label="Threads"
              percentage={`${Math.abs(parseFloat(metriks?.threads?.growth || "0"))}%`}
              trend={getTrend(metriks?.threads?.growth)}
            />
            <CardGraphics
              iconName="favorite-border"
              value={metriks?.likes?.total?.toLocaleString() || "0"}
              label="Total Likes"
              percentage={`${Math.abs(parseFloat(metriks?.likes?.growth || "0"))}%`}
              trend={getTrend(metriks?.likes?.growth)}
            />
            <CardGraphics
              iconName="reply"
              value={metriks?.replies?.total?.toLocaleString() || "0"}
              label="Replies"
              percentage={`${Math.abs(parseFloat(metriks?.replies?.growth || "0"))}%`}
              trend={getTrend(metriks?.replies?.growth)}
            />
          </View>
        )}
        {loading ? <TrendSkeleton /> : <WeeklyTrend />}
      </ScrollView>
    </View>
  );
}
