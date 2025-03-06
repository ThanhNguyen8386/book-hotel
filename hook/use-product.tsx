import axios from "axios";
import useSWR from "swr";
import { creat, remove, searchRoom, update, } from "../api/rooms";
import { API_URL } from "../constants";
import { ProductType } from "../types/products";
import { refresh } from "../api/refreshToken";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { fetcher } from "../api/instance";

const useProducts = (slug: any) => {
    const router = useRouter()
    // const fetcher = async (args: string) => {
    //     const token = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') as string) !== null ? JSON.parse(localStorage.getItem('user') as string).token : null;
    //     const refreshToken = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') as string) !== null ? JSON.parse(localStorage.getItem('user') as string).refreshToken : null;
    //     return axios.get(args, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     })
    //         .then(res => res.data)
    //         .catch(async (res) => {
    //             if (res.response.status === 401) {
    //                 await refresh({ token: refreshToken })
    //                     .then((res) => {
    //                         const _newToken = res.accessToken;
    //                         const user = JSON.parse(localStorage.getItem('user') as string);
    //                         localStorage.removeItem('user');
    //                         localStorage.setItem('user', JSON.stringify({ ...user, token: _newToken }))
    //                         mutate()
    //                     })
    //                     .catch((res) => {
    //                         console.log("Refresh Token hết hạn, yêu cầu đăng nhập lại");
    //                         // <Alert
    //                         //     severity="info">
    //                         //     Refresh Token hết hạn, yêu cầu đăng nhập lại
    //                         // </Alert>
    //                         localStorage.removeItem('user');
    //                         router.push("/signin")
    //                         return null;
    //                     })
    //             }
    //         })
    // }


    // }
    const { data, error, mutate } = useSWR(slug ? `${API_URL}/rooms/${slug}` : `${API_URL}/rooms`, fetcher);

    // create
    const add = async (item: ProductType) => {
        const products = await creat(item);
        mutate([...data, products]);
    };
    const dele = async (id: any) => {
        await remove(id);
        mutate(data.filter((item: { _id: any; }) => item._id !== id));
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
