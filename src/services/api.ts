import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Ganti dengan IP lokal laptop jika pakai HP fisik
const API_BASE_URL = "http://192.168.18.36:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config: any) => {
  const token = await SecureStore.getItemAsync("user_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
