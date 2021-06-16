import React, { useEffect, useMemo, useState } from "react"

import {Link} from "react-router-dom"

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"

//Import lodash
import { isEmpty, uniqBy } from "lodash";
import * as _ from "lodash"

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import { EditorState , convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { getCategories } from "../../../Core/ApiCore/Category";
import { getProductViewSeller, RemoveImage, SaveProduct, UploadImage } from "../../../Core/ApiCore/ProductSeller";



import Breadcrumb from '../../../Components/Comon/Breadcrumb'

import Dropzone from "react-dropzone"

import {useDropzone} from 'react-dropzone';






const FormProduct = (props) => {

  //handle product
  const [product , setProduct] = useState({
    "name": "Half sleeve T-shirt",
    "categoryId": 0,
    "rating": 4,
    "oldPrice": 300,
    "newPrice": 250,
    "quantity": 100,
    "metaTitle": "Half sleeve T-shirt",
    "metaKeywords": "Half sleeve T-shirt",
    "metaDescription": "Half sleeve "
  })
  const [productEdit , setProductEdit] = useState({})


  //handle Editor description
  const [descriptionState, setdescriptionState] = useState(EditorState.createEmpty())
  const [description, setdescription] = useState()

  const onEditorStateDescriptionChange = (descriptionState)=>{
    setdescriptionState(descriptionState)
    setdescription(draftToHtml(convertToRaw(descriptionState.getCurrentContent())))
  }

  //handle Editor specification
  const [specificationState, setSpecificationState] = useState(EditorState.createEmpty())
  const [specification, setSpecification] = useState()

  const onEditorStateSpecificationChange = (specificationState)=>{
    setSpecificationState(specificationState)
    setSpecification(draftToHtml(convertToRaw(specificationState.getCurrentContent())))
  }


  const handleProduct = (e) => setProduct({...product ,[e.target.id]:e.target.value })
  const handleProductEdit = (e) => setProductEdit({...productEdit ,[e.target.id]:e.target.value })

  //categories
  const [categories , setCategories] = useState([])





  //handle Image
  var formData = new FormData();

  // const [files, setFiles] = useState([]);

  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      // acceptedFiles.map(file=>{
      //   formData.append("photos", file)
      // })
      console.log('files',files)
    }
  });


  const submitProduct = (e)=>{
    e.preventDefault()

    product.Description =  description
    product.Specification =  specification

    

    SaveProduct(product)
      .then(res=>{
        if(res.success){
          const slug = res.data.slug

          files.map(file=>{
            formData.append("photos", file)
          })
          console.log('form',formData.getAll('photos'))

          UploadImage(slug,formData)
            .then(res=>console.log(res))

          toastr.options.progressBar=true
          toastr.success("Product Created SuccessFully", "Created")
          props.history.push(`/seller/product/${slug}`)

        }else{
          toastr.error("", "Error")
        }
      })
  }

  const deleteImage = (slug)=>{
    RemoveImage(slug)
      .then(res=>{
        console.log(res)
        // let imageList = productEdit.images
        // imageList = imageList.filter(image => image.slug !== slug )
      })
  }
  useEffect(() => {
    
    const slug = props.match.params.slug
    if(slug){
      getProductViewSeller(slug)
        .then(res=>{
          setProductEdit(res)
          console.log('edit',productEdit)
        })
    }

    getCategories()
      .then(res=>setCategories(res))
  }, [])

  return (
    <React.Fragment>
       <Breadcrumb item="Produits" link="/seller/products" title={!isEmpty(productEdit) ? "Edit produit" : "ajouter produit"} />
        <form onSubmit={submitProduct}>
          <div className="card">
            <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">                         
                      <label htmlFor="name" className="">Name</label>
                      <input 
                        id="name" 
                        type="text" 
                        className="form-control" 
                        placeholder="Name..." 
                        value={!isEmpty(productEdit)  ? productEdit.name : product.name}
                        onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="categoryId" className="">Categories</label>
                      <select 
                        id="categoryId" 
                        className="form-select"
                        onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                        value={!isEmpty(productEdit) ?  productEdit.categoryId  : product.categoryId }
                      >
                        {!isEmpty(categories) && categories.map((category , i)=>(
                          <option key={i} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="oldPrice" className="">Old Price</label>
                      <input 
                        id="oldPrice" 
                        type="number" 
                        className="form-control" 
                        placeholder="old Price ..."
                        value={!isEmpty(productEdit) ?  productEdit.oldPrice  : product.oldPrice }
                        onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="newPrice" className="">New Price</label>
                      <input 
                        id="newPrice"
                        type="number"
                        className="form-control"
                        placeholder="New Price"
                        value={!isEmpty(productEdit) ?  productEdit.newPrice  : product.newPrice }
                        onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                      />
                    </div>
                  </div>  
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">Quantity</label>
                      <input 
                        id="quantity"
                        type="number"
                        className="form-control"
                        placeholder="Quantity..."
                        value={!isEmpty(productEdit) ?  productEdit.quantity  : product.quantity }
                        onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="Description" className="form-label">Description</label>
                      <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"                        
                        placeholder="Description ..."
                        editorState={descriptionState}
                        onEditorStateChange={onEditorStateDescriptionChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="Specification" className="form-label">Specification</label>
                      <Editor
                        toolbarClassName="toolbar-class"
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        placeholder="specification ..."
                        editorState={specificationState}
                        onEditorStateChange={onEditorStateSpecificationChange}
                      />
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="card mt-4">
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
              <div className="card-body d-flex justify-content-center align-items-center m-4 border-2 ">
                {!isEmpty(files) && files.map((image , i)=>(
                  <div key={i} className="position-relative m-2">
                    <span className="featured__offre">X</span>
                    <img src={image.preview} alt={productEdit.name} width="150px"  />
                  </div>
                ))}                
              </div>
            </section>
            </div>
          </div>

          {!isEmpty(productEdit.images) && (
            <div className="card mt-4">
              <div className="card-body d-flex justify-content-center align-items-center m-4 border-2 ">
                {!isEmpty(productEdit.images) && productEdit.images.map((image , i)=>(
                  <div key={i} className="position-relative m-2">
                    <span className="featured__offre">X</span>
                    <img src={image} alt={productEdit.name} width="200px"  />
                  </div>
                ))}                
              </div>
            </div>
          )}
          
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="metTitle" className="form-label">meta title</label>
                    <input 
                      id="metaTitle"
                      className="form-control"
                      placeholder="Meta Title..."
                      value={!isEmpty(productEdit) ?  productEdit.metaTitle  : product.metaTitle }
                      onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="metKeywords" className="form-label">meta Keywords</label>
                    <input 
                      id="metaKeywords"
                      className="form-control"
                      placeholder="Meta Keywords..."
                      value={!isEmpty(productEdit) ?  productEdit.metaKeywords  : product.metaKeywords }
                      onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="metaDescription" className="form-label">Meta Description</label>
                    <textarea 
                      id="metaDescription" 
                      className="form-control" 
                      placeholder="meta description..."
                      rows="5"
                      onChange={!isEmpty(productEdit) ? handleProductEdit :handleProduct}
                      value={!isEmpty(productEdit) ?  productEdit.Description  : product.metaDescription }
                      >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <button type="submit" className="btn btn-primary w-100" >{!isEmpty(productEdit) ? "modifier le produit"  : "engegistr le produit" }</button>
            </div>
          </div>

        </form>
    </React.Fragment>
  )
}

export default FormProduct
