// redux/reducers.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/books';

const sampleBook: Book = {
  id: 1,
  description: "Very cool",
  title: "Wuthering Heights",
  author: "???"
}

interface InitialState {
  books: Book[];
}

const initialState: InitialState = {
  books: [sampleBook],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    deleteBook(state, action: PayloadAction<number>) {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
  },
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;
