import axios from "axios";
import useSWR from "swr";
import { detail } from "../api/order";
import { API_URL } from "../constants";

const OrderHook = () =>{
    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(`${API_URL}/order`, fetcher);
    return {
        data,
        error,
        mutate,

    }

}
export default OrderHook