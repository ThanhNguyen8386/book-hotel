import instance from "./instance";
import { UserType } from "../types/user";

export const remove = (_id: number) => {
    const url = `users/${_id}/delete`;
    return instance.delete(url)
}

export const signup = (user: UserType) => {
    return instance.post('/signup', user)
}

export const signin = (user: UserType) => {
    return instance.post('/signin', user)
}

export const update = (user: UserType) => {
    return instance.put(`/users/${user._id}`, user)
}