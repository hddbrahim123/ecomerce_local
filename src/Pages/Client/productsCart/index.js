import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Aos from "aos";
import "aos/dist/aos.css";
import { isEmpty } from "lodash";
import TotalPrice from "../../../Core/helpers/totalPrice";
import { Link } from "react-router-dom";

import {
  removeProductInCart,
  incProductQty,
  decProductQty,
} from "../../../store/action";
import CreateOrderModal from "./CreateOrderModal";
import dictionary from "../../../Core/dictionary";

const ProductsCart = () => {
  const [language] = useState(localStorage.getItem("language") ?? dictionary.defaultLanguage);
  let products = useSelector((state) => state.Cart.products);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const content = dictionary.orderContent[language];
  return (
    <React.Fragment>
      <CreateOrderModal
        language={language}
        isOpen={modal}
        toggle={toggleModal}
      />
      <section className=" p-lg-4">
        <div className="container-fluid">
          <div className="row mx-lg-4">
            <div className="col-lg-8">
              {!isEmpty(products) ? (
                <>
                  {products.map((product, i) => (
                    <div key={i} className="row">
                      <div className="col-lg-12">
                        <div
                          data-aos="fade-down"
                          className="row productCart  mb-4 bg-white shadow-sm m-1 p-2"
                        >
                          <span
                            className="featured__offre"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(removeProductInCart(product.slug));
                            }}
                          >
                            X
                          </span>
                          <div className="col-lg-2">
                            <img
                              src={product.images[0]}
                              alt="name"
                              className="productCart__img"
                              width="100%"
                            />
                          </div>
                          <div className="col-lg-10 d-flex flex-column justify-content-between">
                            <h5 className="mb-3 text-capitalize  pt-3 fs-4 text-truncate">
                              <Link
                                to={"/product/" + product.slug}
                                className="first-color "
                              >
                                {product.name}
                              </Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-end ">
                              <h5 className="text-muted fs-6">
                                {product.newPrice} X {product.qty} ={" "}
                                <span className="first-color">
                                  {product.newPrice * product.qty} Dhs
                                </span>
                              </h5>
                              <div className="">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    dispatch(decProductQty(product));
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-2">{product.qty}</span>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    dispatch(incProductQty(product));
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="card m-lg-4">
                  <div className="card-body">
                    <div className="text-center">
                      <h2 className="first-color">Your Cart is Empty</h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4 h-100">
              <div className="card my-2 p-2 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted text-capitalize">{content.labelSubTotal}</span>
                    <span className="fw-bold">${TotalPrice(products)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted text-capitalize">{content.labelShipping}</span>
                    <span className="fw-bold">-</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted text-capitalize">{content.labelSubTotal}</span>
                    <span className="fw-bold">${TotalPrice(products)}</span>
                  </div>
                </div>
              </div>
              <div className="card my-2 p-2 shadow-sm">
                <div className="card-body d-flex justify-content-between">
                  <span className="text-capitalize text-muted">{content.labelTotal}</span>
                  <span className="fw-bold">${TotalPrice(products)}</span>
                </div>
                <Link
                  to="#"
                  className="btn btn-primary border-0 text-white w-100"
                  onClick={toggleModal}
                >
                  {content.buttonOrderText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductsCart;
