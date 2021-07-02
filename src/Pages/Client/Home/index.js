import React, { useEffect, useState } from "react";
import { getActiveCategories } from "../../../Core/ApiCore/Category";
import {
  getProductsLatestProductsViewUser,
  getProductsOffer,
  getProductsTopRating,
  getProductsTopSale,
} from "../../../Core/ApiCore/ProductHome";
import TopRating from "./TopRating";
import Collection from "./Collection";
import LatestProducts from "./LatestProducts";
import TopSale from "./TopSale";
import Home from "./Home";
import Offre from "./Offre";

const Index = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "Fr"
  );
  const [latestProducts, setLatestProducts] = useState([]);
  const [productsTopRating, setProductsTopRating] = useState([]);
  const [productsTopSale, setProductsTopSale] = useState([]);
  const [productsOffre, setProductsOffre] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProductsOffer(6).then((res) => {
      setProductsOffre(res);
    });

    getProductsLatestProductsViewUser(4).then((res) => setLatestProducts(res));

    getProductsTopSale(12).then((res) => setProductsTopSale(res));

    getProductsTopRating(12).then((res) => setProductsTopRating(res));

    getActiveCategories().then((res) => setCategories(res));
  }, []);
  return (
    <React.Fragment>
      <Home language={language} />
      <LatestProducts language={language} latestProducts={latestProducts} />
      <TopSale language={language} productsTopSale={productsTopSale} />
      <Collection language={language} categories={categories} />
      <TopRating language={language} products={productsTopRating} />
      <Offre language={language} products={productsOffre} />
    </React.Fragment>
  );
};

export default Index;
