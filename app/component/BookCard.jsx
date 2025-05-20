import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

export default function BookCard({ book, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.bookListContainer} onPress={onPress}>
      <Image
        style={styles.bookList}
        source={
          typeof book.imageURL === "string" && book.imageURL.startsWith("http")
            ? { uri: book.imageURL }
            : typeof book.imageURL === "number"
            ? book.imageURL // already a require()
            : require("../../assets/images/book.jpg") // fallback or local static asset
        }
      />
      <Text
        style={[
          styles.bookListTitle,
          { color: theme === "dark" ? colors.WHITE : colors.BLACK },
        ]}
      >
        {book.title}
      </Text>
      <Text
        style={[
          styles.bookListAuthor,
          { color: theme === "dark" ? colors.GRAY : colors.GRAY },
        ]}
      >
        by {book.author}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookListContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
    width: 150,
    alignItems: "center",
  },
  bookList: {
    width: 120,
    height: 180,
    resizeMode: "cover",
    marginBottom: 10,
  },
  bookListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookListAuthor: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
