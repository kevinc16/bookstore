import {
  addBook,
  deleteBook,
  toggleModal,
} from "../../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { Book } from "../../types/books";

export default function AddBookModal() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleAddBookModalToggle = () => {
    dispatch(toggleModal());
  };

  const handleAddBook = (e: any) => {
    e.preventDefault();

    if (!title && !description && !author) return;

    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      description,
    };

    dispatch(addBook(newBook));

    // Reset form fields
    setTitle("");
    setAuthor("");
    setDescription("");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-500/35">
      <div className="flex h-2/5 w-1/3 min-w-80 flex-col items-center justify-items-center rounded-lg bg-slate-300 p-10 drop-shadow-md backdrop-opacity-0">
        <button
          className="fixed right-0 top-0 mr-2 mt-2 p-1"
          onClick={() => handleAddBookModalToggle()}
        >
          X
        </button>
        <input
          type="text"
          className="m-1 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="m-1 w-full"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          rows={4}
          className="m-1 w-full"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="m-auto w-fit rounded-lg bg-amber-500 p-2"
          onClick={handleAddBook}
        >
          Add New Book
        </button>
      </div>
    </div>
  );
}
