// App.js
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import RootNavigator from "./app/RootNavigator";
import { BookmarkProvider } from "./app/utils/BookMarkContext";
import { ThemeProvider } from "./app/utils/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <RootApp />
      </BookmarkProvider>
    </ThemeProvider>
  );
}

function RootApp() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { currentTheme } = require("./app/utils/theme").useTheme();

  if (!fontsLoaded) return null;

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
