import instance from "./instance";

export const getone = (id:string) => {
    const url = `dateBooked/${id}`
    return instance.get(url)
}

export const getAll = () => {
    const url = `dateBooked`
    return instance.get(url)
}

export const remove = (_id:string) => {
    const url = `dateBooked/${_id}/delete`;
    return instance.delete(url)
}

export const creat = (product: any) => {
    const url = `dateBooked`;
    return instance.post(url, product)
}

export const update = (product: any) => {
    const url = `dateBooked/${product._id}/edit`;
    return instance.put(url, product)
}
