import React, { useEffect } from "react";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Aos from "aos";
import "aos/dist/aos.css";
import { isEmpty } from "lodash";
// import ProductCard from "../productshoop/ProductCard";

// import dictionary from "../../../Core/dictionary"
import ProductHome from "./ProductHome";

const LatestProducts = (props) => {
  const { language, latestProducts, dictionary } = props
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 2000,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   cssEase: "linear",
  //   pauseOnHover: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  
  const content = dictionary.homeContent[language]

  return (
    <React.Fragment>
      <section>
      <div className="container-fluid my-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="card shadow-sm mx-lg-5">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="text-capitalize">{content.titleLatestProduct}</h4>
                                        {!isEmpty(latestProducts) && latestProducts.map((product,i)=>(
                                            <ProductHome key={i} product={product} index={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
      </section>
    </React.Fragment>
  );
};

export default LatestProducts;
