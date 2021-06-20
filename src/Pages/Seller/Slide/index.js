import React, { useEffect, useState } from 'react'


import { isEmpty } from 'lodash'

import ReactHtmlParser from 'react-html-parser'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { Link } from 'react-router-dom'

import { getProductsSlide } from '../../../Core/ApiCore/ProductHome'


const Slides = ()=>{

    const [slides , setSlides] = useState([])

    useEffect(() => {
        getProductsSlide()
            .then(res=>setSlides(res))
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
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th data-priority="6">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(slides) && slides.map((slide,i)=>(
                <Tr className="py-5" key={i}>
                  <Th>
                    <h5 className="my-3">{slide.title}</h5>
                  </Th>
                  <Th>
                    <p className="my-3">{ ReactHtmlParser (slide.description)}</p>
                  </Th>
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

export default Slides

