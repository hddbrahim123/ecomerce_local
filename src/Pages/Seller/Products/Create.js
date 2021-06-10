import React, { useEffect, useState } from "react"

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"

//Import lodash
import { isEmpty } from "lodash";
import * as _ from "lodash"

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import { EditorState , convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { getCategories } from "../../../Core/ApiCore/Category";
import { SaveProduct, UploadImage } from "../../../Core/ApiCore/ProductSeller";

//Upload Images
import ImageUploader from 'react-images-upload';

const CreateProduct = (props) => {

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

  //categories
  const [categories , setCategories] = useState([])

  //handle Image
  const [formData] = useState(new FormData())

  const onDrop = pictures => {
    _.forEach(pictures, picture =>{
      formData.append("photos", picture)
    })
    console.log(formData.getAll('photos'))
  };



  const submitProduct = (e)=>{
    e.preventDefault()
    product.Description =  description
    product.Specification =  specification
    SaveProduct(product)
      .then(res=>{
        if(res.success){
          const slug = res.data.slug
          console.log('slug', slug)
          UploadImage(slug,formData)
            .then(res=>console.log(res))

          toastr.options.progressBar=true
          toastr.success("Product Created SuccessFully", "Created")
          props.history.push("/seller/products")

        }else{
          toastr.error("", "Error")
        }
      })
    console.log(product)
  }

  useEffect(() => {
    getCategories()
      .then(res=>setCategories(res))
  }, [])

  return (
    <React.Fragment>
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
                        value={product.name}
                        onChange={handleProduct}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="categoryId" className="">Categories</label>
                      <select 
                        id="categoryId" 
                        className="form-select"
                        onChange={handleProduct}
                      >
                        <option>Select category</option>
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
                        value={product.oldPrice}
                        onChange={handleProduct}
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
                        value={product.newPrice}
                        onChange={handleProduct}
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
                        value={product.quantity}
                        onChange={handleProduct}
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
            <ImageUploader
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            </div>
          </div>
          
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
                      value={product.metaTitle}
                      onChange={handleProduct}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="metKeywords" className="form-label">meta Keywords</label>
                    <input 
                      id="metaKeywords"
                      className="form-control"
                      placeholder="Meta Keywords..."
                      value={product.metaKeywords}
                      onChange={handleProduct}
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
                      onChange={handleProduct}
                      defaultValue={product.metaDescription}
                      >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <button type="submit" className="btn btn-primary w-100" >Save Product</button>
            </div>
          </div>

        </form>
    </React.Fragment>
  )
}

export default CreateProduct
