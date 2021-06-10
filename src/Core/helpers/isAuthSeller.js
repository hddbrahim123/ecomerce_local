function isAuthSeller() {
    let jwt = localStorage.getItem('JWT_SELLER')
    if(jwt){
        return JSON.parse(jwt)
    }
    return false
}

export default isAuthSeller
