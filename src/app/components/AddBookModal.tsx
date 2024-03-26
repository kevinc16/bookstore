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
    const newBook: Book = {
      id: Date.now(),
      title: bookData.title,
      price: bookData.price,
      category: bookData.category,
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
