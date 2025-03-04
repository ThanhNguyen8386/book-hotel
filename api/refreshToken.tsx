import instance from "./instance";

export const refresh = (token:object) => {
    return instance.post("/refresh", token)
}