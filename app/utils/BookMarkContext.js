import { createContext, useContext, useState } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (book) => {
    if (!bookmarks.some((b) => b.id === book.id)) {
      setBookmarks((prev) => [...prev, { ...book, progress: 0 }]);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
