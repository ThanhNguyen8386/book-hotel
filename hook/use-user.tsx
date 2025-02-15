import axios from "axios";
import useSWR from "swr";
import { remove, signin, } from "../api/users";
import { API_URL } from "../constants";
import { UserType } from "../types/user";

const userUser = () => {
    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(`${API_URL}/users`, fetcher);

    const dele = async (id: any) => {
        await remove(id);
        mutate(data.filter((item: { _id: any }) => item._id !== id));
    };




    // const edit = async (item: ProductType) => {
    //     const {data : products} = await update(item);
    //     return data;
    // };



    return {
        // edit,
        // add,

        dele,
        data,
        error
    };
};

export default userUser;
