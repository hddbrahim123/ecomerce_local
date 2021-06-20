import isAuthSeller from "../helpers/isAuthSeller"
import { API_URL } from "../../config"


export const getProductsSeller = (filters)=>{
    const {token} = isAuthSeller().data
    return fetch(`${API_URL}/Admin/GetProductsViewPage`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(filters)

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

export const getProductViewEditSeller = (slug)=>{
    const {token} = isAuthSeller().data
    return fetch(`${API_URL}/Admin/GetProductEdit?slug=${slug}`,{
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

export const UpdateProduct = (product)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Admin/UpdateProduct`,{
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

export const RemoveProduct = (slug)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Admin/RemoveProduct?slug=${slug}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}

export const RemoveImage = (imageGuid)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Admin/RemoveImage?imageGuid=${imageGuid}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}


export const SaveSlide = (slide)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Home/InsertSlide`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(slide)
    })
    .then(res=>res.json())
    .catch(err=>console.error(err))
}