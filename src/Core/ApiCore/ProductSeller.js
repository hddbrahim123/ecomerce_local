import isAuthSeller from "../helpers/isAuthSeller"
import { API_URL } from "../../config"


export const getProductsSeller = ()=>{
    const {token} = isAuthSeller().data
    return fetch(`${API_URL}/Admin/GetProductsView`,{
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

export const getProductViewSeller = (slug)=>{
    const {token} = isAuthSeller().data
    return fetch(`${API_URL}/Admin/GetProductDetailView?slug=${slug}`,{
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

export const SaveProduct = (product)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Admin/CreateProduct`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(product)
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}

export const UploadImage = (slug , images)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Admin/UploadImages?slug=${slug}`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`
        },
        body:images
    })
    .then()
    .catch(err=>console.error(err))
}