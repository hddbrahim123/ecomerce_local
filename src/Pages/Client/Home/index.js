import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../Core/ApiCore/Category'
import { getProductsLatestProductsViewUser, getProductsOffer, getProductsTopRating, getProductsTopSale } from '../../../Core/ApiCore/ProductHome'
import TopRating from './TopRating'
import Collection from './Collection'
import LatestProducts from './LatestProducts'
import TopSale from './TopSale'
import Home from './Home'
import Offre from './Offre'

const Index = ()=>{

    const [latestProducts , setLatestProducts] = useState([])
    const [productsTopRating , setProductsTopRating] = useState([])
    const [productsTopSale , setProductsTopSale] = useState([])
    const [productsOffre , setProductsOffre] = useState([])
    const [categories , setCategories] = useState([])

    useEffect(() => {
        getProductsOffer(6)
            .then(res=>{
                setProductsOffre(res)
            })
        
        getProductsLatestProductsViewUser(4)
         .then(res=>setLatestProducts(res))

         getProductsTopSale(12)
         .then(res=>setProductsTopSale(res)) 

        getProductsTopRating(12)
            .then(res=>setProductsTopRating(res))    
        
            getCategories()
            .then(res=>setCategories(res))
    }, [])
    return (
        <React.Fragment>
            <Home />
            <LatestProducts latestProducts={latestProducts} />
            <TopSale productsTopSale={productsTopSale} />
            <Collection categories={categories} />
            <TopRating products={productsTopRating} />
            <Offre products={productsOffre}/>
        </React.Fragment>
    )
}

export default Index
