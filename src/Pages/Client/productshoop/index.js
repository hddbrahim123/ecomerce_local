import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../Core/ApiCore/Category'
import { getProductsViewClient } from '../../../Core/ApiCore/ProductClient'
import FilterCategory from './FilterCategory'
import FilterPrice from './FilterPrice'
import ProductCard from './ProductCard'

import Paginate from '../../../Components/Comon/Paginate'


const ProductsShop = ()=>{

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    //State Pagination
    const [pagination , setPagination] = useState({
        pageNumber:1,
        totalPage:10
    })

    const [filters, setFilters] = useState({
        pageNumber: 1,
        length:15,
    })

    //Handle Page click
    const onPageChange = (newPage)=>{
        setFilters({
        ...filters,
        pageNumber:newPage
    })}


    useEffect(() => {
        getCategories()
            .then(res=>setCategories(res))
        
            
    }, [])
    useEffect(() => {
            getProductsViewClient(filters)
                .then(res=>{
                    setProducts(res.list)

                    setPagination({
                        ...pagination,
                        pageNumber:res.pageNumber,
                        totalPage:res.totalPage
                      })

                    console.log(res)
                })
    
      }, [filters])
    
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
                        <Paginate pagination={pagination} onPageChange={onPageChange}  className="justify-content-center"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductsShop
