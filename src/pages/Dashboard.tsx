import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";
import { Book } from "../types/books";
import BookCard from "../components/bookCard/BookCard";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import NewBookModal from "@/components/modals/NewBookModal";

const Dashboard = () => {
  const [bookList, setBookList] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from("books").select(`*,book_tags (
      tag_id,
      tags (
        name
      )
    )`);

    if (error) {
      console.log(error);
    } else {
      setBookList(data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="h-dvh w-dvw flex flex-col justify-center items-center p-6">
      <h2 className="text-4xl font-semibold mb-10 text-center">Your books</h2>

      <div className="flex flex-col justify-center items-center gap-6">
        {bookList?.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
      <NewBookModal />
    </div>
  );
};

export default Dashboard;
