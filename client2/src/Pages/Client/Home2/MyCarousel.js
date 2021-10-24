import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { GetSlideData } from "../../../Core/ApiCore/ProductHome";

function MyCarousel() {
  const [slides, setSlides] = useState([])
  const urlImage = (image) =>{
    return `${API_URL}User/ImageSlide?image=${image}`;
  }
  useEffect(() => {
    GetSlideData().then(res =>{
      if (res && res.length) {
        setSlides(res);
      }else{
        setSlides([]);
      }
    })
  }, [])

  return (
    <div id="carouselBlk">
      <div id="myCarousel" className="carousel slide">
        <div className="carousel-inner">
          {slides.map((slide,i) =>(
            <div key={i} className={`item${i === 0 ? ' active':''}`}>
              <div className="container">
                <a href={slide.link}> <img style={{ minHeight: "100%" }} src={urlImage(slide.image)}/></a>
              </div>
            </div>
          ))}
          </div>
        <a
          className="left carousel-control"
          href="#myCarousel"
          data-slide="prev"
        >
          &lsaquo;
        </a>
        <a
          className="right carousel-control"
          href="#myCarousel"
          data-slide="next"
        >
          &rsaquo;
        </a>
      </div>
    </div>
  );
}

export default MyCarousel;
