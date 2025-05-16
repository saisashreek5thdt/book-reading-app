import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBookmarks } from "../utils/BookMarkContext";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

const Bookmark = () => {
  const { currentTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[
        styles.bookmarkContainer,
        { backgroundColor: currentTheme.background },
      ]}
    >
      {bookmarks.length === 0 ? (
        <Text style={styles.empty}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookCard}
              onPress={() => navigation.navigate("BookDetail", { book: item })}
            >
              <Image source={{ uri: item.imageURL }} style={styles.bookImage} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>by {item.author}</Text>
                <Text style={styles.progress}>
                  Progress: {item.progress ?? 0}% read
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  bookmarkContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: colors.TEXT,
  },
  bookCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: colors.CARD,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.TEXT,
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
  progress: {
    marginTop: 6,
    fontSize: 13,
    color: colors.PRIMARY,
  },
});
