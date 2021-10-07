import React from "react";

function Header2() {
  return (
    <div id="header">
      <div className="container">
        <div id="welcomeLine" className="row">
          <div className="span6">
            Welcome!<strong> User</strong>
          </div>
          <div className="span6">
            <div className="pull-right">
              <a href="product_summary.html">
                <span className="">Fr</span>
              </a>
              <a href="product_summary.html">
                <span className="">Es</span>
              </a>
              <span className="btn btn-mini">En</span>
              <a href="product_summary.html">
                <span>£</span>
              </a>
              <span className="btn btn-mini">$155.00</span>
              <a href="product_summary.html">
                <span className="">$</span>
              </a>
              <a href="product_summary.html">
                <span className="btn btn-mini btn-primary">
                  <i className="icon-shopping-cart icon-white"></i> [ 3 ] Itemes in
                  your cart{" "}
                </span>{" "}
              </a>
            </div>
          </div>
        </div>
        {/* Navbar ================================================== */}
        <div id="logoArea" className="navbar">
          <a
            id="smallScreen"
            data-target="#topMenu"
            data-toggle="collapse"
            className="btn btn-navbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </a>
          <div className="navbar-inner">
            <a className="brand" href="index.html">
              <img src="themes/images/logo.png" alt="Bootsshop" />
            </a>
            <form
              className="form-inline navbar-search"
              method="post"
              action="products.html"
            >
              <input id="srchFld" className="srchTxt" type="text" />
              <select className="srchTxt">
                <option>All</option>
                <option>CLOTHES </option>
                <option>FOOD AND BEVERAGES </option>
                <option>HEALTH &amp; BEAUTY </option>
                <option>SPORTS &amp; LEISURE </option>
                <option>BOOKS &amp; ENTERTAINMENTS </option>
              </select>
              <button type="submit" id="submitButton" className="btn btn-primary">
                Go
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Header End====================================================================== */}
    </div>
  );
}

export default Header2;
