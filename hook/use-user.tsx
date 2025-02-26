import axios from "axios";
import useSWR from "swr";
import { remove, signin, update, } from "../api/users";
import { API_URL } from "../constants";
import { UserType } from "../types/user";

const userUser = () => {
    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate } = useSWR(`${API_URL}/users`, fetcher);

    const dele = async (id: any) => {
        await remove(id);
        mutate(data.filter((item: { _id: any }) => item._id !== id));
    };

    const edit = async (item: UserType) => {
        await update(item);
        mutate();
    };
    
    return {
        edit,
        dele,
        data,
        error
    };
};

export default userUser;
