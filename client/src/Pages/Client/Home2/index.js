import React, { useState } from "react";
import Header2 from "../../../Components/ClientLayout/Header2";
import FeaturedProducts from "./FeaturedProducts";
import Main2 from "../../../Components/ClientLayout/Main2";
import Footer2 from "../../../Components/ClientLayout/Footer2";
import MyCarousel from "../../../Components/ClientLayout/MyCarousel";

const Index = () => {
  const [language] = useState(
    localStorage.getItem("language") ?? "Fr"
  );
  return (
    <div>
      <Header2 language={language} />
      <MyCarousel language={language} />
      <Main2 language={language} >
        <div className="span9">	
          {/* <DemoCarousel /> */}
          <FeaturedProducts />
        </div>
      </Main2>
      <Footer2 language={language} />
    </div>
  );
};

export default Index;
