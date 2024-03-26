"use client";
import {
  addBook,
  deleteBook,
  toggleModal,
} from "../../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { Book } from "../../types/books";
import AddBookModal from "./AddBookModal";

export default function Books() {
  let addBookModalVisible = useAppSelector((state) => state.books.modalVisible);
  // console.log(addBookModalVisible);
  const bookList = useAppSelector((state) => state.books.books);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteBook(id));
  };

  const handleAddBookModalToggle = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="flex w-screen flex-col items-center">
      <button
        className="mb-10 w-fit self-center rounded-lg border bg-amber-500 p-2"
        onClick={() => handleAddBookModalToggle()}
      >
        Add Book
      </button>
      {addBookModalVisible && <AddBookModal />}
      <div className="flex w-full flex-col">
        <h1 className="m-auto mb-5 self-center text-4xl">Books</h1>
        {bookList ? (
          <div className=" m-auto w-1/3">
            {bookList.map((book: Book) => (
              <div
                key={book.id}
                className="flex flex-col rounded bg-stone-300 p-2 mb-5"
              >
                <p className="m-auto mb-1 font-semibold">{book.title}</p>
                <p className="m-auto mb-1">By: {book.author}</p>
                <p className="m-1 mb-2">Summary: {book.description}</p>
                <button
                  className="m-auto mt-1 w-fit self-center rounded-lg bg-red-400 p-1"
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
