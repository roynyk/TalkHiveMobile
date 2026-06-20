import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/AnalyticsScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  RootStackParamList,
  RootTabParamList,
} from "../types/AppNavigationTypes";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import ActivityScreen from "@/screens/ActivityScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AnalyticsTab") {
            iconName = focused ? "analytics-sharp" : "analytics-outline";
          } else if (route.name === "ActivityTab") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0062ff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen
        name="AnalyticsTab"
        component={AnalyticsScreen}
        options={{ title: "Analytics" }}
      ></Tab.Screen>
      <Tab.Screen
        name="ActivityTab"
        component={ActivityScreen}
        options={{ title: "Activity" }}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { userToken, isLoading } = useAuth();
  // Tampilkan loading spinner jika sedang mengecek token di memori HP
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121216",
        }}
      >
        <ActivityIndicator size="large" color="#0062ff" />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      {userToken === null ? (
        // Rute untuk user yang BELUM LOGIN
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        // Rute untuk user yang SUDAH LOGIN
        <>
          <Stack.Screen
            name="MainApp"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: "Product Activities",
              headerStyle: { backgroundColor: "#0543c1" },
              headerTintColor: "#ffffff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
