import { API_URL } from './../constants/index';
import axios from "axios";
import { useRouter } from "next/router"
import useSWR from "swr";
import { creat, remove, update } from "../api/category";
import { fetcher } from '../api/instance';

const useCategory = () => {
    const router = useRouter();
    const { _id } = router.query
    
    // const fetcher = (url: any) => axios.get(url).then(res => res.data)
    const { mutate, data, error } = useSWR(_id ? `${API_URL}/categoryDetail/${_id}` : `${API_URL}/categories`, fetcher)

    const create = async (item: any) => {
        const products = await creat(item);
        mutate([...data, products])
    }

    const edit = async (item: any) => {
        await update(item?._id, item);
        mutate()
    }

    const dele = async (id: any) => {
        await remove(id);
        mutate()
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