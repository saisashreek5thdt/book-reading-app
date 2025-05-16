// app/utils/theme.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import colors from "./colors";

const themes = {
  light: {
    background: colors.lightBG,
    text: colors.BLACK,
  },
  dark: {
    background: colors.darkBG,
    text: colors.WHITE,
  },
};

const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {},
  currentTheme: themes.light,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState("system");
  const [loaded, setLoaded] = useState(false);

  const loadTheme = async () => {
    const stored = await AsyncStorage.getItem("appTheme");
    if (stored) {
      setThemeState(stored);
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  const resolvedTheme = theme === "system" ? systemScheme ?? "light" : theme;

  const currentTheme = themes[resolvedTheme];

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
