import axios from "axios";
import useSWR from "swr";
import { create, remove, update } from "../api/voucher";
import { API_URL } from "../constants";
import { Voucher } from "../types/voucher";

const useVoucher = (id?: string) => {

    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(id ? `${API_URL}/voucher/${id}` : `${API_URL}/voucher`, fetcher);

    // create
    const add = async (item: Voucher) => {
        const voucher = await create(item);
        mutate([...data, voucher]);
    };
    // delete
    const dele = async (id: string) => {
        await remove(id);
        mutate(data.filter((item: Voucher) => item._id !== id));
    };
    // update
    const edit = async (item: Voucher) => {
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

export default useVoucher;
