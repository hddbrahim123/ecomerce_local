import React, { useEffect, useState } from "react";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

//Import lodash
import { isEmpty } from "lodash";
// import * as _ from "lodash";
import StarRatings from "react-star-ratings";

// // Import Editor
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import ModalConfirmation from "../../../Components/Comon/ModalConfirmation";

import {
  getCategories,
} from "../../../Core/ApiCore/Category";
import {
  getProductViewEditSeller,
  SaveProduct,
  UpdateProduct,
  UploadImages,
  UpdateImages,
} from "../../../Core/ApiCore/ProductSeller";

import Breadcrumb from "../../../Components/Comon/Breadcrumb";

import { useDropzone } from "react-dropzone";
import dictionary from "../../../Core/dictionary";
import ListSortable from "../../../Components/Comon/ListSortable";
import { Link } from "react-router-dom";
import TextEditor from "../../../Core/TextEditor";
import CategorySelecter from "./CategorySelecter";

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
  const [isOpen, setIsOpen] = useState(false);
  const content = dictionary.product[language];
  const messages = dictionary.messages[language];
  //handle product
  const [product, setProduct] = useState({
    name: "",
    categoryId: 0,
    rating: 3,
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
  //const [selectedCategory, setSelectedCategory] = useState({});

  const onCategoryChange = (c) => {
    //setSelectedCategory(c);
    if (!isEmpty(productEdit)) {
      productEdit.categoryId = c.id;
      setProductEdit({ ...productEdit, categoryId: c.id });
    } else {
      product.categoryId = c.id;
      setProduct({ ...product, categoryId: c.id });
    }
  };
  const changeRating = (newRating, name) => {
    if (!isEmpty(productEdit)) {
      setProductEdit({ ...productEdit, rating: newRating });
    } else {
      setProduct({ ...product, rating: newRating });
    }
  };

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
    // if (e.target.id === "oldPrice" && product.oldPrice > 0 && !product.newPrice) {
    //   setProduct({ ...product, "newPrice": e.target.value })
    // }
    // if (e.target.id === "newPrice" && product.newPrice > 0 && !product.oldPrice) {
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [files, setFiles] = useState([]);

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let position = imagesEdit.length + files.length;
      let newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          position: position++,
        })
      );
      setFiles([...files, ...newFiles]);
      //console.log(files.map(img => img.position));
      //console.log("files", files);
    },
  });

  const submitProduct = () => {
    setIsOpen(!isOpen);
    //console.log(product);

    SaveProduct(product).then((res) => {
      if (res.success) {
        const slug = res.data.slug;
        var formData = new FormData();
        files.map((file) => {
          formData.append("photos", file);
        });
        // console.log("form", formData.getAll("photos"));
        UploadImages(slug, formData).then((res) => {
          setProduct({ ...product, slug: slug });
          toastr.options.progressBar = true;
          toastr.success(res.message ?? messages.insertProductSuccess, "");
          // props.history.push(`/seller/product/${slug}`);
        });
      } else {
        // console.log(res.message ?? messages.insertProductError ?? res.code);
        toastr.error(
          res.message ?? messages.insertProductError ?? res.code,
          ""
        );
      }
    });
  };
  const confirmer = () => {
    if (!isEmpty(productEdit)) {
      //console.log(productEdit);
      if (!productEdit.name) {
        toastr.error(messages.saveProductNameRequired, "");
        return false;
      }
      if (!productEdit.categoryId) {
        toastr.error(messages.saveProductCategoryRequired, "");
        return false;
      }
      if (!productEdit.quantity) {
        toastr.error(messages.saveProductQuantityRequired, "");
        return false;
      }
      if (
        (files === undefined || files.length === 0) &&
        (imagesEdit === undefined || imagesEdit.length === 0)
      ) {
        toastr.error(messages.saveProductImagesRequired, "");
        return false;
      }
      if (!productEdit.oldPrice && !productEdit.newPrice) {
        toastr.error(messages.saveProductPriceRequired, "");
        return false;
      }
      if (!productEdit.oldPrice) {
        productEdit.oldPrice = productEdit.newPrice;
        setProductEdit({ ...productEdit, oldPrice: productEdit.newPrice });
      }
      if (!productEdit.newPrice) {
        productEdit.newPrice = productEdit.oldPrice;
        setProductEdit({ ...productEdit, newPrice: productEdit.oldPrice });
      }
      return true;
    } else if (!isEmpty(product)) {
      //console.log(product);
      if (!product.name) {
        toastr.error(messages.saveProductNameRequired, "");
        return false;
      }
      if (!product.categoryId) {
        toastr.error(messages.saveProductCategoryRequired, "");
        return false;
      }
      if (!product.quantity) {
        toastr.error(messages.saveProductQuantityRequired, "");
        return false;
      }
      if (files.length === 0) {
        toastr.error(messages.saveProductImagesRequired, "");
        return false;
      }
      if (!product.oldPrice && !product.newPrice) {
        toastr.error(messages.saveProductPriceRequired, "");
        return false;
      }
      if (!product.oldPrice) {
        product.oldPrice = product.newPrice;
        setProduct({ ...product, oldPrice: product.newPrice });
      }
      if (!product.newPrice) {
        product.newPrice = product.oldPrice;
        setProduct({ ...product, newPrice: product.oldPrice });
      }
      return true;
    }
    return false;
  };
  const submitUpdateProduct = () => {
    setIsOpen(!isOpen);

    productEdit.images = undefined;

    UpdateProduct(productEdit)
      .then((res) => {
        if (res.success) {
          const slug = res.data.slug;
          UpdateImages(productEdit.slug, imagesEdit).then((res) => {
            if (res && !isEmpty(files)) {
              var formData = new FormData();
              files.map((file) => {
                formData.append("photos", file);
              });
              UploadImages(slug, formData).then((res) => {
                setFiles([]);
                toastr.options.progressBar = true;
                toastr.success(messages.updateProductSuccess, "");
                // props.history.push(`/seller/product/${slug}`);
                chargeData();
              });
            } else {
              toastr.options.progressBar = true;
              toastr.success(messages.updateProductSuccess, "");
              chargeData();
            }
          });
        } else {
          toastr.error(messages.updateProductError);
        }
      })
      .catch((res) => {
        toastr.error(messages.updateProductError);
      });
  };

  const deleteImage = (imageGuid, position) => {
    // RemoveImage(imageGuid).then((res) => {
    //   if (res.success) {
    //   }
    // });

    let newFiles = imagesEdit.filter((f) => f.imageGuid !== imageGuid);
    newFiles.forEach((f) => {
      if (f.position > position) f.position--;
    });
    setImagesEdit(newFiles);
    //console.log(imagesEdit.concat(files).map((e) => e.position));
  };

  const deleteNewFiles = (value, index) => {
    let newFiles = files.filter((f) => f !== value);
    newFiles.forEach((f) => {
      if (f.position > value.position) f.position--;
    });
    setFiles(newFiles);
    //console.log(imagesEdit.concat(files).map((e) => e.position));
  };

  const onSortEndHandler = (images, oldIndex, newIndex) => {
    //console.log(oldIndex, newIndex);
    setImagesEdit(images.filter((image) => image.image));
    setFiles(images.filter((image) => image.preview));
    //console.log(images.map((img) => img.position));
  };
  
  const findCheminCategory = (cats, id) => {
    let tab = [];
    cats.forEach(category => {
      if (category.id === id) {
        tab = [category];
      } else if (category.children) {
        let t = findCheminCategory(category.children, id);
        if (t.length) {
          tab = [category, ...t];
        }
      }
    });
    return tab;
  };

  const chargeData = () => {
    const slug = props.match.params.slug;
    getCategories(false).then(categories => {
      setCategories(categories);
      if (!!slug) {
        getProductViewEditSeller(slug).then(res => {
          if (res) {
            if (res.images) {
              setImagesEdit(res.images);
            }
            productEdit.images = undefined;
            res.images = undefined;
            setProductEdit(res);
            setProduct({});
            if (res.categoryId) {
              // setSelectedCategory({...selectedCategory, id: res.categoryId});
              if (res.categoryId) {
                //console.log(res.categoryId);
                let tab = findCheminCategory(categories, res.categoryId);
                //console.log(tab);
                if (tab.length) {
                  setSelectedCategories(tab);
                }
              }
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    chargeData();
  }, []);

  const ImageElement = ({ value, index }) =>
    value.preview ? (
      <div
        style={thumb}
        key={index + imagesEdit.length}
        className="position-relative"
      >
        <div style={thumbInner}>
          <span
            onClick={() => deleteNewFiles(value, index)}
            style={{ cursor: "pointer" }}
            className="featured__offre"
          >
            X
          </span>
          <img src={value.preview} style={img} />
        </div>
      </div>
    ) : (
      <div
        style={thumb}
        key={index}
        index={index}
        className="position-relative"
      >
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
    );

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
      <ModalConfirmation
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        title={
          !isEmpty(productEdit)
            ? content.titleUpdateProductConfirmation
            : content.titleSaveProductConfirmation
        }
        message={
          !isEmpty(productEdit)
            ? content.updateProductMessageConfirmation
            : content.saveProductMessageConfirmation
        }
        buttonTextProcess={content.buttonSaveProductText}
        buttonTextClose={content.buttonClose}
        handleProcess={
          !isEmpty(productEdit) ? submitUpdateProduct : submitProduct
        }
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <CategorySelecter
                  categories={categories}
                  selectCategory={onCategoryChange}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
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
              {/* <div className="col-6">
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
              </div> */}
            </div>
            <div className="row">
              <div className="col-6">
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
              <div className="col-6">
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
              <div className="col-12">
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
              <div className="col-12">
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="rating" className="">
                    {content.productRating}
                  </label>
                  <div className="text-muted mb-3">
                    <StarRatings
                      rating={
                        !isEmpty(productEdit)
                          ? productEdit.rating
                          : product.rating
                      }
                      starRatedColor="#F1B44C"
                      starEmptyColor="#2D363F"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="6px"
                      changeRating={changeRating}
                    />
                  </div>
                  {/* <input
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
                  /> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    {content.productDescription}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="Details" className="form-label">
                    {content.productDetails}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="mainCharacteristics" className="form-label">
                    {content.productMainCharacteristics}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="technicalDescription" className="form-label">
                    {content.productTechnicalDescription}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="venduWith" className="form-label">
                    {content.productVenduWith}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="general" className="form-label">
                    {content.productGeneral}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="garantie" className="form-label">
                    {content.productGarantie}
                  </label>
                  <TextEditor
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
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="Specification" className="form-label">
                    {content.productSpecification}
                  </label>
                  <TextEditor
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

        {(!isEmpty(imagesEdit) || !isEmpty(files)) && (
          <div className="card mt-4">
            <div className="card-body" style={thumbsContainer}>
              <ListSortable
                items={imagesEdit.concat(files)}
                onSortEndHandler={onSortEndHandler}
                element={ImageElement}
              />
            </div>
          </div>
        )}

        <div className="card mt-4">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
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
              <div className="col-6">
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
        {(product.slug || productEdit.slug) && (
          <div className="card mt-4">
            <div className="card-body">
              <Link
                to={"/product/" + (product.slug ?? productEdit.slug)}
                target="_blank"
                className="text-success"
              >
                <i className="bx bx-view">Afficher details</i>
              </Link>
            </div>
          </div>
        )}
        <div className="card mt-4">
          <div className="card-body">
            <button
              type="button"
              onClick={() => {
                if (confirmer()) setIsOpen(!isOpen);
              }}
              className="btn btn-primary w-100"
            >
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
