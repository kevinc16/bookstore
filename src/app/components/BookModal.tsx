import {
  addBook,
  deleteBook,
  toggleAddBookModal,
  emptyBook,
} from "../../redux/slices/booksSlice";
import { useEffect, useState } from "react";
import { Book } from "../../types/books";

interface modalData {
  handleSubmit: (bookData: Book) => void;
  handleToggleModal: () => void;
  initialBookData: Book | undefined;
  buttonText: string;
}

export default function BookModal({
  handleSubmit,
  handleToggleModal,
  initialBookData,
  buttonText,
}: modalData) {
  const [bookData, setBookData] = useState<Book>(initialBookData || emptyBook);
  useEffect(() => {
    initialBookData && setBookData(initialBookData);
  }, []);

  const submit = (e: any) => {
    e.preventDefault();

    // if (!bookData.title && !bookData.description && !bookData.price) return;

    handleSubmit(bookData);

    // Reset form fields
    setBookData(emptyBook);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-500/35">
      {/* <div className="flex h-full w-full items-center justify-center"> */}
      <form
        className="flex h-2/5 w-1/3 min-w-80 flex-col items-center justify-items-center rounded-lg bg-slate-300 p-10 drop-shadow-md"
        onSubmit={submit}
      >
        <button
          className="fixed right-0 top-0 mr-2 mt-2 p-1 hover:bg-slate-400 rounded-lg"
          onClick={() => handleToggleModal()}
        >
          X
        </button>
        <input
          required
          type="text"
          className="m-1 w-full"
          placeholder="Title"
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        />
        <input
          required
          type="number"
          className="m-1 w-full"
          placeholder="Price"
          value={bookData.price}
          onChange={(e) =>
            setBookData({ ...bookData, price: Number(e.target.value) })
          }
        />
        <input
          required
          type="text"
          className="m-1 w-full"
          placeholder="Category"
          value={bookData.category}
          onChange={(e) =>
            setBookData({ ...bookData, category: e.target.value })
          }
        />
        <textarea
          required
          placeholder="Description"
          value={bookData.description}
          rows={4}
          className="m-1 w-full"
          onChange={(e) =>
            setBookData({ ...bookData, description: e.target.value })
          }
        ></textarea>
        <button
          className="m-auto w-fit rounded-lg bg-amber-400 p-2 hover:bg-amber-500"
          onSubmit={submit}
        >
          {buttonText}
        </button>
      </form>
    </div>
    // </div>
  );
}
