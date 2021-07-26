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
  UploadImage,
} from "../../../Core/ApiCore/ProductSeller";

import Breadcrumb from "../../../Components/Comon/Breadcrumb";

import { useDropzone } from "react-dropzone";
import dictionary from "../../../Core/dictionary";

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
    console.log("des  :", product.description, e);
  };
  const handleEditDescription = (e) => {
    setProductEdit({
      ...productEdit,
      description: e ?? "",
    });
    console.log("des  :", product.description, e);
  };
  const handleSpecification = (e) => {
    setProduct({
      ...product,
      specification: e ?? "",
    });
    console.log("spe  :", product.specification, e);
  };
  const handleEditSpecification = (e) => {
    setProductEdit({
      ...productEdit,
      specification: e ?? "",
    });
    console.log("spe  :", product.specification, e);
  };
  const handleDetails = (e) => {
    setProduct({
      ...product,
      details: e ?? "",
    });
    console.log("spe  :", product.specification, e);
  };
  const handleEditDetails = (e) => {
    setProductEdit({
      ...productEdit,
      details: e ?? "",
    });
    console.log("spe  :", product.specification, e);
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
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
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
    SaveProduct(product).then((res) => {
      if (res.success) {
        const slug = res.data.slug;

        files.map((file) => {
          formData.append("photos", file);
        });
        console.log("form", formData.getAll("photos"));

        UploadImage(slug, formData).then((res) => {
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

    UpdateProduct(productEdit).then((res) => {
      if (res.success) {
        const slug = res.data.slug;
        console.log(slug);
        if (!isEmpty(files)) {
          console.log(files);
          files.map((file) => {
            formData.append("photos", file);
          });
          UploadImage(slug, formData).then((res) => {
            console.log(res, messages.updateProductSuccess);
            toastr.options.progressBar = true;
            toastr.success(messages.updateProductSuccess, "");
            props.history.push(`/seller/product/${slug}`);
          });
        } else {
          console.log(res, messages.updateProductSuccess);
          toastr.options.progressBar = true;
          toastr.success(messages.updateProductSuccess, "");
          props.history.push(`/seller/product/${slug}`);
        }
      } else {
        toastr.error(messages.updateProductError, "Error");
      }
    });
  };

  const deleteImage = (imageGuid) => {
    console.log(imageGuid);
    RemoveImage(imageGuid).then((res) => {
      if (res.success) {
        console.log(res);
        let imagesList = imagesEdit;
        imagesList = imagesList.filter(
          (image) => image.imageGuid !== imageGuid
        );
        setImagesEdit(imagesList);
      }
      console.log(res);
    });
  };
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
                  <label htmlFor="Description" className="form-label">
                    {content.productDescription}
                  </label>
                  <ReactQuill
                    theme="snow"
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
                  <label htmlFor="Specification" className="form-label">
                    {content.productSpecification}
                  </label>
                  <ReactQuill
                    theme="snow"
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
              <div className="card-body" style={thumbsContainer}>
                {!isEmpty(files) &&
                  files.map((image, i) => (
                    <div style={thumb} key={i}>
                      <div style={thumbInner}>
                        <img src={image.preview} style={img} />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>

        {!isEmpty(imagesEdit) && (
          <div className="card mt-4">
            <div className="card-body" style={thumbsContainer}>
              {!isEmpty(imagesEdit) &&
                imagesEdit.map((image, i) => (
                  <div style={thumb} key={i} className="position-relative">
                    <div style={thumbInner}>
                      <span
                        onClick={() => deleteImage(image.imageGuid)}
                        style={{ cursor: "pointer" }}
                        className="featured__offre"
                      >
                        X
                      </span>
                      <img src={image.image} style={img} />
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
        {/* {JSON.stringify(product)}
<br />
{JSON.stringify(productEdit)} */}
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
