import React, { useState } from 'react'

// Import Editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormSlide = ()=>{

    const [slide , setSlide ] = useState({
        "title":"title",
        "description":"description",
        "image": new FormData()
    })

    const handleSlide = (e)=>{
        setSlide({
            ...slide,
            [e.target.id]:e.target.value
        })
    }

    const handleDescription = (e)=>{
        setSlide({
            ...slide,
            description:e
        })
    }

    const submitSlide = (e)=>{
        e.preventDefault()

        console.log(slide)
    }

    return (
        <React.Fragment>
     <form onSubmit={submitSlide}>
          <div className="card">
            <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">                         
                      <label htmlFor="title" className="">title</label>
                      <input 
                        id="title" 
                        type="text" 
                        className="form-control" 
                        placeholder="Title..." 
                        value={slide.title}
                        onChange={handleSlide}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <ReactQuill 
                        theme="snow" 
                        value={slide.description }
                        onChange={(e)=>handleDescription(e) }
                      />
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* <div className="card mt-4">
            <div className="card-body">
            <section className="container">
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
                  <div className="mb-3">
                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                  </div>
                  <p className="text-capitalize">Drag or Upload Images</p>
                </div>
              </div>
              <div className="card-body" style={thumbsContainer}>
                {!isEmpty(files) && files.map((image , i)=>(
                  <div style={thumb} key={i}>
                  <div style={thumbInner}>
                    <img
                      src={image.preview}
                      style={img}
                    />
                  </div>
                </div>
                ))}                
              </div>
            </section>
            </div>
          </div> */}
          
          <div className="card mt-4">
            <div className="card-body">
              <button type="submit" className="btn btn-primary w-100" >engegistr le slide</button>
            </div>
          </div>

        </form>
    
        </React.Fragment>
    )
}

export default FormSlide
