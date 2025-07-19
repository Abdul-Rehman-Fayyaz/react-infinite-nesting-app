import "./styles.css";

import BookHeader from "./BookHeader";
import BookList from "./BookList";
import { useBooks } from "../../../hooks/use-books";
import { initialBookSections } from "./book-utils";

const Book = () => {
  const {
    bookSection,
    handleNewBook,
    handleDeleteBook,
    handleEditBook,
    handleAddChild,
  } = useBooks(initialBookSections);
  return (
    <div className="book-container">
      <BookHeader handleNewBook={handleNewBook} bookSection={bookSection} />
      <BookList
        bookSection={bookSection}
        handleDeleteBook={handleDeleteBook}
        handleEditBook={handleEditBook}
        handleAddChild={handleAddChild}
        level={1}
      />
    </div>
  );
};

export default Book;
