import instance from "./instance";
import { OrderType } from "../types/order";
export const bangking = (value: any) => {
    const url = `payment/create-payment`;
    return instance.post(url, value)
}