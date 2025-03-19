import { rootAxios } from "./rootAxios";

export const ApiHome =async () => { 
    const response = await rootAxios.get(`/tools/my`)
    return response.data
};


export const deleteObj =async (data) =>{
    const response = await rootAxios.delete(`/tools/${data}`)
    return response.data
}