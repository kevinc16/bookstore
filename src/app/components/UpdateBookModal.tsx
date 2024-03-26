import { useEffect, useState } from "react";
import {
  addBook,
  emptyBook,
  toggleUpdateBookModal,
  updateBook,
} from "../../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Book } from "../../types/books";
import BookModal from "./BookModal";

export default function UpdateBookModal({ bookId }: { bookId: number }) {
  const dispatch = useAppDispatch();
  const bookList = useAppSelector((state) => state.books.books);

  // const [bookData, setBookData] = useState<Book | undefined>(emptyBook);
  const [bookData, setBookData] = useState<Book>(
    bookList.find((e) => e.id == bookId) || emptyBook,
  );

  // useEffect(() => {
  //   console.log();
  //   setBookData(bookList.find((e) => e.id == bookId));
  // }, []);

  const handleToggleBookModalToggle = () => {
    dispatch(toggleUpdateBookModal());
  };

  const handleUpdateBook = (newBookData: Book) => {
    console.log(newBookData);

    const newBook: Book = {
      id: newBookData.id,
      title: newBookData.title,
      price: newBookData.price,
      category: newBookData.category,
      description: newBookData.description,
    };

    dispatch(updateBook(newBook));
    dispatch(toggleUpdateBookModal());
  };

  return (
    <BookModal
      handleSubmit={handleUpdateBook}
      handleToggleModal={handleToggleBookModalToggle}
      initialBookData={bookData}
      buttonText="Update Book"
    ></BookModal>
  );
}
