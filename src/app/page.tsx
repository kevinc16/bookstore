import BookList from './books/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <BookList />
    </main>
  )
}
