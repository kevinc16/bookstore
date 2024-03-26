import BookList from "./components/BookList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Booklist",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden p-16">
      <BookList />
    </main>
  );
}
