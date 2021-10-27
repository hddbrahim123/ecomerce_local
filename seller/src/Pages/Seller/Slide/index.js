import React, { useEffect, useState } from 'react'


import { isEmpty } from 'lodash'

import ReactHtmlParser from 'react-html-parser'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { Link } from 'react-router-dom'

import { GetSlideData } from '../../../Core/ApiCore/ProductHome'
import { RemoveSlide } from '../../../Core/ApiCore/ProductSeller'
import { UpSlide, DownSlide } from '../../../Core/ApiCore/Slide'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import ModalConfirmation from '../../../Components/Comon/ModalConfirmation'
import dictionary from '../../../Core/dictionary'
import { API_URL } from '../../../config'


const Slides = ()=>{

    const [slides, setSlides] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [slideId, setSlideId] = useState(0)
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
        GetSlideData()
          .then(res=>setSlides(res))
      })
      
    }
    const Up = (slide) =>{
      UpSlide(slide.id).then((res)=>{
        GetSlideData()
          .then(res=>setSlides(res))
      })
    }
    const urlImage = (image) =>{
      return `${API_URL}User/ImageSlide?image=${image}`;
    }
    useEffect(() => {
        GetSlideData()
            .then(res=>setSlides(res))
    }, [])
    const [language] = useState(localStorage.getItem("language") ?? "Fr");
    const content = dictionary.slide[language];
    return (
        <React.Fragment>
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 ">
            <Link to="/seller/slide/create" className="pull-rigth">Créer Nouveau Slide</Link>
          </div>
        </div>
        <ModalConfirmation 
          isOpen={isOpen} 
          toggle={()=>setIsOpen(!isOpen)}
          title={content.titleRemoveSlide}
          message={content.removeSlideMessageConfirmation}
          buttonTextProcess={content.buttonRemoveSlideText}
          buttonTextClose={content.buttonClose} 
          handleProcess={()=>{ deleteSlide(slideId); setIsOpen(!isOpen);}} 
        />
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
                    <img src={urlImage(slide.image)} alt={slide.title} width="100px" height="100px" />
                  </Td>
                  <Td>
                    <h5 className="my-3">{slide.title}</h5>
                  </Td>
                  <Td>
                    <div className="my-3">{ slide.description ? ReactHtmlParser (slide.description):""}</div>
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
                    <Link onClick={()=> { setSlideId(slide.id); setIsOpen(!isOpen); }} to="#" className="text-danger" style={{cursor:"pointer"}}>
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

