import { facilities } from "../types/fac";
import instance from "./instance";

export const getAllFavorites = () => {
    const url = `/getAllFavorites`;
    return instance.get(url)
}
export const addFavoriteRoom = (fac: facilities) => {
    const url = `addFavoriteRoom`;
    return instance.post(url, fac)
}
export const getFavoritesByUser = (id: any) => {
    const url = `getFavoritesByUser/${id}`;
    return instance.get(url);
}
export const deleteFavoriteRoom = (userId: number, category: any) => {
    const url = `deleteFavoriteRoom/${userId}/${category}`;
    return instance.delete(url)
}
