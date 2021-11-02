import { API_URL } from "../../config"

export const GetSlideData = ()=>{
    return fetch(`${API_URL}Home/GetSlideData`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const getProductsTopRating = (count)=>{
    return fetch(`${API_URL}Home/GetProductsTopRating?count=${count}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
} 

export const getProductsOffer = (count)=>{
    return fetch(`${API_URL}Home/GetProductsOffer?count=${count}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}   

export const getProductsTopSale = (count)=>{
    return fetch(`${API_URL}Home/GetProductsTopSale?count=${count}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}  
export const getLatestProductsViewUser = (count)=>{
    return fetch(`${API_URL}Home/GetLatestProductsViewUser?count=${count}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}  