import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import NewBookForm from "../forms/newBook/NewBookForm";

const NewBookModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit mt-8">
          <IconPlus /> Add new book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Book</DialogTitle>
        </DialogHeader>
        {/* form */}
        <NewBookForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewBookModal;
