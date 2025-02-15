import { CategoryBlog } from "../types/categoryBlog";
import instance from "./instance";

export const remove = (_id: string) => {
    const url = `categoryblogs/${_id}/delete`;
    return instance.delete(url)
}

export const getAll = () => {
    const url = `categoryblogs`;
    return instance.get(url);
}
export const getOne = (slug: any | undefined) => {
    const url = `categoryblogs/${slug}`;
    return instance.get(url);
}

export const create = (category: CategoryBlog) => {
    const url = `categoryblogs`;
    return instance.post(url, category)
}

export const update = (category: CategoryBlog) => {
    const url = `categoryblogs/${category._id}/edit`;
    return instance.put(url, category)
}

