import { API_URL } from "../../config"


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