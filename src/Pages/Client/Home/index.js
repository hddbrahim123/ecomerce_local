import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../Core/ApiCore/Category'
import { getProductsViewClient } from '../../../Core/ApiCore/ProductClient'
import Arrivals from './Arrivals'
import Collection from './Collection'
import Featured from './Featured'
import Home from './Home'
import Offer from './Offer'

const Index = ()=>{

    const [feuturedProducts , setFeuturedProducts] = useState([])
    const [ArrivalsProducts , setArrivalsProducts] = useState([])
    const [categories , setCategories] = useState([])

    useEffect(() => {
        getProductsViewClient()
            .then(res=>{
                setArrivalsProducts(res)
                setFeuturedProducts(res)})

        getCategories()
            .then(res=>setCategories(res))
    }, [])
    return (
        <React.Fragment>
            <Home />
            <Featured FeuturedProducts={feuturedProducts} />
            <Collection categories={categories} />
            <Arrivals products={ArrivalsProducts} />
            <Offer />
        </React.Fragment>
    )
}

export default Index
