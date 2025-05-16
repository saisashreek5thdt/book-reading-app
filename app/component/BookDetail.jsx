import Feather from "@expo/vector-icons/Feather";
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookmarks } from "../utils/BookMarkContext";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

export default function BookDetail({ route, navigation }) {
  const { book } = route.params;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addBookmark } = useBookmarks();

  const handleBookmark = () => {
    addBookmark(book);

    if (Platform.OS === "android") {
      ToastAndroid.show("Book added to bookmarks!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Bookmarked", "Book added to bookmarks!");
    }

    navigation.navigate("Main", { screen: "Bookmark" }); // Ensure 'Bookmark' screen is registered in your navigator
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? colors.BLACK : colors.WHITE },
      ]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.PRIMARY}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.PRIMARY }]}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={24} color={colors.WHITE} />
            <Text style={[styles.headerText, { color: colors.WHITE }]}>Back</Text>
          </TouchableOpacity>

          <View style={styles.shareOptions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="share" size={24} color={colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleBookmark}>
              <Feather name="bookmark" size={24} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Image */}
        <View style={styles.imageContainer}>
          <Image style={styles.bookImage} source={{ uri: book.imageURL }} />
        </View>

        {/* Book Info */}
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.title,
              { color: isDark ? colors.WHITE : colors.WHITE },
            ]}
          >
            {book.title}
          </Text>
          <Text
            style={[styles.author, { color: isDark ? colors.WHITE : colors.PRIMARY }]}
          >
            by {book.author}
          </Text>

          <View style={styles.metaInfo}>
            <View style={styles.metaGroup}>
              <Text style={styles.metaLabel}>Rating</Text>
              <Text style={[styles.metaValue, { color: isDark ? colors.WHITE : colors.PRIMARY }]}>{book.rating}</Text>
            </View>
            <View style={styles.metaGroup}>
              <Text style={styles.metaLabel}>Pages</Text>
              <Text style={[styles.metaValue, { color: isDark ? colors.WHITE : colors.PRIMARY }]}>{book.pages}</Text>
            </View>
            <View style={styles.metaGroup}>
              <Text style={styles.metaLabel}>Language</Text>
              <Text style={[styles.metaValue, { color: isDark ? colors.WHITE : colors.PRIMARY }]}>{book.language}</Text>
            </View>
          </View>

          <Text
            style={[
              styles.description,
              { color: isDark ? colors.WHITE : "#555" },
            ]}
          >
            {book.description}
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.readSampleButton} onPress={() => navigation.navigate("BookRead", { book })}>
              <Text style={styles.readSampleText}>Read sample</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.getEbookButton}>
              <Text style={styles.buttonText}>Get this e-book</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  shareOptions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  bookImage: {
    width: 150,
    height: 220,
    resizeMode: "cover",
    borderRadius: 10,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metaGroup: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 12,
    color: "#888",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  readSampleButton: {
    backgroundColor: colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  readSampleText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  getEbookButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    backgroundColor: "transparent",
  },
  buttonText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontWeight: "bold",
  },
});
