const TotalPrice = (products)=>{
    return products.reduce((total,product)=> total + (product.qty * product.newPrice) , 0)
}
export default TotalPrice