import React, { useEffect, useState } from "react";

import Aos from "aos";
import "aos/dist/aos.css";
import { getCategories } from "../../../Core/ApiCore/Category";
// import FilterCategoryHome from "./FilterCategoryHome";
import Slide from "./Slide";
import { getProductsSlide } from "../../../Core/ApiCore/ProductHome";
import MenuCategories from "./MenuCategories";

const Home = ({language}) => {
  const [categories, setCategories] = useState([]);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });

    getProductsSlide().then((res) => {
      setSlides(res);
      console.log(res);
    });
    getCategories(true, true).then((res) => {
      if (res) { 
        setCategories(res)
      }
    });
    // getActiveCategories().then((res) => setCategories(res));
  }, []);
  return (
    <React.Fragment>
      <section className="bg-white">
        <div className="container-fluid px-lg-4 p-lg-2">
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              {/* <div className="card my-4 shadow-sm">
                <div className="card-body">
                  <FilterCategoryHome language={language} categories={categories} />
                </div>
              </div> */}
              <MenuCategories categories={categories} />
            </div>
            <div data-aos="fade-left" className="col-9">
              <div className="card my-4 shadow-sm">
                <div className="card-body m-0 p-0">
                  <Slide language={language} slides={slides} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
