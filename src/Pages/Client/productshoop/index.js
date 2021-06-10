import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../Core/ApiCore/Category'
import { getProductsViewClient } from '../../../Core/ApiCore/ProductClient'
import FilterCategory from './FilterCategory'
import FilterPrice from './FilterPrice'
import ProductCard from './ProductCard'

const ProductsShop = ()=>{

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        getCategories()
            .then(res=>setCategories(res))
        
            getProductsViewClient()
                .then(res=>{
                    console.log(res)
                    setProducts(res)})
    }, [])
    return (
        <React.Fragment>
            <div className="container-fluid vh-100 pt-2 p-lg-4">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card my-2 shadow-sm">
                            <div className="card-body">
                               <FilterCategory categories={categories} /> 
                            </div>
                        </div>
                        <div className="card my-2 shadow-sm">
                            <div className="card-body">
                               <FilterPrice /> 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            {!isEmpty(products) && products.map((product , i)=>(
                                <div key={product.slug} className="col-lg-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductsShop
