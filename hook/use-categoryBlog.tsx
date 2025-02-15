import axios from "axios";
import useSWR from "swr";
import { create, remove, update } from "../api/categoryBlog";
import { API_URL } from "../constants";
import { CategoryBlog } from "../types/categoryBlog";

const useCategoryBlog = (slug?: string) => {

    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(slug ? `${API_URL}/categoryblogs/${slug}` : `${API_URL}/categoryblogs`, fetcher);

    // create
    const add = async (item: CategoryBlog) => {
        const category = await create(item);
        mutate([...data, category]);
    };
    // delete
    const dele = async (id: string) => {
        await remove(id);
        mutate(data.filter((item: CategoryBlog) => item._id !== id));
    };
    // update
    const edit = async (item: CategoryBlog) => {
        await update(item);
        mutate();
    };

    return {
        edit,
        add,
        dele,
        data,
        error
    };
};

export default useCategoryBlog;
