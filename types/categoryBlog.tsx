import { Blog } from "./blog";

export type CategoryBlog = {
  _id?: string;
  name: string;
  slug?: string;
}

export type CategoryWithBlog = {
  name: string;
  slug?: string;
  blogs: Blog[];
}