// app/screens/Profile.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

const Profile = () => {
  const { theme, setTheme, currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Theme: {theme}</Text>
      <View style={styles.buttonGroup}>
        {["light", "dark", "system"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.button,
              {
                backgroundColor:
                  theme === mode ? colors.PRIMARY : currentTheme.background,
                borderColor: colors.PRIMARY,
              },
            ]}
            onPress={() => setTheme(mode)}
          >
            <Text
              style={{
                color: theme === mode ? colors.WHITE : currentTheme.text,
                fontFamily: "Quicksand-Bold",
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontFamily: "Montserrat-Bold",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
});

export default Profile;
