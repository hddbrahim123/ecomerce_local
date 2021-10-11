import { API_URL } from "../../config"
import isAuthSeller from "../helpers/isAuthSeller"


export const createCategory = (category)=>{
    const { token } = isAuthSeller()
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
    const { token } = isAuthSeller()
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
    const { token } = isAuthSeller()
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
    const { token } = isAuthSeller()
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
    return fetch(`${API_URL}/Category/GetActiveCategoriesView`,{
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

export const GetChildrenCategory = (categoryId,active,hasProducts)=>{
    active = active ? 'true' : 'false';
    hasProducts = hasProducts ? 'true' : 'false';
    return fetch(`${API_URL}/Category/GetChildrenCategory?categoryId=${categoryId}&active=${active}&hasProducts=${hasProducts}`,{
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

export const getAllCategories = ()=>{
    return fetch(`${API_URL}/Category/GetAllCategoriesView`,{
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

export const getCategories = (active,hasProducts)=>{
    active = active ? 'true' : 'false';
    hasProducts = hasProducts ? 'true' : 'false';
    return fetch(`${API_URL}/Category/GetCategoriesView?active=${active}&hasProducts=${hasProducts}`,{
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
