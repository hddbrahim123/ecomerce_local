import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListCategories from "./ListCategories";

const baseSiteUrl = window.location.origin.toString() + "/#";

function Main2(props) {
  const {totalQty, solde, categories, setCategories, history} = props;
  let categoryId = 0;
  //const [categoryId, setCategoryId] = useState(0)
  let url = window.location.hash.split('/');
  if (url.length == 3) {
    //setCategoryId(url[2]);
    categoryId = url[2];
  }
  const goToProducts = (categoryId) => {
		window.location=(`${baseSiteUrl}/products/${categoryId}/`);
		window.location.reload();
	}
  return (
    <div id="mainBody">
      <div className="container">
        <div className="row">
          {/* Sidebar ================================================== */}
          <div id="sidebar" className="span3">
            <div className="well well-small">
              <a id="myCart" href={`${baseSiteUrl}/cart`}>
                <img src="images/ico-cart.png" alt="cart" />{totalQty} Articles en panier 
                <span className="badge badge-warning pull-right">{solde} Dh</span>
              </a>
            </div>
            {/* <ul id="sideManu" className="nav nav-tabs nav-stacked">
              <li className="subMenu"><a> ELECTRONICS [230]</a>
                <ul>
                <li><a href=""><i className="icon-chevron-right"></i>Cameras (100) </a></li>
                </ul>
              </li>
              <li className="subMenu"><a> CLOTHES [840] </a>
              <ul>
                <li><a href=""><i className="icon-chevron-right"></i>Women's Clothing (45)</a></li>
                <li><a href=""><i className="icon-chevron-right"></i>Women's Shoes (8)</a></li>												
              </ul>
              </li>
              <li className="subMenu"><a href="">HEALTH &amp; BEAUTY [18]</a></li>
            </ul> */}
            {/* List Categories  */}
            <ListCategories categoryId={categoryId} categories={categories} setCategories={setCategories} />
            {/* <br />
            <div className="thumbnail">
              <img
                src="images/products/panasonic.jpg"
                alt="Bootshop panasonoc New camera"
              />
              <div className="caption">
                <h5>Panasonic</h5>
                <h4 style={{textAlign:"center"}}>
                  <a className="btn" href="product_details.html">
                    {" "}
                    <i className="icon-zoom-in"></i>
                  </a>{" "}
                  <a className="btn" href="#">
                    Add to <i className="icon-shopping-cart"></i>
                  </a>{" "}
                  <a className="btn btn-primary" href="#">
                    $222.00
                  </a>
                </h4>
              </div>
            </div>
            <br />
            <div className="thumbnail">
              <img
                src="images/products/kindle.png"
                title="Bootshop New Kindel"
                alt="Bootshop Kindel"
              />
              <div className="caption">
                <h5>Kindle</h5>
                <h4 style={{textAlign:"center"}}>
                  <a className="btn" href="product_details.html">
                    {" "}
                    <i className="icon-zoom-in"></i>
                  </a>{" "}
                  <a className="btn" href="#">
                    Add to <i className="icon-shopping-cart"></i>
                  </a>{" "}
                  <a className="btn btn-primary" href="#">
                    $222.00
                  </a>
                </h4>
              </div>
            </div>
            <br />
            <div className="thumbnail">
              <img
                src="images/payment_methods.png"
                title="Bootshop Payment Methods"
                alt="Payments Methods"
              />
              <div className="caption">
                <h5>Payment Methods</h5>
              </div>
            </div> */}
          </div>
          {/* Sidebar end=============================================== */}
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Main2;
