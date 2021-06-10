import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

//Import Star Ratings
import StarRatings from "react-star-ratings"


import laptop from '../../../assets/images/laptop2.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css' 

const Featured = ()=>{



  useEffect(() => {
    Aos.init({
        duration:2000
    })
}, [])

    return (
        <React.Fragment>
            <section>
              <div className="featured my-5">
                <div className="container-fluid px-lg-5">
                  <h2 className="featured__title text-capitalize fs-4 fw-bold  mx-2 mb-2">Featured</h2>
                </div>
                
                <div className="container-fluid px-lg-5">
                  <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                     <div data-aos="fade-down" className="featured__box shadow-sm"> 
                      <span className="featured__offre">10%</span>  
                      <img src={laptop} alt="name" width="100%" className="featured__img" />
                      <span className="featured__name">Nike Jorden</span>
                      <StarRatings
                        rating={4}
                        starRatedColor="#F1B44C"
                        starEmptyColor="#2D363F"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="3px"
                      />
                      <span className="featured__price">$300</span>
                      <Link to="#" className="featured__link">
                          <span className="featured__name__link">Add to Cart</span>
                          <i className='bx bx-right-arrow-alt featured__icon'></i>
                      </Link>  
                     </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div data-aos="fade-down" className="featured__box shadow-sm"> 
                      <span className="featured__offre">10%</span>  
                      <img src={laptop} alt="name" width="100%" className="featured__img" />
                      <span className="featured__name">Nike Jorden</span>
                      <StarRatings
                        rating={4}
                        starRatedColor="#F1B44C"
                        starEmptyColor="#2D363F"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="3px"
                      />
                      <span className="featured__price">$300</span>
                      <Link to="#" className="featured__link">
                          <span className="featured__name__link">Add to Cart</span>
                          <i className='bx bx-right-arrow-alt featured__icon'></i>
                      </Link>
                      </div>  
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div data-aos="fade-down" className="featured__box shadow-sm"> 
                      <span className="featured__offre">10%</span>  
                      <img src={laptop} alt="name" width="100%" className="featured__img" />
                      <span className="featured__name">Nike Jorden</span>
                      <StarRatings
                        rating={4}
                        starRatedColor="#F1B44C"
                        starEmptyColor="#2D363F"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="3px"
                      />
                      <span className="featured__price">$300</span>
                      <Link to="#" className="featured__link">
                          <span className="featured__name__link">Add to Cart</span>
                          <i className='bx bx-right-arrow-alt featured__icon'></i>
                      </Link>
                      </div>  
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div data-aos="fade-down" className="featured__box"> 
                      <span className="featured__offre">10%</span>  
                      <img src={laptop} alt="name" width="100%" className="featured__img" />
                      <span className="featured__name">Nike Jorden</span>
                      <StarRatings
                        rating={4}
                        starRatedColor="#F1B44C"
                        starEmptyColor="#2D363F"
                        numberOfStars={5}
                        name="rating"
                        starDimension="14px"
                        starSpacing="3px"
                      />
                      <span className="featured__price">$300</span>
                      <Link to="#" className="featured__link">
                          <span className="featured__name__link">Add to Cart</span>
                          <i className='bx bx-right-arrow-alt featured__icon'></i>
                      </Link>
                      </div>   
                    </div>
                  </div>
                </div>
              </div>  
            </section>
        </React.Fragment>
    )
}

export default Featured
