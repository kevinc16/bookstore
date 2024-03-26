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

const formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
    <div className="flex w-screen flex-col items-center">
      <button
        className="mb-10 w-fit self-center rounded-lg bg-amber-400 p-2  hover:bg-amber-500"
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
                className="mb-5 flex flex-col rounded bg-stone-200 p-2 "
              >
                <div
                  className="flex flex-col hover:cursor-pointer hover:bg-green-400"
                  onClick={() => handleUpdateBookModalToggle(book.id)}
                >
                  <p className="m-auto mb-1 font-semibold">{book.title}</p>
                  <p className="m-auto mb-1">
                    {book.price && formatter.format(book.price)}
                  </p>
                  <p className="m-auto mb-1">Category: {book.category}</p>
                  <p className="m-1 mb-2">Description: {book.description}</p>
                </div>
                <button
                  className="z-100 m-auto mt-1 w-fit self-center rounded-lg bg-red-400 p-1 hover:bg-red-500"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
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
