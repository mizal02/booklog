import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newBookFormSchema } from "./NewBookFormSchema";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { Tag } from "@/types/books";

const NewBookForm = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof newBookFormSchema>>({
    resolver: zodResolver(newBookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      rate: 0,
      description: "",
      book_tags: "",
      image: "",
    },
  });

  const fetchTags = async () => {
    const { data, error } = await supabase.from("tags").select("*");

    if (error) {
      return;
    } else {
      setTags(data);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const onSubmit = (data: z.infer<typeof newBookFormSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Type title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Type author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="book_tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag.pid} value={tag.pid}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Type description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="image">Image</FormLabel>
                <FormControl>
                  <Input id="image" type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Type your rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewBookForm;
