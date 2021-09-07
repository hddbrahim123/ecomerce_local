import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

//Import Star Ratings
import StarRatings from "react-star-ratings";
import ReleatedProduct from "./Releated";
import ModalPhotos from "./ModalPhotos";

import Aos from "aos";
import "aos/dist/aos.css";
import {
  getProductDetailViewClient,
  getRelatedProducts,
} from "../../../Core/ApiCore/ProductClient";
import ReactHtmlParser from "react-html-parser";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/action";
import dictionary from "../../../Core/dictionary";

const ProductDetails = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );
  const [product, setProduct] = useState({});
  const [releatedProducts, setReleatedProducts] = useState([]);

  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const handleImage = (i) => {
    setIndex(i);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const addItemCart = (product) => {
    const { slug, name, newPrice, oldPrice, images } = product;

    dispatch(addToCart({ slug, name, newPrice: newPrice ?? oldPrice, images }));
    props.history.push("/cart");
  };

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });

    let slug = props.match.params.slug;

    if (slug) {
      getProductDetailViewClient(slug).then((res) => {
        if (res) {
          setProduct(res);
          getRelatedProducts(slug, parseInt(3)).then((res) =>
            setReleatedProducts(res)
          );
        } else {
          props.history.push("/");
        }
      });
    }
  }, [props]);
  const content = dictionary.detailProductContent[language];

  return (
    <React.Fragment>
      <MetaTags>
        <title>{product.metaTitle}</title>
      </MetaTags>

      <ModalPhotos
        images={product.images}
        isOpen={isOpen}
        toggle={toggle}
        index={index}
        setIndex={setIndex}
      />

      <section data-aos="fade-down" className="main">
        <div className="container-fluid pt-2  p-lg-4">
          <div className="card">
            <div className="card-body">
              {!isEmpty(product) && (
                <div className="row main__card">
                  <div
                    data-aos="fade-right"
                    className="col-lg-5 d-flex  align-items-center justify-content-center mb-2 p-lg-5"
                  >
                    <div className="gallery ">
                      <div
                        style={{ backgroundImage: `${product.images[index]}` }}
                      ></div>
                      <img
                        src={product.images[index]}
                        width="100%"
                        alt="product"
                        onClick={toggle}
                        className="gallery__main__img mb-2"
                      />
                      <div className="d-flex justify-content-center">
                        {!isEmpty(product.images) &&
                          product.images.map((image, i) => (
                            <div key={i} className="gallery__small__img m-1">
                              <img
                                src={image}
                                alt={product.name}
                                onClick={() => handleImage(i)}
                                width="100%"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-left" className="col-lg-7 p-lg-5">
                    <div className="info">
                      <div className="data mb-3">
                        <span className="data__subtitle mb-2">
                          {product.category}
                        </span>
                        <h1 className="data__title mb-2 text-capitalize">
                          {product.name}
                        </h1>

                        <div className="text-muted float-start me-3">
                          <StarRatings
                            rating={product.rating}
                            starRatedColor="#F1B44C"
                            starEmptyColor="#2D363F"
                            numberOfStars={5}
                            name="rating"
                            starDimension="14px"
                            starSpacing="3px"
                          />
                        </div>

                        <div className="price my-4">
                          {content.labelPrice} : {""}
                          <span className="price__new ">
                            {product.newPrice} Dhs
                          </span>
                          {product.oldPrice != product.newPrice && (<del className="price__old">
                            {product.oldPrice} Dhs
                          </del>)}
                        </div>
                        <div className="data__description">
                          {ReactHtmlParser(product.description)}
                        </div>
                      </div>
                      {!isEmpty(product.size) && (
                        <div className="size">
                          <h2 className="size__title mb-4">Size</h2>
                          <div className="size__content">
                            <span className="size__tallas">40</span>
                            <span className="size__tallas active">41</span>
                            <span className="size__tallas">42</span>
                            <span className="size__tallas">43</span>
                          </div>
                        </div>
                      )}

                      <div className="action d-flex justify-content-between align-items-center">
                        <Link
                          to="#"
                          className="action__addToCart text-center w-100 text-capitalize"
                          onClick={() => {
                            addItemCart(product);
                          }}
                        >
                          {content.buttonCommandText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {product.details && (<div className="container-fluid pt-2 p-lg-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="">{content.titleDetails}</h5>
                  <div className="p-lg-4">
                    {ReactHtmlParser(product.details)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
        {product.specification && (
          <div className="container-fluid pt-2 p-lg-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="">{content.titleSpecification}</h5>
                    <div className="p-lg-4">
                      {!!product && !!product.specification
                        ? ReactHtmlParser(product.specification)
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section></section>
      <section>
        <ReleatedProduct
          language={language}
          ReleatedProducts={releatedProducts}
        />
      </section>
    </React.Fragment>
  );
};

export default ProductDetails;
