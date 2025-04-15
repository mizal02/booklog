export type Book = {
  id: number;
  created_at: Date | string;
  title: string;
  author: string;
  rate: number;
  description: string;
  book_tags: BookTags;
  image: string;
};

export type BookTags = {
  tag_id: number;
  tags: { name: string };
};

export type Tag = {
  id: number;
  pid: string;
  created_at: Date | string;
  name: string;
};
