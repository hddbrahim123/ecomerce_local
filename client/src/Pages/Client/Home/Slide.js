import React from 'react'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactHtmlParser from 'react-html-parser'

import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import dictionary from "../../../Core/dictionary"
import { API_URL } from '../../../config';
const Slide = ({language,slides})=>{
    var settings = {
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
    };
    const content = dictionary.homeContent[language]
    
    const urlImage = (image) =>{
        return `${API_URL}User/ImageSlide?image=${image}`;
      }
    return (
        <React.Fragment>
            <Slider {...settings}>
                {!isEmpty(slides) && slides.map((slide , i)=>(
                    <div key={i} className="home__slide d-flex justify-content-between align-items-center p-lg-2" >
                        <div className="m-2">
                            <h6 className="home__slide__title text-capitalize fw-bold fs-6 first-color my-4">{slide.title}</h6>
                            <div className="text-muted mb-3">{ slide.description ? ReactHtmlParser(slide.description) : "" }</div>
                            <Link className="home__slide__btn btn btn-primary py-2 px-2 my-4 border-0" to={slide.link}>{content.slideShoopLinkText}</Link>
                        </div>
                        <img src={urlImage(slide.image)} alt={slide.title} className="home__slide__img my-1" height="450px" />
                    </div>
                ))}
            </Slider>
        </React.Fragment>
    )
}
export default Slide
