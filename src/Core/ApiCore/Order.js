import { API_URL } from "../../config"
import isAuthSeller from "../helpers/isAuthSeller"


export const getOrders = ()=>{
    const {token} = isAuthSeller().data
    return fetch(`${API_URL}/Admin/GetOrdersView`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const createOrder = (order)=>{
    return fetch(`${API_URL}/User/CreateOrder`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(order)
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}
