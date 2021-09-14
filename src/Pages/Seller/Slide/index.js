import React, { useEffect, useState } from 'react'


import { isEmpty } from 'lodash'

import ReactHtmlParser from 'react-html-parser'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { Link } from 'react-router-dom'

import { getProductsSlide } from '../../../Core/ApiCore/ProductHome'
import { RemoveSlide } from '../../../Core/ApiCore/ProductSeller'
import { UpSlide, DownSlide } from '../../../Core/ApiCore/Slide'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"


const Slides = ()=>{

    const [slides, setSlides] = useState([])

    const deleteSlide = (id) =>{
      RemoveSlide(id)
        .then(res=>{
          if(res.success)
          {
            let slideList = slides
            slideList = slideList.filter(slide=>slide.id !== id)
            setSlides(slideList)

            toastr.options.progressBar = true
            toastr.success("Slide est supprimé avec succès")
          }
          else
          {
            toastr.options.progressBar = true
            toastr.error("Echec de suppression du slide")
          }
        })
    }
    const Down = (slide) =>{
      DownSlide(slide.id).then((res)=>{
        getProductsSlide()
          .then(res=>setSlides(res))
      })
      
    }
    const Up = (slide) =>{
      UpSlide(slide.id).then((res)=>{
        getProductsSlide()
          .then(res=>setSlides(res))
      })
    }
    useEffect(() => {
        getProductsSlide()
            .then(res=>setSlides(res))
    }, [])

    return (
        <React.Fragment>
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 ">
            <Link to="/seller/slide/create" className="pull-rigth">Nouveau Slide</Link>
          </div>
        </div>
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
                  <Th></Th>
                  <Th>Image</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th></Th>
                  <Th data-priority="6">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(slides) && slides.map((slide,i)=>(
                <Tr className="py-5" key={i}>
                  <Td>
                    <p className="my-3">{slide.index}</p>
                  </Td>
                  <Td>
                    <img src={slide.image} alt={slide.title} width="100px" />
                  </Td>
                  <Td>
                    <h5 className="my-3">{slide.title}</h5>
                  </Td>
                  <Td>
                    <p className="my-3">{ ReactHtmlParser (slide.description)}</p>
                  </Td>
                  <Td>
                  <div>
                    <Link onClick={()=>{ Down(slide) }} to="#">
                      <i className='bx bxs-chevron-up'></i>
                    </Link>
                    <Link onClick={()=>{ Up(slide) }} to="#">
                      <i className='bx bxs-chevron-down'></i>
                    </Link>
                  </div>
                  </Td>
                  <Td>
                    <div className="d-flex gap-3">
                    {
                      <Link to={"/seller/slide/edit/"+slide.id} className="text-success">
                      <i className='bx bx-edit'></i>
                      </Link>
                    }
                    <Link onClick={()=>deleteSlide(slide.id)} to="#" className="text-danger" style={{cursor:"pointer"}}>
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

