import { API_URL } from "../../config"

export const getProductsViewClient = (filters)=>{
    return fetch(`${API_URL}User/GetProductsViewPage`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(filters)
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}


export const getProductDetailViewClient = (slug)=>{
    return fetch(`${API_URL}User/GetProductDetailView?slug=${slug}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const getRelatedProducts = (slug , count)=>{
    return fetch(`${API_URL}User/GetRelatedProductsBySlug?slug=${slug}&count=${count}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}