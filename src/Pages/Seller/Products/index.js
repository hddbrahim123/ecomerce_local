import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { isEmpty } from 'lodash'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { getProductsSeller, RemoveProduct } from '../../../Core/ApiCore/ProductSeller'

import Paginate from '../../../Components/Comon/Paginate'
import Breadcrumb from '../../../Components/Comon/Breadcrumb'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const Products = (props) => {

  const [products , setProducts] = useState([])

  //State Pagination
  const [pagination , setPagination] = useState({
    pageNumber:1,
    totalPage:10
  })

  const [filters, setFilters] = useState({
      pageNumber: 1,
      length:100,
  })

  //Handle Page click
  const onPageChange = (newPage)=>{
      setFilters({
      ...filters,
      pageNumber:newPage
  })}

  const deleteProduct = (slug) =>{
    RemoveProduct(slug)
      .then(res=>{
        if(res.success){
          
          let productList = products
          productList = productList.filter(product => product.slug !== slug )
          setProducts(productList) 

          toastr.options.progressBar=true
          toastr.success("Product Deleted SuccessFully", "deleted")
        }else{
          toastr.options.progressBar=true
          toastr.error("Product Deleted Error", "deleted")
        }
      })
  }

  useEffect(() => {
    getProductsSeller(filters)
      .then(
        res=>{
          console.log(res)
          setProducts(res.list)
          setPagination({
            ...pagination,
            pageNumber:res.pageNumber,
            totalPage:res.totalPage
          })
        }
      )
  }, [filters])

    return (
      <React.Fragment>
       <div className="container-fluid">
       <Breadcrumb item="Dashboard" link="/seller" title="les produits" />
        <div className="row">
          <div className="table-rep-plugin ">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              className="table custom__table  table-nowrap align-middle table-borderless"
            >
              <Thead className="table-light">
                <Tr>
                  <Th className="text-muted">Image</Th>
                  <Th className="text-muted" data-priority="3">Price</Th>
                  <Th className="text-muted" data-priority="3">Status</Th>
                  <Th className="text-muted" data-priority="3">View</Th>
                  <Th className="text-muted" data-priority="6">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(products) && products.map((product,i)=>(
                <Tr key={i}>
                  <Th className="d-flex">
                    <img src={product.image} alt={product.name} className="avatar__lg" />
                    <h5 className="mx-3 text-capitalize"><Link to="#" className="text-dark" >{product.name}</Link></h5>
                  </Th>
                  <Td>{product.newPrice}</Td>
                  <Td>
                    {product.active 
                      ?(
                        <span className="badge bg-primary">Active</span>
                          
                      )
                      :(
                        <span className="badge bg-danger">InActive</span>
                      )}
                  </Td>
                  <Td>
                    <button
                      className="btn-sm btn-primary btn-rounded"
                      onClick={()=>{props.history.push(`/seller/product/${product.slug}`)}}
                    >
                      Details
                    </button>
                  </Td>
                  <Td>
                    <div className="d-flex gap-3">
                    <Link onClick={()=>props.history.push(`/seller/product/edit/${product.slug}`)} to="#" className="text-success fw-bold">
                      <i className='bx bx-edit'></i>
                    </Link>
                    <Link to="#" onClick={()=>deleteProduct(product.slug)} className="text-danger  fw-bold">
                      <i className='bx bx-trash'></i>
                    </Link>
                    </div>
                  </Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
          <Paginate pagination={pagination} onPageChange={onPageChange}  className="justify-content-end"/>
        </div>
       </div>
      </React.Fragment>
    )
}

export default Products
