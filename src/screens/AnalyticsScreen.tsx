import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import api from "../services/api";
import TopCard from "@/components/TopCard";
import { Text } from "@/components/ui/text";
import CardThread from "@/components/CardThread";
import { Ionicons } from "@expo/vector-icons";
import { AnalyticSkeleton } from "@/components/Skeletons";

const rangeOptions = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 30 Days", value: "30" },
  { label: "All Time", value: "all" },
];

export default function AnalyticsScreen() {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [range, setRange] = useState<"7" | "30" | "all">("all");
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = rangeOptions.find((opt) => opt.value === range);

  useEffect(() => {
    fetchTopThreads();
  }, [range]);

  const fetchTopThreads = async () => {
    try {
      const rangeQuery = range === "all" ? "" : range;
      const response = await api.get(`/mobile/topThreads?range=${rangeQuery}`);
      setThreads(response.data.data.threads);
    } catch (error) {
      console.log("Error loading top threads:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTopThreads();
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <TopCard title="Top Performing Threads" iconName="trending-up" />

      <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <Text className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          Performance Ranking
        </Text>
        {/* Tombol Dropdown Custom */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
        >
          <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {selectedOption ? selectedOption.label : "Select Range"}
          </Text>
          <Ionicons name="chevron-down" size={14} color="#0062ff" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Pressable ini menutupi seluruh layar sebagai overlay gelap transparan */}
        <Pressable
          className="items-center justify-center flex-1 bg-black/40"
          onPress={() => setModalVisible(false)}
        >
          {/* Card Box Opsi Dropdown */}
          <View className="p-5 bg-white border shadow-xl w-72 dark:bg-slate-800 rounded-2xl border-slate-100 dark:border-slate-700">
            <Text className="px-1 mb-4 text-sm font-bold text-slate-800 dark:text-white">
              Select Time Range
            </Text>
            {rangeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  setRange(option.value as any);
                  setModalVisible(false);
                }}
                className={`flex-row items-center justify-between p-3 rounded-xl mb-1 ${
                  range === option.value
                    ? "bg-blue-50 dark:bg-blue-900/30"
                    : "active:bg-slate-50 dark:active:bg-slate-800"
                }`}
              >
                <Text
                  className={`text-sm ${
                    range === option.value
                      ? "font-semibold text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {option.label}
                </Text>

                {range === option.value && (
                  <Ionicons name="checkmark" size={16} color="#0062ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {loading ? (
        <View>
          <AnalyticSkeleton />
          <AnalyticSkeleton />
          <AnalyticSkeleton />
          <AnalyticSkeleton />
          <AnalyticSkeleton />
        </View>
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 24,
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <CardThread
              content={item.content}
              image={item.image}
              likes={item.likes}
              replies={item.replies}
            />
          )}
          // Mendukung Pull-to-Refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0062ff"]}
            />
          }
          // Empty State jika user belum memposting thread apa pun
          ListEmptyComponent={
            <View className="items-center justify-center flex-grow px-4 py-20">
              <Text className="mb-1 text-base font-bold text-center text-slate-800 dark:text-slate-100">
                No Threads Posted
              </Text>
              <Text className="text-xs leading-relaxed text-center text-slate-400 dark:text-slate-500">
                You haven't posted any threads yet. Head over to the web app to
                create your first content!
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
