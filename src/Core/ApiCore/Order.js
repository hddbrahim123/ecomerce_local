import { API_URL } from "../../config"
import isAuthSeller from "../helpers/isAuthSeller"
import queryString from "query-string";

export const getOrders = (status)=>{
    //var query = queryString.stringify(filter);
    var query = ''
    if (status) {
        query += `status=${status}`
    }
    console.log(query)
    const {token} = isAuthSeller()
    return fetch(`${API_URL}/Admin/GetOrdersView?${query}`,{
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

export const getOrdersStatus = ()=>{
    const {token} = isAuthSeller()
    return fetch(`${API_URL}/User/GetOrderStatus`,{
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

export const GetOrderDetailsView = (orderNumber)=>{
    const {token} = isAuthSeller()
    return fetch(`${API_URL}/Admin/GetOrderView?orderNumber=${orderNumber}`,{
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

export const UpdateOrderStatus = (orderNumber, status)=>{
    const {token} = isAuthSeller()
    return fetch(`${API_URL}/Admin/UpdateOrderStatus?orderNumber=${orderNumber}&status=${status}`,{
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