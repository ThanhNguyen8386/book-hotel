import { CategoryBlog } from "./categoryBlog";
import { UserType } from "./user";

export type Blog = {
    _id?: string;
    title: string;
    content: string;
    image: string;
    category: CategoryBlog;
    slug?: string;
    user?: UserType;
    createdAt?: Date;
    desc: string;
}