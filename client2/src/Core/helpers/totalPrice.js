const TotalPrice = (products)=>{
    return products.reduce((total,product)=> total + (!!product.newPrice && !!product.qty ? product.qty* product.newPrice : 0) , 0)
}
export default TotalPrice