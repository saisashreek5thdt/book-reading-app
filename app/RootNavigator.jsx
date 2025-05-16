// app/RootNavigator.js
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookDetail from "./component/BookDetail"; // deep screen
import Bookmark from "./screens/Bookmark";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

import colors from "./utils/colors";
import { useTheme } from "./utils/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { currentTheme, theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentTheme.background,
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? "#777" : "#ddd",
          height: 80,
          paddingTop: 4,
        },
        tabBarActiveTintColor: theme === "dark" ? colors.WHITE : colors.PRIMARY,
        tabBarInactiveTintColor: theme === "dark" ? "#cccccc" : "#555555",
        tabBarLabelStyle: {
          fontFamily: "Quicksand-Bold",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom tabs */}
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />

      {/* Fullscreen book detail (no tabs) */}
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={({ route }) => ({ title: route.params?.book?.title || "Book Detail" })}
      />
    </Stack.Navigator>
  );
}
