import { API_URL } from "../../config"


export const getProductsViewClient = ()=>{
    return fetch(`${API_URL}/User/GetProductsView`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}


export const getProductDetailViewClient = (slug)=>{
    return fetch(`${API_URL}/User/GetProductDetailView?slug=${slug}`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify({})
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}