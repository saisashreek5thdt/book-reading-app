// BookList.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";
import Book from "./Book";

export default function BookList({ title, navigation }) {
  const { theme, currentTheme } = useTheme();

  return (
    <View style={{ backgroundColor: currentTheme.background }}>
      <View style={styles.bookListContainer}>
        <Text style={[styles.bookTextHead, { color: theme === 'dark' ? colors.WHITE : colors.PRIMARY }]}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.bookTextBTN, { color: theme === 'dark' ? colors.WHITE : colors.BLACK }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <Book navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  bookListContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  bookTextHead: {
    fontSize: 15,
    fontWeight: "medium",
    color: colors.PRIMARY,
    fontFamily: "Montserrat-Medium",
  },
  bookTextBTN: {
    fontSize: 12,
    fontWeight: "regular",
    fontFamily: "Quicksand-Bold",
    color: colors.BLACK,
    paddingRight: 18,
  },
});