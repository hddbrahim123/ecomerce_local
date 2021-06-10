import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { isEmpty } from 'lodash'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { getProductsSeller } from '../../../Core/ApiCore/ProductSeller'



const Products = (props) => {

  const [products , setProducts] = useState([])

  useEffect(() => {
    getProductsSeller()
      .then(res=>setProducts(res))
  }, [])

    return (
      <React.Fragment>
       <div className="container-fluid">
        <div className="row">
         <div className="table-rep-plugin ">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              className="table custom__table  table-nowrap align-middle table-borderless"
            >
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th data-priority="3">Price promo</Th>
                  <Th data-priority="3">Status</Th>
                  <Th data-priority="3">View</Th>
                  <Th data-priority="6">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(products) && products.map((product,i)=>(
                <Tr key={i}>
                  <Th>
                    <img src={product.image} alt={product.name} className="avatar__lg" />
                  </Th>
                  <Th>
                    <Link to="#" className="text-dark" >{product.name}</Link>
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
                      View Details
                    </button>
                  </Td>
                  <Td>
                    <div className="d-flex gap-3">
                    <Link to="#" className="text-success fw-bold">
                      <i className='bx bx-edit'></i>
                    </Link>
                    <Link to="#" className="text-danger  fw-bold">
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
        </div>
       </div>
      </React.Fragment>
    )
}

export default Products
