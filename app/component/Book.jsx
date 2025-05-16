// Book.js
import { ScrollView, StyleSheet, View } from "react-native";
import { books } from "../lib/Book";
import BookCard from "./BookCard";

export default function Book({ navigation }) {
  return (
    <View style={styles.bookContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={() => navigation.navigate("BookDetail", { book })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {  
    margin: 8,
  },
});