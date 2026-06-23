import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSaveSuccess: (updatedData: any) => void;
  currentName: string;
  currentBio: string;
}

export default function EditProfileModal({
  visible,
  onClose,
  onSaveSuccess,
  currentName,
  currentBio,
}: EditProfileModalProps) {
  const [fullNameInput, setFullNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (visible) {
      setFullNameInput(currentName);
      setBioInput(currentBio);
    }
  }, [visible, currentName, currentBio]);

  const handleUpdateProfile = async () => {
    if (!fullNameInput.trim()) {
      Alert.alert("Error", "Nama tidak boleh kosong!");
      return;
    }

    setUpdating(true);
    try {
      // Mengirimkan request JSON biasa (sangat simpel & gampang dijelaskan)
      const response = await api.patch("/users/update", {
        fullName: fullNameInput,
        bio: bioInput,
      });

      if (response.data.status === "success") {
        Alert.alert("Sukses", "Profil berhasil diperbarui!");
        onSaveSuccess(response.data.data);
        onClose();
      }
    } catch (error: any) {
      console.log("Error updating profile:", error);
      const errorMsg =
        error.response?.data?.message || "Gagal memperbarui profil.";
      Alert.alert("Error", errorMsg);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Pressable className="justify-end flex-1 bg-black/50" onPress={onClose}>
          <Pressable
            className="p-6 bg-white border-t dark:bg-slate-900 rounded-t-3xl border-slate-100 dark:border-slate-800"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-black text-slate-800 dark:text-white">
                Edit Profile
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Form Input: Nama Lengkap */}
            <Text className="mb-2 text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Full Name
            </Text>
            <TextInput
              value={fullNameInput}
              onChangeText={setFullNameInput}
              placeholder="Enter your name"
              placeholderTextColor="#94a3b8"
              className="w-full border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-950 mb-5 font-semibold"
            />

            {/* Form Input: Bio */}
            <Text className="mb-2 text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Bio
            </Text>
            <TextInput
              value={bioInput}
              onChangeText={setBioInput}
              placeholder="Write something about yourself..."
              placeholderTextColor="#94a3b8"
              multiline={true}
              numberOfLines={3}
              style={{ textAlignVertical: "top" }}
              className="w-full border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-950 mb-6 font-medium h-24"
            />

            {/* Tombol Aksi */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="items-center flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl"
              >
                <Text className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateProfile}
                disabled={updating}
                className="flex-row items-center justify-center flex-1 gap-2 py-4 bg-blue-600 rounded-2xl"
              >
                {updating ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text className="text-sm font-bold text-white">
                    Save Changes
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
