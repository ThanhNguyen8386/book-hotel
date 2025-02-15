import instance from "./instance";

export const remove = (_id:number) => {
    const url = `category/${_id}`;
    return instance.delete(url)
}

export const getAll = () => {
    const url = `categories`;
    return instance.get(url);
}
export const getone = (slug: any | undefined) => {
    const url = `category/${slug}`;
    return instance.get(url);
}

export const creat = (product: any) => {
    const url = `categories`;
    return instance.post(url, product)
}

export const update = (id:any ,product: any) => {
    const url = `category/${id}/edit`;
    return instance.put(url, product)
}