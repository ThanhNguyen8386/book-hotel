import { Blog } from "../types/blog";
import instance from "./instance";

export const remove = (_id: string) => {
    const url = `blogs/${_id}/delete`;
    return instance.delete(url)
}

export const getAll = () => {
    const url = `blogs`;
    return instance.get(url);
}
export const getOne = (slug: any | undefined) => {
    const url = `blogs/${slug}`;
    return instance.get(url);
}

export const create = (blog: Blog): Promise<Blog> => {
    const url = `blogs`;
    return instance.post(url, blog)
}

export const update = (blog: Blog) => {
    const url = `blogs/${blog._id}/edit`;
    return instance.put(url, blog)
}

