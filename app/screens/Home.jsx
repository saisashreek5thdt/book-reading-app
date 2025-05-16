import { ScrollView, StyleSheet, View } from "react-native";
import BookList from "../component/BookList";
import { useTheme } from "../utils/theme";

export default function Home({ navigation }) {
  const { currentTheme } = useTheme();

  return (
    <View
      style={[
        styles.bookContainer,
        { backgroundColor: currentTheme.background },
      ]}
    >
      <ScrollView>
        <BookList title="Reading" navigation={navigation} />
        <BookList title="Trending Now" navigation={navigation} />
        <BookList title="Recommended" navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    padding: 20,
    marginTop: 20,
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
