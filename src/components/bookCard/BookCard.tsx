import { Book } from "../../types/books";
import { IconStarFilled } from "@tabler/icons-react";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="flex gap-8 border border-[var(--border)] rounded-lg p-4 w-3/4">
      <img src={book.image} alt="" className="max-h-[250px]" />

      <div className="flex flex-col gap-6 justify-between">
        <div className="flex gap-6 justify-between items-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium">{book.title}</h3>
            <p className="text-xl">{book.author}</p>
            <p>{book.book_tags.tags.name}</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-xl">Your rate</p>
            <div className="flex gap-2 items-center justify-center">
              <IconStarFilled fill="#e3a847" /> <span>{book.rate} / 10</span>
            </div>
          </div>
        </div>
        <p>{book.description}</p>
        <div className="flex gap-4">
          {/* actions like edit, delete */}
          {/* <IconEdit />
            Edit */}
          {/* <IconTrashX /> Delete */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
