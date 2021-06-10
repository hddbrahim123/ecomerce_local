import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import StarRatings from 'react-star-ratings'

import new1 from '../../../assets/images/product-1.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'

const ReleatedProduct = ()=>{

  useEffect(()=>{
    Aos.init({
      duration:2000
    })
  },[])

    return (
        <React.Fragment>
          <section>
            <div className="releated">
              <h2 className="releated__title text-center">releated product</h2>
              <div cl="container-fluid">
                <div className="row">
                  <div data-aos="fade-down" className="col-lg-4 ">
                    <div className="row releated__box shadow">
                      <div className="col-lg-4">
                      <img src={new1} alt="name" className="releated__img" />       
                      </div>
                      <div className="col-lg-8">
                        <div className="text-center text-md-left pt-4 ">
                          <h5 className="mb-3 text-truncate">
                            <Link to="#" className="releated__name">
                              Wirless Headphone
                            </Link>
                          </h5>
                          <div className="text-muted mb-3">
                            <StarRatings
                              rating={4}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#2D363F"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                            />
                          </div>
                          <h5 className="releated__price">
                            <span className="text-muted  ms-2">
                              <del>$300</del>
                            </span>{" "}
                            <b>$200</b>
                          </h5>
                        </div>       
                      </div>    
                    </div>  
                  </div>
                  <div data-aos="fade-down" className="col-lg-4 ">
                    <div className="row releated__box shadow">
                      <div className="col-lg-4">
                      <img src={new1} alt="name" className="releated__img" />       
                      </div>
                      <div className="col-lg-8">
                        <div className="text-center text-md-left pt-4 ">
                          <h5 className="mb-3 text-truncate">
                            <Link to="#" className="releated__name">
                              Wirless Headphone
                            </Link>
                          </h5>
                          <div className="text-muted mb-3">
                            <StarRatings
                              rating={4}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#2D363F"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                            />
                          </div>
                          <h5 className="releated__price">
                            <span className="text-muted  ms-2">
                              <del>$300</del>
                            </span>{" "}
                            <b>$200</b>
                          </h5>
                        </div>       
                      </div>    
                    </div>  
                  </div>
                  <div data-aos="fade-down" className="col-lg-4 ">
                    <div className="row releated__box shadow">
                      <div className="col-lg-4">
                      <img src={new1} alt="name" className="releated__img" />       
                      </div>
                      <div className="col-lg-8">
                        <div className="text-center text-md-left pt-4 ">
                          <h5 className="mb-3 text-truncate">
                            <Link to="#" className="releated__name">
                              Wirless Headphone
                            </Link>
                          </h5>
                          <div className="text-muted mb-3">
                            <StarRatings
                              rating={4}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#2D363F"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                            />
                          </div>
                          <h5 className="releated__price">
                            <span className="text-muted  ms-2">
                              <del>$300</del>
                            </span>{" "}
                            <b>$200</b>
                          </h5>
                        </div>       
                      </div>    
                    </div>  
                  </div>
                </div>
              </div>  
            </div>
          </section>  
        </React.Fragment>
    )
}

export default ReleatedProduct
