import useSWR from "swr";
import { creatfac, removefac, updatefac } from "../api/facilities";
import { API_URL } from "../constants";
import { facilities } from "../types/fac";
import { fetcher } from '../api/instance';

const useFacilities = (id: any) => {

    // const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(id ? `${API_URL}/facilities/${id}` : `${API_URL}/facilities`, fetcher);

    // create
    const add = async (item: facilities) => {
        const fac = await creatfac(item);
        mutate([...data, fac]);
    };
    // delete
    const dele = async (id: any) => {
        await removefac(id);
        mutate(data.filter((item: { _id: any; }) => item._id !== id));
    };
    // update
    const edit = async (item: facilities) => {
        await updatefac(item);
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

export default useFacilities;
