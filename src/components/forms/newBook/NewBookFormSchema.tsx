import { z } from "zod";

export const newBookFormSchema = z.object({
  title: z.string(),
  author: z.string(),
  rate: z.number(),
  description: z.string(),
  book_tags: z.string(),
  image: z.string(),
});
