import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { getImageUrl } from "../utils";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import EditProfileModal from "@/components/EditProfileModal";
import { ProfileSkeleton } from "@/components/Skeletons";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/mobile/user");
      setUserData(response.data.data);
    } catch (error) {
      console.log("Error loading user profile:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0062ff"]}
            />
          }
          contentContainerStyle={{
            marginTop: 50,
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 40,
          }}
          className="flex-grow"
        >
          {/* A. Bagian Profil Atas */}
          <View className="items-center mb-6">
            <View className="relative rounded-full shadow-md">
              <Image
                source={{
                  uri:
                    getImageUrl(userData?.photoProfile) ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(userData?.fullName || "U"),
                }}
                className="border-4 border-white rounded-full w-28 h-28 dark:border-slate-900"
              />
            </View>

            <Text className="mt-4 text-xl font-black text-slate-800 dark:text-white">
              {userData?.fullName || "Name"}
            </Text>
            <Text className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              @{userData?.username || "username"}
            </Text>

            <Text className="px-6 mt-3 text-xs leading-relaxed text-center text-slate-500 dark:text-slate-400">
              {userData?.bio || "No bio added yet."}
            </Text>

            <View className="flex-row gap-8 mt-5">
              <View className="items-center">
                <Text className="text-base font-black text-slate-800 dark:text-white">
                  {userData?.followersCount || 0}
                </Text>
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Followers
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-base font-black text-slate-800 dark:text-white">
                  {userData?.followingCount || 0}
                </Text>
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Following
                </Text>
              </View>
            </View>
          </View>

          {/* B. Menu Pilihan List */}
          <Card className="mb-6 overflow-hidden bg-white border shadow-sm dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 rounded-2xl">
            {/* Tombol Edit Profile - Membuka Modal */}
            <TouchableOpacity
              onPress={() => setEditModalVisible(true)}
              className="flex-row items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/60 active:bg-slate-50 dark:active:bg-slate-800/50"
            >
              <View className="flex-row items-center gap-3">
                <Ionicons name="person-outline" size={20} color="#64748b" />
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Edit Profile
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            {/* Preferences */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/60 active:bg-slate-50 dark:active:bg-slate-800/50">
              <View className="flex-row items-center gap-3">
                <Ionicons name="options-outline" size={20} color="#64748b" />
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Preferences
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            {/* Privacy */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800/50">
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#64748b"
                />
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Privacy
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </Card>

          {/* C. Tombol Logout */}
          <TouchableOpacity
            onPress={signOut}
            className="flex-row items-center justify-center gap-2 py-4 bg-red-50 dark:bg-red-950/20 rounded-2xl active:bg-red-100 dark:active:bg-red-950/40"
          >
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            <Text className="text-sm font-bold tracking-wider text-red-500 uppercase">
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <EditProfileModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSaveSuccess={(updatedData) => setUserData(updatedData)}
        currentName={userData?.fullName || ""}
        currentBio={userData?.bio || ""}
      />
    </View>
  );
}
