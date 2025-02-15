import axios from "axios";
import useSWR from "swr";
import { creat, remove, update } from "../api/basic";
import { API_URL } from "../constants";

const useBasic = (slug: any) => {
    
    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(slug ? `${API_URL}/basic/${slug}` : `${API_URL}/basic`, fetcher);

    // create
    const add = async (item: any) => {
        const products = await creat(item);
        mutate ([...data, products]);
    };
    const dele = async (id:any) => {
        await remove(id);
        mutate (data.filter((item: { _id: any; }) => item._id !== id ));    
    };

    const edit = async (item: any) => {
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

export default useBasic;
