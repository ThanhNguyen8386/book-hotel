import { addstatus } from "../api/statusroom"
import { StatusType } from "../types/statusroom"

const useStatus = (setstatus:any) =>{
    const creatstatus = async (item:StatusType)=>{
        const {data} = await addstatus(item)
        setstatus(data)
        console.log(data)
    }
    return {
        creatstatus,
    }

}

export default useStatus