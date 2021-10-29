import React from "react";

function Footer2() {
  return (
    <div id="footerSection">
      <div className="container">
        <div className="row">
          <div className="span3">
            <h5>ACCOUNT</h5>
            <a href="login.html">YOUR ACCOUNT</a>
            <a href="login.html">PERSONAL INFORMATION</a>
            <a href="login.html">ADDRESSES</a>
            <a href="login.html">DISCOUNT</a>
            <a href="login.html">ORDER HISTORY</a>
          </div>
          <div className="span3">
            <h5>INFORMATION</h5>
            <a href="contact.html">CONTACT</a>
            <a href="register.html">REGISTRATION</a>
            <a href="legal_notice.html">LEGAL NOTICE</a>
            <a href="tac.html">TERMS AND CONDITIONS</a>
            <a href="faq.html">FAQ</a>
          </div>
          <div className="span3">
            <h5>OUR OFFERS</h5>
            <a>NEW PRODUCTS</a>
            <a>TOP SELLERS</a>
            <a href="special_offer.html">SPECIAL OFFERS</a>
            <a>MANUFACTURERS</a>
            <a>SUPPLIERS</a>
          </div>
          <div id="socialMedia" className="span3 pull-right">
            <h5>DES MÉDIAS SOCIAUX </h5>
            <a href="https://wa.me/message/X5SWMV5DDRHWC1">
              <img
                width="60"
                height="60"
                src="images/whatsapp.png"
                title="whatsapp"
                alt="facebook"
              />
            </a>
            <a href="https://www.facebook.com/Hmizatofshop/">
              <img
                width="60"
                height="60"
                src="images/facebook.png"
                title="facebook"
                alt="facebook"
              />
            </a>
            <a href="https://twitter.com/HmizatTanger">
              <img
                width="60"
                height="60"
                src="images/twitter.png"
                title="twitter"
                alt="twitter"
              />
            </a>
            <a href="https://www.youtube.com/channel/UCNPuf2vFWWqDajNkN_fHFDg">
              <img
                width="60"
                height="60"
                src="images/youtube.png"
                title="youtube"
                alt="youtube"
              />
            </a>
          </div>
        </div>
        <p className="pull-right">© Bootshop</p>
      </div>
      {/* Container End */}
    </div>
  );
}

export default Footer2;
