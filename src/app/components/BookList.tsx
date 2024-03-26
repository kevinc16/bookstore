"use client";
import {
  addBook,
  deleteBook,
  toggleAddBookModal,
  toggleUpdateBookModal,
  setUpdateBookId,
} from "../../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Book } from "../../types/books";
import AddBookModal from "./AddBookModal";
import UpdateBookModal from "./UpdateBookModal";

export default function Books() {
  let addBookModalVisible = useAppSelector(
    (state) => state.books.addBookModalVisible,
  );
  let updateBookModalVisible = useAppSelector(
    (state) => state.books.updateBookModalVisible,
  );
  // console.log(addBookModalVisible);
  const bookList = useAppSelector((state) => state.books.books);
  const updateBookId = useAppSelector((state) => state.books.updateBookId);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteBook(id));
  };

  const handleAddBookModalToggle = () => {
    dispatch(toggleAddBookModal());
  };
  const handleUpdateBookModalToggle = (bookId: number) => {
    console.log(bookId, updateBookId);
    dispatch(setUpdateBookId(bookId));
    dispatch(toggleUpdateBookModal());
  };

  return (
    <div
      className="flex w-screen flex-col items-center"
      
    >
      <button
        className="mb-10 w-fit self-center rounded-lg border bg-amber-500 p-2"
        onClick={() => handleAddBookModalToggle()}
      >
        Add Book
      </button>
      {addBookModalVisible && <AddBookModal />}
      {updateBookModalVisible && <UpdateBookModal bookId={updateBookId} />}
      <div className="flex w-full flex-col">
        <h1 className="m-auto mb-5 self-center text-4xl">Books</h1>
        {bookList ? (
          <div className=" m-auto w-1/3">
            {bookList.map((book: Book) => (
              <div
                key={book.id}
                className="mb-5 flex flex-col rounded bg-stone-200 p-2"
              >
                <p className="m-auto mb-1 font-semibold">{book.title}</p>
                <p className="m-auto mb-1">By: {book.author}</p>
                <p className="m-1 mb-2">Summary: {book.description}</p>
                <div className="flex justify-center">
                  <button
                    className="m-auto mt-1 w-fit self-center rounded-lg bg-green-400 p-1"
                    onClick={() => handleUpdateBookModalToggle(book.id)}
                  >
                    Update
                  </button>
                  <button
                    className="m-auto mt-1 w-fit self-center rounded-lg bg-red-400 p-1"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
