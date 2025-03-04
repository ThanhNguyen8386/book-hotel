import axios from "axios";
import useSWR from "swr";
import { remove, signin, update, } from "../api/users";
import { API_URL } from "../constants";
import { UserType } from "../types/user";

const userUser = () => {
    const fetcher = (args: string) => {
        const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') as string).token : null
        return axios.get(args, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.data)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate } = useSWR(`${API_URL}/users`, fetcher);

    const dele = async (id: any) => {
        await remove(id);
        console.log(data);

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
