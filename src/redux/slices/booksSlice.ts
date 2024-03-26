// redux/reducers.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/books';
import { act } from 'react-dom/test-utils';

const sampleBook1: Book = {
  id: 1,
  description: "Very cool",
  title: "One Hundred Years of Solitude",
  price: 1.23,
  category: "History"
}

const sampleBook2: Book = {
  id: 2,
  description: "😮",
  title: "Crime and Punishment",
  price: 22,
  category: "A"
}

const sampleBook3: Book = {
  id: 3,
  description: "😵",
  title: "The Castle",
  price: 3.22,
  category: "A"
}

export const emptyBook: Book = {
  id: -1,
  title: "",
  price: NaN,
  description: "",
  category: ""
}

interface InitialState {
  books: Book[];
  addBookModalVisible: boolean;
  updateBookModalVisible: boolean;
  updateBookId: number;
}

const initialState: InitialState = {
  books: [sampleBook1, sampleBook2, sampleBook3],
  addBookModalVisible: false,
  updateBookModalVisible: false,
  updateBookId: 1
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
      console.log(index, state.books[index])
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    toggleAddBookModal(state) {
      state.addBookModalVisible = !state.addBookModalVisible
    },
    toggleUpdateBookModal(state) {
      state.updateBookModalVisible = !state.updateBookModalVisible
    },
    setUpdateBookId(state, action: PayloadAction<number>) {
      state.updateBookId = action.payload;
    },
  },
});

export const { addBook, deleteBook, updateBook, toggleAddBookModal, toggleUpdateBookModal, setUpdateBookId } = bookSlice.actions;
export default bookSlice.reducer;
