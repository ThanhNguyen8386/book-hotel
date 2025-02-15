import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { creat, remove, searchRoom, update, } from "../api/rooms";
import { API_URL } from "../constants";
import { ProductType } from "../types/products";

const useProducts = (slug: any) => {
    
    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(slug ? `${API_URL}/rooms/${slug}` : `${API_URL}/rooms`, fetcher);

    // create
    const add = async (item: ProductType) => {
        const products = await creat(item);
        mutate ([...data, products]);
    };
    const dele = async (id:any) => {
        await remove(id);
        mutate (data.filter((item: { _id: any; }) => item._id !== id ));    
    };

    const edit = async (item: ProductType) => {
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

export default useProducts;
