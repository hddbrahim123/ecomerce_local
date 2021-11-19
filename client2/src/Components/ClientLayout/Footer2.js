import React from "react";

function Footer2() {
  return (
    <div id="footerSection">
      <div className="container">
        <div className="row">
          <div className="span3">
            <h5>COMPTE</h5>
            <a href="/">VOTRE COMPTE</a>
            <a href="/">INFORMATIONS PERSONNELLES</a>
            <a href="/">ADRESSES</a>
            <a href="/">RÉDUCTION</a>
            <a href="/">HISTORIQUE DES COMMANDES</a>
          </div>
          <div className="span3">
            <h5>INFORMATION</h5>
            <a href="/">CONTACT</a>
            <a href="/">ENREGISTREMENT</a>
            <a href="/">MENTION LÉGALE</a>
            <a href="/">TERMES ET CONDITIONS</a>
            <a href="/">FAQ</a>
          </div>
          <div className="span3">
            <h5>NOS OFFRES</h5>
            <a>NOUVEAUX PRODUITS</a>
            <a>MEILLEURES VENTES</a>
            <a href="/">OFFRES SPÉCIALES</a>
            <a>FABRICANTES</a>
            <a>FOURNISSEUSES</a>
          </div>
          <div id="socialMedia" className="span3 pull-right">
            <h5>DES MÉDIAS SOCIAUX </h5>
            <a href="https://wa.me/message/X5SWMV5DDRHWC1">
              <img className="social-media-width"
                width="30%"
                height="30%"
                src="images/whatsapp.png"
                title="whatsapp"
                alt="facebook"
              />
            </a>
            <a href="https://www.facebook.com/Hmizatofshop/">
              <img className="social-media-width"
                width="60"
                height="60"
                src="images/facebook.png"
                title="facebook"
                alt="facebook"
              />
            </a>
            <a href="https://twitter.com/HmizatTanger">
              <img className="social-media-width"
                width="60"
                height="60"
                src="images/twitter.png"
                title="twitter"
                alt="twitter"
              />
            </a>
            <a href="https://www.youtube.com/channel/UCNPuf2vFWWqDajNkN_fHFDg">
              <img className="social-media-width"
                width="60"
                height="60"
                src="images/youtube.png"
                title="youtube"
                alt="youtube"
              />
            </a>
          </div>
        </div>
        <p className="pull-right">© Tous droits réservés</p>
      </div>
      {/* Container End */}
    </div>
  );
}

export default Footer2;
