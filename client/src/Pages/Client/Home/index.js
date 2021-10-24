import React, { useEffect, useState } from "react";
import { getActiveCategories } from "../../../Core/ApiCore/Category";
import {
  getLatestProductsViewUser,
  getProductsOffer,
  getProductsTopRating,
  getProductsTopSale,
} from "../../../Core/ApiCore/ProductHome";
import TopRating from "./TopRating";
import LatestProducts from "./LatestProducts";
import TopSale from "./TopSale";
import Home from "./Home";
import Offre from "./Offre";
import dictionary from "../../../Core/dictionary"

const Index = () => {
  const [language] = useState(
    localStorage.getItem("language") ?? "Fr"
  );
  const [latestProducts, setLatestProducts] = useState([]);
  const [productsTopRating, setProductsTopRating] = useState([]);
  const [productsTopSale, setProductsTopSale] = useState([]);
  const [productsOffre, setProductsOffre] = useState([]);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProductsOffer(6).then((res) => {
      setProductsOffre(res);
    });

    getLatestProductsViewUser(6).then((res) => setLatestProducts(res));

    getProductsTopSale(12).then((res) => setProductsTopSale(res));

    getProductsTopRating(12).then((res) => setProductsTopRating(res));

    // getActiveCategories().then((res) => setCategories(res));
  }, []);
  return (
    <React.Fragment>
      <Home language={language} dictionary={dictionary} />
      <LatestProducts language={language} latestProducts={latestProducts} dictionary={dictionary} />
      <TopSale language={language} productsTopSale={productsTopSale} dictionary={dictionary} />
      {/* <Collection language={language} categories={categories} dictionary={dictionary} /> */}
      <TopRating language={language} products={productsTopRating} dictionary={dictionary} />
      <Offre language={language} products={productsOffre} dictionary={dictionary} />
    </React.Fragment>
    
  );
};

export default Index;
