import { addBook, toggleAddBookModal } from "../../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Book } from "../../types/books";
import BookModal from "./BookModal";

export default function AddBookModal() {
  const dispatch = useAppDispatch();

  const handleAddBookModalToggle = () => {
    dispatch(toggleAddBookModal());
  };

  const handleAddBook = (bookData: Book) => {
    if (!bookData.title && !bookData.description && !bookData.author) return;

    const newBook: Book = {
      id: Date.now(),
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
    };

    dispatch(addBook(newBook));
  };

  return (
    <BookModal
      handleSubmit={handleAddBook}
      handleToggleModal={handleAddBookModalToggle}
      initialBookData={undefined}
      buttonText="Add New Book"
    ></BookModal>
  );
}
