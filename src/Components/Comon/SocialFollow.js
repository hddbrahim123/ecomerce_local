import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <div className="text-center">
        <a
        // href="https://wa.me/c/212675256977"
        href="https://wa.me/message/X5SWMV5DDRHWC1"
        target="_blank"
        className="whatsapp social"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
      <a
        href="https://www.facebook.com/Hmizatofshop/"
        target="_blank"
        className="facebook social"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a
        href="https://www.instagram.com/hmizadetanger/"
        target="_blank"
        className="instagram social"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCNPuf2vFWWqDajNkN_fHFDg"
        target="_blank"
        className="youtube social"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a 
        href="https://twitter.com/HmizatTanger" 
        target="_blank"
        className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
    </div>
  );
}
