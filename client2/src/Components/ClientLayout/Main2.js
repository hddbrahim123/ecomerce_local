import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

function Main2(props) {
  const {totalQty, solde, categories} = props;
  const [categoryId, setCategoryId] = useState();
  let url = window.location.hash.split('/');
  if (url.length == 3) {
    //setFilter({...filter, categoryId: url[2], search: url[3]?.replaceAll('_',' ')?.replaceAll('%20',' ')})
    setCategoryId(url[2]);
  }
  const goToProducts = (categoryId) => {
		window.location=(`/#/products/${categoryId}/`);
		window.location.reload();
	}
  return (
    <div id="mainBody">
      <div className="container">
        <div className="row">
          {/* Sidebar ================================================== */}
          <div id="sidebar" className="span3">
            <div className="well well-small">
              <Link id="myCart" to="/cart">
                <img src="images/ico-cart.png" alt="cart" />{totalQty} Articles en panier 
                <span className="badge badge-warning pull-right">{solde} Dh</span>
              </Link>
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
            <ul id="sideManu" className="nav nav-tabs nav-stacked">
              {categories.map((category,i)=>(
                // {!!category.icon?ReactHtmlParser(category.icon.replace('class=','className=')):''}
                <li key={i} className="subMenu">{category.children ? (<a style={categoryId === category.id ? {}:{}}> {category.name}</a>):(<a style={categoryId === category.id ? {}:{}} href={`/products/${category.id}`}> {category.name}</a>)}
                  {category.children && (
                    <ul>
                      {category.children.map((subCategory,j)=>(
                        <li key={j}><Link style={categoryId === subCategory.id ? {}:{}} onClick={()=>goToProducts(subCategory.id)}> <i className="icon-chevron-right"></i> {subCategory.name}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
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
