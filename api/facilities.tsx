import { facilities } from "../types/fac";
import instance from "./instance";

export const listfac = (signal: AbortSignal) => {
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

export const detail = (_id: number) => {
    const url = `categoryDetail/${_id}`;
    return instance.get(url)
}

export const listFacilityByCategory = (_id: String) => {
    const url = `facilities/${_id}/category`;
    return instance.get(url)
}

