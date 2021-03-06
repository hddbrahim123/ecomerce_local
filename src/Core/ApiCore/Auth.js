import { API_URL } from "../../config"
import isAuthSeller from "../helpers/isAuthSeller"


export const SellerSignin = (user)=>{
    return fetch(`${API_URL}/Account/AuthenticateAdmin`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}

export const isConnect = (user)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Account/IsConnecte`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}