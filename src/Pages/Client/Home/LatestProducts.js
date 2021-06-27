import React, { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Aos from "aos";
import "aos/dist/aos.css";
import { isEmpty } from "lodash";
import ProductCard from "../productshoop/ProductCard";

import dictionary from "../../../Core/dictionary"

const LatestProducts = ({ language, latestProducts }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  
  const content = dictionary.headerContent[language]

  return (
    <React.Fragment>
      <section>
        <div className="featured my-5">
          <div className="container-fluid px-lg-5">
            <h2 className="featured__title text-capitalize fs-4 fw-bold mx-2 mb-2">
            {content.titleLatestProduct}
            </h2>
          </div>
          <div className="container-fluid px-lg-5">
            <div className="row">
              <Slider {...settings}>
                {!isEmpty(latestProducts) &&
                  latestProducts.map((product, i) => (
                    <div key={product.slug} className="col-lg-3">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LatestProducts;
