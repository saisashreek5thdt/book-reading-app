import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBookmarks } from "../utils/BookMarkContext";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

// Layout Types
const LAYOUT_TYPES = {
  FULL_TEXT: "FULL_TEXT",
  IMAGE_TOP_TEXT_BOTTOM: "IMAGE_TOP_TEXT_BOTTOM",
  TEXT_TOP_IMAGE_BOTTOM: "TEXT_TOP_IMAGE_BOTTOM",
  MIXED: "MIXED",
};

// Screen dimensions
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const PAGE_HEIGHT = SCREEN_HEIGHT * 0.7;

export default function BookRead() {
  const route = useRoute();
  const navigation = useNavigation();

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addBookmark } = useBookmarks();

  // State
  const [fontSize, setFontSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(0);
  const [chunks, setChunks] = useState([]);

  // Get book data from route params
  const bookData = route?.params?.book || null;

  // Handle bookmarking
  const handleBookmark = () => {
    if (bookData) {
      addBookmark(bookData);
      if (Platform.OS === "android") {
        // ToastAndroid.show("Book added to bookmarks!", ToastAndroid.SHORT);
        alert("Bookmarked!");
      } else {
        alert("Bookmarked!");
      }
    }
  };

  // Prepare content blocks based on layout
  const prepareContentBasedOnLayout = () => {
    if (!bookData) return [];

    const { layout } = bookData;
    const rawContent = bookData.content || "";
    const textContent = rawContent.split("\n").map((para) => para.trim()).filter(Boolean);
    const images = bookData.images || [];

    let contentBlocks = [];

    switch (layout) {
      case LAYOUT_TYPES.FULL_TEXT:
        // Only text blocks
        contentBlocks = textContent.map((para, index) => ({
          type: "text",
          content: para,
          key: `text-${index}`,
        }));
        break;

      case LAYOUT_TYPES.IMAGE_TOP_TEXT_BOTTOM:
        for (let i = 0; i < Math.max(images.length, Math.ceil(textContent.length / 2)); i++) {
          if (i < images.length) {
            contentBlocks.push({
              type: "image",
              content: images[i],
              key: `image-${i}`,
            });
          }

          for (let j = 0; j < 2; j++) {
            const textIndex = i * 2 + j;
            if (textIndex < textContent.length) {
              contentBlocks.push({
                type: "text",
                content: textContent[textIndex],
                key: `text-${textIndex}`,
              });
            }
          }
        }
        break;

      case LAYOUT_TYPES.TEXT_TOP_IMAGE_BOTTOM:
        for (let i = 0; i < Math.max(images.length, Math.ceil(textContent.length / 2)); i++) {
          for (let j = 0; j < 2; j++) {
            const textIndex = i * 2 + j;
            if (textIndex < textContent.length) {
              contentBlocks.push({
                type: "text",
                content: textContent[textIndex],
                key: `text-${textIndex}`,
              });
            }
          }

          if (i < images.length) {
            contentBlocks.push({
              type: "image",
              content: images[i],
              key: `image-${i}`,
            });
          }
        }
        break;

      case LAYOUT_TYPES.MIXED:
      default:
        const textBlocks = textContent.map((para, index) => ({
          type: "text",
          content: para,
          key: `text-${index}`,
        }));

        const imageBlocks = images.map((url, index) => ({
          type: "image",
          content: url,
          key: `image-${index}`,
        }));

        // Interleave text and images
        let maxLen = Math.max(textBlocks.length, imageBlocks.length);
        contentBlocks = [];
        for (let i = 0; i < maxLen; i++) {
          if (i < textBlocks.length) contentBlocks.push(textBlocks[i]);
          if (i < imageBlocks.length) contentBlocks.push(imageBlocks[i]);
        }
        break;
    }

    return contentBlocks;
  };

  // Split content into pages
  const splitContentIntoPages = (contentBlocks) => {
    if (!Array.isArray(contentBlocks) || contentBlocks.length === 0) {
      return [[]];
    }

    const pages = [];
    let currentHeight = 0;
    let page = [];

    for (let item of contentBlocks) {
      const estimatedHeight = item.type === "text"
        ? Math.min(fontSize * 1.8 * item.content.length / 25, PAGE_HEIGHT * 0.7)
        : 220;

      if (currentHeight + estimatedHeight > PAGE_HEIGHT && page.length > 0) {
        pages.push(page);
        page = [];
        currentHeight = 0;
      }

      page.push(item);
      currentHeight += estimatedHeight;
    }

    if (page.length > 0) pages.push(page);

    return pages;
  };

  // Update chunks when fontSize changes
  useEffect(() => {
    if (!bookData) return;
    const contentBlocks = prepareContentBasedOnLayout();
    const newChunks = splitContentIntoPages(contentBlocks);
    setChunks(newChunks);
    setCurrentPage(Math.min(currentPage, newChunks.length - 1));
  }, [fontSize]);

  // Initial load
  useEffect(() => {
    if (!bookData) return;
    const contentBlocks = prepareContentBasedOnLayout();
    const newChunks = splitContentIntoPages(contentBlocks);
    setChunks(newChunks);
    setCurrentPage(0);
  }, []);

  const currentContent = chunks[currentPage] || [];

  // Fallback UI if no book data
  if (!bookData) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: isDark ? colors.WHITE : colors.BLACK }}>No book found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.PRIMARY, marginTop: 10 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.BACKGROUND : colors.WHITE }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.PRIMARY} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.PRIMARY }]}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.WHITE} />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setFontSize(prev => Math.min(prev + 2, 30))}>
            <MaterialIcons name="text-increase" size={24} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setFontSize(prev => Math.max(prev - 2, 12))}>
            <MaterialIcons name="text-decrease" size={24} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="share" size={24} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleBookmark}>
            <Feather name="bookmark" size={24} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.bookTitle, { color: isDark ? colors.WHITE : colors.BLACK }]}>
          {bookData.title}
        </Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.pageContent}>
        {currentContent.map((item) =>
          item.type === "text" ? (
            <Text
              key={item.key}
              style={[
                styles.bookText,
                {
                  fontSize,
                  color: isDark ? colors.WHITE : colors.BLACK,
                },
              ]}
            >
              {item.content}
            </Text>
          ) : (
            <Image
              key={item.key}
              source={{ uri: item.content }}
              style={styles.image}
              resizeMode="cover"
              onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
            />
          )
        )}
      </ScrollView>

      {/* Pagination Controls */}
      <View style={styles.paginationControls}>
        <TouchableOpacity
          disabled={currentPage <= 0}
          onPress={() => setCurrentPage(p => p - 1)}
          style={styles.navButton}
        >
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          Page {currentPage + 1} of {chunks.length}
        </Text>

        <TouchableOpacity
          disabled={currentPage >= chunks.length - 1}
          onPress={() => setCurrentPage(p => p + 1)}
          style={styles.navButton}
        >
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    color: "#fff",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  pageContent: {
    padding: 16,
    minHeight: PAGE_HEIGHT,
  },
  bookText: {
    lineHeight: 28,
    textAlign: "justify",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  paginationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: colors.PRIMARY,
  },
  navButton: {
    backgroundColor: colors.SECONDARY,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  navText: {
    color: colors.WHITE,
    fontWeight: "600",
  },
  pageIndicator: {
    color: colors.WHITE,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});