import { StatusType } from "../types/statusroom";
import instance from "./instance";

export const addstatus = (item:StatusType)=>{
    const url = 'statusroom' 
    return instance.post(url,item)
}