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

  document.head.innerHTML = `<meta charset="utf-8">
	<title>ETNT Shopping</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="title" content="ETNT Shopping" />
	<meta name="description" content="ETNT Shopping" />
	<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
	<meta name="author" content="">
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
	<link rel="stylesheet" href="css/bootstrap.min.css" media="screen" />
	<link href="css/base.css" rel="stylesheet" media="screen" />
	<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
	<link href="css/font-awesome.css" rel="stylesheet" type="text/css">
	<link href="js/prettify.css" rel="stylesheet">
	<link rel="shortcut icon" href="images/ico/favicon.ico">
	<style type="text/css" id="enject"></style>`;

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
