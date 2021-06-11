import React, { useEffect, useState } from 'react'


import { isEmpty } from 'lodash'

import { getCategories } from '../../../Core/ApiCore/Category'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { Link } from 'react-router-dom'


const Category = ()=>{

  const [categories , setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then(res=>{
        console.log(res)
        setCategories(res)
      })
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
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th data-priority="6">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(categories) && categories.map((category,i)=>(
                <Tr className="py-5" key={i}>
                  <Th>
                    <h5 className="my-3">{category.name}</h5>
                  </Th>
                  <Td>
                    {category.active 
                      ?(
                        <span className="badge bg-primary">Active</span>
                          
                      )
                      :(
                        <span className="badge bg-danger">InActive</span>
                      )}
                  </Td>
                  <Td>
                    <div className="d-flex gap-3">
                    <Link to="#" className="text-success">
                      <i className='bx bx-edit'></i>
                    </Link>
                    <Link to="#" className="text-danger">
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

export default Category
