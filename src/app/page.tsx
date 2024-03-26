import BookList from "./components/BookList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Booklist",
};

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center overflow-x-hidden p-16"
      style={{
        backgroundImage: `url("../../../pexels-emily-768125.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Image src={pic} alt="Picture of books"  /> */}
      <BookList />
    </main>
  );
}
