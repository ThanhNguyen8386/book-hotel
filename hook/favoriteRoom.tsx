import useSWR from "swr";
import { API_URL } from "../constants";
import { facilities } from "../types/fac";
import { fetcher } from '../api/instance';
import { addFavoriteRoom, deleteFavoriteRoom } from "../api/favoriteRoom";

const useFavoriteRoom = (id: any) => {

    // const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(id ? `${API_URL}/getFavoritesByUser/${id}` : `${API_URL}/getAllFavorites`, fetcher);

    // create
    const addFavoriteRooms = async (item: facilities) => {
        const fac = await addFavoriteRoom(item);
        mutate([...data, fac]);
    };
    // delete
    const deleFavoriteRooms = async (id: any, roomId: any) => {
        await deleteFavoriteRoom(id, roomId);
        mutate();
    };

    return {
        addFavoriteRooms,
        deleFavoriteRooms,
        data,
        error
    };
};

export default useFavoriteRoom;
