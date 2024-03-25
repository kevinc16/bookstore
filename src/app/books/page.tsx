"use client";
import { addBook, deleteBook } from "../../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./page.module.css";
import { useState } from "react";
import { Book } from "../../types/books";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const bookList = useAppSelector((state) => state.books.books);
  const dispatch = useAppDispatch();

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
    setDescription("");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAddBook}>
        <input
          type="text"
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className={styles.button} onClick={handleAddBook}>
          Add New Book
        </button>
      </form>
      <h1 className={styles.heading}>Books</h1>
      {bookList ? (
        <div>
          {bookList.map((book: Book) => (
            <div key={book.id}>
              <p>{book.title}</p>
              <p>By: {book.author}</p>
              <p>Summary: {book.description}</p>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
