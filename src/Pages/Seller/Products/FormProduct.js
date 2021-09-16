import React, { useEffect, useState } from "react";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

//Import lodash
import { isEmpty, uniqBy } from "lodash";
import * as _ from "lodash";

// Import Editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getActiveCategories } from "../../../Core/ApiCore/Category";
import {
  getProductViewEditSeller,
  RemoveImage,
  SaveProduct,
  UpdateProduct,
  UploadImages,
} from "../../../Core/ApiCore/ProductSeller";

import Breadcrumb from "../../../Components/Comon/Breadcrumb";

import { useDropzone } from "react-dropzone";
import dictionary from "../../../Core/dictionary";
import ListSortable from "../../../Components/Comon/ListSortable";
import ListSortable2 from "../../../Components/Comon/ListSortable2";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const FormProduct = (props) => {

  
  const [language] = useState(localStorage.getItem("language") ?? "Fr");
  const content = dictionary.product[language];
  const messages = dictionary.messages[language];
  //handle product
  const [product, setProduct] = useState({
    name: "",
    categoryId: 0,
    rating: 4,
    oldPrice: "",
    newPrice: "",
    quantity: "",
    description: "",
    specification: "",
    details: "",
    mainCharacteristics: "",
    technicalDescription: "",
    general: "",
    garantie: "",
    venduWith: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    active: true,
  });
  const [productEdit, setProductEdit] = useState({});
  const [imagesEdit, setImagesEdit] = useState([]);

  const handleDescription = (e) => {
    setProduct({
      ...product,
      description: e ?? "",
    });
  };
  const handleEditDescription = (e) => {
    setProductEdit({
      ...productEdit,
      description: e ?? "",
    });
  };
  const handleSpecification = (e) => {
    setProduct({
      ...product,
      specification: e ?? "",
    });
  };
  const handleEditSpecification = (e) => {
    setProductEdit({
      ...productEdit,
      specification: e ?? "",
    });
  };
  const handleDetails = (e) => {
    setProduct({
      ...product,
      details: e ?? "",
    });
  };
  const handleEditDetails = (e) => {
    setProductEdit({
      ...productEdit,
      details: e ?? "",
    });
  };
  const handleProduct = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProduct({ ...product, [e.target.id]: value });
    // if (e.target.id == "oldPrice" && product.oldPrice > 0 && !product.newPrice) {
    //   setProduct({ ...product, "newPrice": e.target.value })
    // }
    // if (e.target.id == "newPrice" && product.newPrice > 0 && !product.oldPrice) {
    //   setProduct({ ...product, "oldPrice": e.target.value })
    // }
  };
  const handleProductEdit = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProductEdit({ ...productEdit, [e.target.id]: value });
  };

  //categories
  const [categories, setCategories] = useState([]);

  //handle Image
  var formData = new FormData();

  // const [files, setFiles] = useState([]);

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let position = imagesEdit.length + files.length;
      let newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          position:position++
        })
      );
      setFiles([...files, ...newFiles]);
      console.log("files", files);
    },
  });

  const submitProduct = (e) => {
    e.preventDefault();

    console.log(product);
    if (!product.categoryId) {
      toastr.error(messages.saveProductCategoryRequired, "");
      return;
    }
    if (files.length == 0) {
      toastr.error(messages.saveProductImagesRequired, "");
      return;
    }
    if (!product.oldPrice && !product.newPrice) {
      toastr.error(messages.saveProductPriceRequired, "");
      return;
    }
    if (!product.oldPrice) {
      product.oldPrice = product.newPrice;
      setProduct({ ...product, oldPrice: product.newPrice });
    }
    if (!product.newPrice) {
      product.newPrice = product.oldPrice;
      setProduct({ ...product, newPrice: product.oldPrice });
    }
    SaveProduct(product).then((res) => {
      if (res.success) {
        const slug = res.data.slug;

        files.map((file) => {
          formData.append("photos", file);
        });
        console.log("form", formData.getAll("photos"));

        UploadImages(slug, formData).then((res) => {
          console.log(res);
          toastr.options.progressBar = true;
          toastr.success(res.message ?? messages.insertProductSuccess, "");
          props.history.push(`/seller/product/${slug}`);
        });
      } else {
        console.log(res.message ?? messages.insertProductError ?? res.code);
        toastr.error(
          res.message ?? messages.insertProductError ?? res.code,
          ""
        );
      }
    });
  };

  const submitUpdateProduct = (e) => {
    e.preventDefault();

    console.log(productEdit);
    if (!productEdit.categoryId) {
      toastr.error(messages.saveProductCategoryRequired, "");
      return;
    }
    if (
      (files == undefined || files.length == 0) &&
      (imagesEdit == undefined || imagesEdit.length == 0)
    ) {
      toastr.error(messages.saveProductImagesRequired, "");
      return;
    }

    productEdit.images = undefined;

    UpdateProduct(productEdit)
      .then((res) => {
        if (res.success) {
          const slug = res.data.slug;
          if (imagesEdit.length) {
            UpdateImages()
          }
          if (!isEmpty(files)) {
            console.log(files);
            files.map((file) => {
              formData.append("photos", file);
            });
            UploadImages(slug, formData).then((res) => {
              console.log(res, messages.updateProductSuccess);
              toastr.options.progressBar = true;
              toastr.success(messages.updateProductSuccess, "");
              // props.history.push(`/seller/product/${slug}`);
            });
          } else {
            console.log(res, messages.updateProductSuccess);
            toastr.options.progressBar = true;
            toastr.success(messages.updateProductSuccess, "");
            props.history.push(`/seller/product/${slug}`);
          }
        } else {
          toastr.error(messages.updateProductError);
        }
      })
      .catch((res) => {
        toastr.error(messages.updateProductError);
      });
  };

  const deleteImage = (imageGuid, position) => {
    
    RemoveImage(imageGuid).then((res) => {
      
      if (res.success) {
        let index = imagesEdit.findIndex(e => e.imageGuid === imageGuid);
        if (index !== -1) {
          imagesEdit.splice(index, 1);
          imagesEdit.forEach((e) => {
            if (e.position > position) e.position--
          });
        }
        //setImagesEdit(imagesEdit.filter((image) => image.imageGuid !== imageGuid));
      }
    });
  };
  
  const onSortEndHandler = (images, oldIndex, newIndex) =>{
    console.log(oldIndex, newIndex);
    setImagesEdit(images.filter((image) => image.image));
    setFiles(images.filter((image) => image.preview));
  }

  useEffect(() => {
    const slug = props.match.params.slug;
    console.log(slug);

    getActiveCategories().then((res) => {
      //res.push({})
      setCategories(res);

      if (!!slug) {
        getProductViewEditSeller(slug).then((res) => {
          console.log(res);
          if (res) {
            if (res.images) {
              setImagesEdit(res.images);
            }
            productEdit.images = undefined;
            res.images = undefined;
            setProductEdit(res);
            setProduct({});
          }
        });
      }
    });
  }, []);
  
  const ImageElement = ({value, index}) => value.preview ? (
    <div style={thumb} key={index+imagesEdit.length} className="position-relative">
      <div style={thumbInner}>
        <span
          onClick={() => setFiles(files.filter((e) => e != value))}
          style={{ cursor: "pointer" }}
          className="featured__offre"
        >
          X
        </span>
        <img src={value.preview} style={img} />
      </div>
    </div>
  ) : (
    <div style={thumb} key={index} index={index} className="position-relative">
      <div style={thumbInner}>
        <span
          onClick={() => deleteImage(value.imageGuid, value.position)}
          style={{ cursor: "pointer" }}
          className="featured__offre"
        >
          X
        </span>
        <img src={value.image} style={img} />
      </div>
    </div>
  )

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <React.Fragment>
      <Breadcrumb
        item={content.titleSaveProduct}
        link="/seller/products"
        title={
          !isEmpty(productEdit)
            ? content.titleEditProduit
            : content.titleAddProduit
        }
      />
      <form
        onSubmit={!isEmpty(productEdit) ? submitUpdateProduct : submitProduct}
      >
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="name" className="">
                    {content.productName}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder={content.productPlaceHolderName}
                    value={
                      !isEmpty(productEdit) ? productEdit.name : product.name
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="categoryId" className="">
                    {content.productCategory}
                  </label>
                  <select
                    id="categoryId"
                    className="form-select"
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.categoryId
                        : product.categoryId
                    }
                  >
                    <option>Select category</option>
                    {!isEmpty(categories) &&
                      categories.map((category, i) => (
                        <option key={i} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="oldPrice" className="">
                    {content.productOldPrice}
                  </label>
                  <input
                    id="oldPrice"
                    type="number"
                    className="form-control"
                    placeholder={content.productPlaceHolderOldPrice}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.oldPrice
                        : product.oldPrice
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="newPrice" className="">
                    {content.productNewPrice}
                  </label>
                  <input
                    id="newPrice"
                    type="number"
                    className="form-control"
                    placeholder={content.productPlaceHolderNewPrice}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.newPrice
                        : product.newPrice
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    {content.productLabelQuantity}
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className="form-control"
                    placeholder={content.productPlaceHolderQuantity}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.quantity
                        : product.quantity
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="active"
                    checked={
                      !isEmpty(productEdit)
                        ? productEdit.active
                        : product.active
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                  <label className="form-check-label" htmlFor="active">
                    {content.labelActive}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="rating" className="">
                    {content.productRating}
                  </label>
                  <input
                    id="rating"
                    type="number"
                    className="form-control"
                    placeholder={content.productPlaceHolderRating}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.rating
                        : product.rating
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    {content.productDescription}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.description ?? ""
                        : product.description ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) => handleEditDescription(e)
                        : (e) => handleDescription(e)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="Details" className="form-label">
                    {content.productDetails}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.details ?? ""
                        : product.details ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) => handleEditDetails(e)
                        : (e) => handleDetails(e)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="mainCharacteristics" className="form-label">
                    {content.productMainCharacteristics}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.mainCharacteristics ?? ""
                        : product.mainCharacteristics ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) =>
                            setProductEdit({
                              ...productEdit,
                              mainCharacteristics: e,
                            })
                        : (e) =>
                            setProduct({ ...product, mainCharacteristics: e })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="technicalDescription" className="form-label">
                    {content.productTechnicalDescription}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.technicalDescription ?? ""
                        : product.technicalDescription ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) =>
                            setProductEdit({
                              ...productEdit,
                              technicalDescription: e,
                            })
                        : (e) =>
                            setProduct({ ...product, technicalDescription: e })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="venduWith" className="form-label">
                    {content.productVenduWith}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.venduWith ?? ""
                        : product.venduWith ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) =>
                            setProductEdit({ ...productEdit, venduWith: e })
                        : (e) => setProduct({ ...product, venduWith: e })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="general" className="form-label">
                    {content.productGeneral}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.general ?? ""
                        : product.general ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) => setProductEdit({ ...productEdit, general: e })
                        : (e) => setProduct({ ...product, general: e })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="garantie" className="form-label">
                    {content.productGarantie}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.garantie ?? ""
                        : product.garantie ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) => setProductEdit({ ...productEdit, garantie: e })
                        : (e) => setProduct({ ...product, garantie: e })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="Specification" className="form-label">
                    {content.productSpecification}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.specification ?? ""
                        : product.specification ?? ""
                    }
                    onChange={
                      !isEmpty(productEdit)
                        ? (e) => handleEditSpecification(e)
                        : (e) => handleSpecification(e)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <section className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
                  <div className="mb-3">
                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                  </div>
                  <p className="text-capitalize">{content.productImages}</p>
                </div>
              </div>
              {/* {JSON.stringify(files)}
              <div className="card-body" style={thumbsContainer}>
                {!isEmpty(files) &&
                  files.map((image, i) => (
                    <div style={thumb} key={i}>
                      <div style={thumbInner}>
                        <span
                          style={{ cursor: "pointer" }}
                          className="featured__offre"
                        >
                          X
                        </span>
                        <img src={image.preview} style={img} />
                      </div>
                    </div>
                  ))}
              </div> */}
            </section>
          </div>
        </div>
      {/* {JSON.stringify(imagesEdit)}
      <br/>
      {JSON.stringify(files)} */}
        {/* {(!isEmpty(imagesEdit) || !isEmpty(files)) && (
          <div className="card mt-4">
            <div className="card-body" style={thumbsContainer}>
              {!isEmpty(imagesEdit) && imagesEdit.map(ImageElement)}
              {!isEmpty(files) && files.map(NewImage)}
            </div>
          </div>
        )} */}
        {(!isEmpty(imagesEdit) || !isEmpty(files)) && (
          <div className="card mt-4">
            <div className="card-body" style={thumbsContainer}>
              
            <ListSortable
                  items={imagesEdit.concat(files)} 
                  onSortEndHandler={onSortEndHandler} 
                  element={ImageElement} />

              {/* {!isEmpty(imagesEdit) && 
                <ListSortable2
                  items={imagesEdit} 
                  onSortEndHandler={onSortEndHandler} 
                  element={ImageElement}
                  items2={files}
                  onSortEndHandler2={onSortEndHandler} 
                  element2={ImageElement} />
              } */}
              
              {/* {!isEmpty(files) && 
              <ListSortable listData={files} setListData={setFiles} element={NewImage} />} */}
            
            </div>
          </div>
        )}

        

        <div className="card mt-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="metTitle" className="form-label">
                    {content.labelMetaTitle}
                  </label>
                  <input
                    id="metaTitle"
                    className="form-control"
                    placeholder={content.placeHolderMetaTitle}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.metaTitle
                        : product.metaTitle
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="metKeywords" className="form-label">
                    {content.labelMetaKeywords}
                  </label>
                  <input
                    id="metaKeywords"
                    className="form-control"
                    placeholder={content.placeHolderMetaKeywords}
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.metaKeywords
                        : product.metaKeywords
                    }
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="metaDescription" className="form-label">
                    {content.labelMetaDescription}
                  </label>
                  <textarea
                    id="metaDescription"
                    className="form-control"
                    placeholder={content.placeHolderMetaDescription}
                    rows="5"
                    onChange={
                      !isEmpty(productEdit) ? handleProductEdit : handleProduct
                    }
                    value={
                      !isEmpty(productEdit)
                        ? productEdit.metaDescription
                        : product.metaDescription
                    }
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <button type="submit" className="btn btn-primary w-100">
              {!isEmpty(productEdit)
                ? content.buttonUpdateProduct
                : content.buttonAddProduct}
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FormProduct;
