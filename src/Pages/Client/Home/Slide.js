import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import laptop from '../../../assets/images/laptop2.jpg'
import { Link } from 'react-router-dom';
import { slide } from '../../../Components/Comon/data';
import { isEmpty } from 'lodash';

const Slide = ()=>{

    const [slideProduct , setSlideProduct] = useState({})

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
        pauseOnHover: true,
    };

    useEffect(() => {
        setSlideProduct(slide)
    }, [])

    return (
        <React.Fragment>
            {/* <Slider {...settings}> */}
            {!isEmpty(slideProduct) && (
                <div className="home__slide d-flex justify-content-between align-items-center p-lg-2" >
                    <div className="m-2">
                        <h6 className="home__slide__title text-capitalize fw-bold fs-6  first-color  my-4">{slideProduct.title}</h6>
                        <p className="text-muted  mb-3">{slideProduct.description}</p>
                        <Link className="home__slide__btn btn btn-primary py-2 px-2 my-4 border-0" to="products">Shoop Now</Link>
                    </div>
                    <img src={laptop} alt={slideProduct.title} className="home__slide__img" width="160px" />
                </div>
            )}
                
            {/* </Slider> */}
        </React.Fragment>
    )
}
export default Slide
