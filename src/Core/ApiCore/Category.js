import { API_URL } from "../../config"
import isAuthSeller from "../helpers/isAuthSeller"


export const createCategory = (category)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Category/CreateCategory`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const updateCategory = (category)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Category/UpdateCategory`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const removeCategory = (categoryId)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Category/RemoveCategory?categoryId=${categoryId}`,{
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

export const canRemoveCategory = (categoryId)=>{
    const { token } = isAuthSeller().data
    return fetch(`${API_URL}/Category/CanRemoveCategory?categoryId=${categoryId}`,{
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

export const getActiveCategories = ()=>{
    return fetch(`${API_URL}/Category/GetActiveCategories`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const getCategories = ()=>{
    return fetch(`${API_URL}/Category/GetCategories`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const getCategory = (categoryId)=>{
    return fetch(`${API_URL}/Category/GetCategory?categoryId=${categoryId}`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}
