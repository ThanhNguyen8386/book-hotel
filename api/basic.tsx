import instance from "./instance";


export const getone = (id:string) => {
    const url = `basic/${id}`
    return instance.get(url)
}

export const getAll = () => {
    const url = `basic`
    return instance.get(url)
}

export const remove = (_id:number) => {
    const url = `basic/${_id}/delete`;
    return instance.delete(url)
}

export const creat = (product: any) => {
    const url = `basic`;
    return instance.post(url, product)
}

export const update = (product: any) => {
    const url = `basic/${product._id}/edit`;
    return instance.put(url, product)
}
