import React, { useEffect, useState } from "react"

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"

//Import lodash
import { isEmpty, uniqBy } from "lodash";
import * as _ from "lodash"

// Import Editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getCategories } from "../../../Core/ApiCore/Category";
import { getProductViewEditSeller,  RemoveImage, SaveProduct, UpdateProduct, UploadImage } from "../../../Core/ApiCore/ProductSeller";




import Breadcrumb from '../../../Components/Comon/Breadcrumb'


import {useDropzone} from 'react-dropzone';



const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



const FormProduct = (props) => {

  //handle product
  const [product , setProduct] = useState({
    "name": "Half sleeve T-shirt",
    "categoryId": 0,
    "rating": 4,
    "oldPrice": 300,
    "newPrice": 250,
    "quantity": 100,
    "description": "description",
    "specification": "Specification",
    "metaTitle": "Half sleeve T-shirt",
    "metaKeywords": "Half sleeve T-shirt",
    "metaDescription": "Half sleeve "
  })
  const [productEdit , setProductEdit] = useState({})
  const [imagesEdit , setImagesEdit] = useState([])

  const handleDescription = e => {
    setProduct({
      ...product ,
      description:e
    })
    console.log('des  :',product.description)
  }
  const handleEditDescription = e => {
    setProductEdit({
      ...productEdit ,
      description:e
    })
    console.log('des  :',product.description)
  }

  
  const handleSpecification = (e)=>{
    setProduct({
      ...product ,
      specification:e
    })
    console.log('spe  :',product.specification)
  }
  const handleEditSpecification = (e)=>{
    setProductEdit({
      ...productEdit ,
      specification:e
    })
    console.log('spe  :',product.specification)
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
      console.log('files',files)
    }
  });


  const submitProduct = (e)=>{
    e.preventDefault()

    console.log(product)

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
  
  const submitUpdateProduct = (e)=>{
    e.preventDefault()
    
    productEdit.images = undefined

    UpdateProduct(productEdit)
      .then(res=>{
        if(res.success){
          const slug = res.data.slug
          if(!isEmpty(files)) {
            console.log(files)
            files.map(file=>{
              formData.append("photos", file)
            })
            UploadImage(slug,formData)
              .then(res=>console.log(res))
          }
         

          toastr.options.progressBar=true
          toastr.success("Product Updated SuccessFully", "Updated")
          props.history.push(`/seller/product/${slug}`)

        }else{
          toastr.error("", "Error")
        }
      })
  }
  
  const deleteImage = (imageGuid)=>{
    console.log(imageGuid)
    RemoveImage(imageGuid)
      .then(res=>{
       if(res.success){
        console.log(res)
          let imagesList = imagesEdit
          imagesList = imagesList.filter(image=> image.imageGuid !== imageGuid)
          setImagesEdit(imagesList) 
       }
        console.log(res)
      })
    
    
  }
  useEffect(() => {
    
    const slug = props.match.params.slug
    if(slug){
      getProductViewEditSeller(slug)
        .then(res=>{
          setProductEdit(res)
          setImagesEdit(res.images)
          console.log(res)
        })
    }

    getCategories()
      .then(res=>setCategories(res))
  }, [])

  return (
    <React.Fragment>
       <Breadcrumb item="Produits" link="/seller/products" title={!isEmpty(productEdit) ? "Edit produit" : "ajouter produit"} />
        <form onSubmit={!isEmpty(productEdit) ? submitUpdateProduct :  submitProduct}>
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
                      <ReactQuill 
                        theme="snow" 
                        value={!isEmpty(productEdit) ?  productEdit.description  : product.description }
                        onChange={!isEmpty(productEdit) ? (e)=>handleEditDescription(e) : (e)=>handleDescription(e) }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="Specification" className="form-label">Specification</label>
                      <ReactQuill 
                        theme="snow" 
                        value={!isEmpty(productEdit) ?  productEdit.specification  : product.specification }
                        onChange={!isEmpty(productEdit) ? (e)=>handleEditSpecification(e) : (e)=>handleSpecification(e) }
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
          </div>

          {!isEmpty(imagesEdit) && (
            <div  className="card mt-4">
              <div className="card-body" style={thumbsContainer}>
                {!isEmpty(imagesEdit) && imagesEdit.map((image , i)=>(
                  <div style={thumb} key={i} className="position-relative">
                  <div style={thumbInner}>
                  <span onClick={()=>deleteImage(image.imageGuid)} style={{cursor : "pointer"}}  className="featured__offre">X</span>
                    <img
                      src={image.image}
                      style={img}
                    />
                  </div>
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
              <button type="submit" className="btn btn-primary w-100" >{!isEmpty(productEdit) ? "Modifier le produit"  : "Enregister le produit" }</button>
            </div>
          </div>

        </form>
    </React.Fragment>
  )
}

export default FormProduct
