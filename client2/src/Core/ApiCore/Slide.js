import { API_URL } from "../../config"
import isAuthSeller from "../helpers/isAuthSeller"

export const UpSlide = (slideId)=>{
    const { token } = isAuthSeller();
    return fetch(`${API_URL}Home/UpSlide?slideId=${slideId}`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const DownSlide = (slideId)=>{
    const { token } = isAuthSeller();
    return fetch(`${API_URL}Home/DownSlide?slideId=${slideId}`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}
