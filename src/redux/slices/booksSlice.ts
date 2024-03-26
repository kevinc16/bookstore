// redux/reducers.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/books';

const sampleBook1: Book = {
  id: 1,
  description: "Very cool",
  title: "One Hundred Years of Solitude",
  author: "Gabriel García Márquez"
}

const sampleBook2: Book = {
  id: 2,
  description: "😮",
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky"
}

const sampleBook3: Book = {
  id: 3,
  description: "😵",
  title: "The Castle",
  author: "Franz Kafka"
}

interface InitialState {
  books: Book[];
  modalVisible: boolean
}

const initialState: InitialState = {
  books: [sampleBook1, sampleBook2, sampleBook3],
  modalVisible: false
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
    toggleModal(state) {
      state.modalVisible = !state.modalVisible
    }
  },
});

export const { addBook, deleteBook, updateBook, toggleModal } = bookSlice.actions;
export default bookSlice.reducer;
