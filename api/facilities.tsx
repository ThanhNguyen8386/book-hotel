import { facilities } from "../types/fac";
import instance from "./instance";

export const listfac = () => {
    const url = `/facilities`;
    return instance.get(url)
}
export const creatfac = (fac: facilities) => {
    const url = `facilities`;
    return instance.post(url, fac)
}
export const getAllfac = () => {
    const url = `facilities`;
    return instance.get(url);
}
export const getOnefac = (slug: any | undefined) => {
    const url = `facilities/${slug}`;
    return instance.get(url);
}
export const updatefac = (fac: facilities) => {
    const url = `facilities/${fac._id}/edit`;
    return instance.put(url, fac)
}
export const removefac = (_id: number) => {
    const url = `facilities/${_id}/delete`;
    return instance.delete(url)
}
