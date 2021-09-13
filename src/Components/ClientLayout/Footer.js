import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

import footerContent from "../../Core/dictionary";
import SocialFollow from "../Comon/SocialFollow";

const Footer = (props) => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  var content = footerContent[props.language];
  return (
    <footer data-aos="fade-up" className="footer mb-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            {/* <h2 className="footer__title">Social media</h2> */}
            <SocialFollow></SocialFollow>
            {/* <ul className="footer__menu">
                <li class="footer__list">
                  <Link
                    className="footer__link"
                    id="stsocial_facebook"
                    to="https://www.facebook.com/myway.ma"
                    title="Facebook"
                  >
                    <i class="icon-facebook icon-large"></i>
                  </Link>
                </li>
                <li class="footer__list">
                  <Link
                    className="footer__link"
                    id="stsocial_twitter"
                    to="https://twitter.com/mywayma"
                    title="Twitter"
                  >
                    <i class="icon-twitter icon-large"></i>
                  </Link>
                </li>
                <li class="footer__list">
                  <Link
                    id="stsocial_youtube"
                    to="https://www.youtube.com/channel/UCNLoBXtwS-m7WmFRDrLkRKQ"
                    className="footer__link"
                    title="Youtube"
                  >
                    <i class="icon-youtube icon-large"></i>
                  </Link>
                </li>
                <li class="footer__list">
                  <Link
                    className="footer__link"
                    id="stsocial_instagram"
                    to="https://www.instagram.com/myway.ma/"
                    title="Instagram"
                  >
                    <i class="icon-instagram icon-large"></i>
                  </Link>
                </li>
              </ul> */}
          </div>
          {/* <div className="col-lg-3">
              <h2 className="footer__title">Explore</h2>
              <ul className="footer__menu">
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Home
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Shop
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    shooping cart
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h2 className="footer__title">CUSTOMER SUPPORT</h2>
              <ul className="footer__menu">
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    7/24 Hour Support
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Shipping Guide
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    International Shipping
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Career
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h2 className="footer__title">information</h2>
              <ul className="footer__menu">
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Terms of Use
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Privecy Policy
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Refund Policy
                  </Link>
                </li>
                <li className="footer__list">
                  <Link to="#" className="footer__link">
                    Billing System
                  </Link>
                </li>
              </ul>
            </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
