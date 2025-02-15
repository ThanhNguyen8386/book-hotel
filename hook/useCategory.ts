import { API_URL } from './../constants/index';
import axios from "axios";
import { useRouter } from "next/router"
import useSWR from "swr";
import { creat, remove, update } from "../api/category";

const useCategory = () => {
    const router = useRouter();
    const { id } = router.query
    const fetcher = (url: any) => axios.get(url).then(res => res.data)
    const { mutate, data, error } = useSWR(id ? `${API_URL}/categories` : `${API_URL}/categories`, fetcher)

    const create = async (item: any) => {
        const products = await creat(item);
        mutate([...data, products])
    }

    const edit = async (item: any) => {
        await update(id, item);
        mutate()
    }

    const dele = async (id: any) => {
        await remove(id);
        mutate(data.filter((item: any) => item._id !== id))
    }


    return {
        mutate,
        data,
        create,
        edit,
        dele,
        error
    }
}

export default useCategory