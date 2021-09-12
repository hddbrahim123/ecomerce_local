import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import { isEmpty } from "lodash";
import dictionary from "../../../Core/dictionary";

const ReleatedProduct = (props) => {
  const { ReleatedProducts, history } = props;

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  const content = dictionary.detailProductContent[props.language];
  return (
    <React.Fragment>
      <section>
        <div className="releated">
          <h2 className="releated__title text-left text-capitalize">
            {content.titleRelatedProducts}
          </h2>
          <div className="container-fluid">
            <div className="row">
              {!isEmpty(ReleatedProducts) &&
                ReleatedProducts.map((releatedProduct, i) => (
                  <div
                    onClick={() =>
                      history.push(`/product/${releatedProduct.slug}`)
                    }
                    key={i}
                    data-aos="fade-down"
                    className="col-lg-4 "
                  >
                    <div className="row releated__box shadow-sm">
                      <div className="col-lg-4">
                        <img
                          src={releatedProduct.image}
                          alt="name"
                          className="releated__img"
                          width="100%"
                        />
                      </div>
                      <div className="col-lg-8">
                        <div className="text-center text-md-left pt-4 ">
                          <h5 className="text-muted mb-3 text-truncate">
                            <Link
                              to="#"
                              className="first-color releated__name text-capitalize"
                            >
                              {releatedProduct.name}
                            </Link>
                          </h5>

                          {releatedProduct.newPrice !=
                          releatedProduct.oldPrice ? (
                            <h5 className="releated__price">
                              <span className="text-muted  ms-2">
                                <del>{releatedProduct.oldPrice} Dhs</del>
                              </span>{" "}
                              <b>{releatedProduct.newPrice} Dhs</b>
                            </h5>
                          ) : (
                            <h5 className="releated__price">
                              <b>{releatedProduct.newPrice} Dhs</b>
                            </h5>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default withRouter(ReleatedProduct);
