import React, { useEffect, useState } from "react";
import Header2 from "../../../Components/ClientLayout/Header2";
import FeaturedProducts from "./FeaturedProducts";
import Main2 from "../../../Components/ClientLayout/Main2";
import Footer2 from "../../../Components/ClientLayout/Footer2";
import MyCarousel from "./MyCarousel";
import { useSelector } from "react-redux";
import { getCategories } from "../../../Core/ApiCore/Category";
import { getLatestProductsViewUser } from "../../../Core/ApiCore/ProductHome";
import LatestProducts from "./LatestProducts";
import ListCategories from "./ListCategories";
import { Link } from "react-router-dom";

const Index = () => {
  const [language] = useState(localStorage.getItem("language") ?? "Fr");

  // document.head.innerHTML = `<meta charset="utf-8">
  // <title>ETNT Shopping</title>
  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // <meta name="title" content="ETNT Shopping" />
  // <meta name="description" content="ETNT Shopping" />
  // <link rel="apple-touch-icon" href="logo192.png" />
  // <meta name="author" content="">
  // <link rel="manifest" href="manifest.json" />
  // <link rel="stylesheet" href="css/bootstrap.min.css" media="screen" />
  // <link href="css/base.css" rel="stylesheet" media="screen" />
  // <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
  // <link href="css/font-awesome.css" rel="stylesheet" type="text/css">
  // <link href="js/prettify.css" rel="stylesheet">
  // <link rel="shortcut icon" href="images/ico/favicon.ico">
  // <style type="text/css" id="enject"></style>`;

  const totalQty = useSelector(state => !!state.Cart.totalQty ? state.Cart.totalQty : 0);
  const solde = useSelector(state => state.Cart.solde);
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getCategories(true, true).then(res => {
      if (res && res.length) {
        setCategories(res);
      } else {
        setCategories([]);
      }
    });
    getLatestProductsViewUser(12).then((res) => {
      if (res && res.length) {
        setLatestProducts(res);
        setFeaturedProducts(res);
      }
    });

    // getProductsTopSale(12).then((res) => setProductsTopSale(res));
    // getProductsTopRating(12).then((res) => setProductsTopRating(res));
  }, [])

  const [filter, setFilter] = useState({
    search: '',
    categoryId: undefined
  })

  return (
    <div>
      <Header2 language={language} totalQty={totalQty} solde={solde} filter={filter} setFilter={setFilter} />
      {/* Sidebar ================================================== */}
      <div id="sidebar" className="span3">
        <div className="main">
          <div className="catt">
            <div className="well well-small">
              <Link id="myCart" to="/cart">
                <img src="images/ico-cart.png" alt="cart" />{totalQty} Articles en panier
                <span className="badge badge-warning pull-right">{solde} Dh</span>
              </Link>
            </div>
            <ListCategories categories={categories} />
          </div>
          <div>
            <MyCarousel language={language} />
          </div>
        </div>
      </div>
      {/* Sidebar end=============================================== */}

      <Main2 language={language} totalQty={totalQty} solde={solde}  >
        <div className="span9">
          {/* <DemoCarousel /> */}
          <FeaturedProducts products={featuredProducts} />
          <LatestProducts products={latestProducts} />
        </div>
      </Main2>
      <Footer2 language={language} />
    </div>
  );
};

export default Index;
