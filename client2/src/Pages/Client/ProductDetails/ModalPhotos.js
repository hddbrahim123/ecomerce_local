import React, { useEffect } from "react";
import { withRouter } from "react-router";

const ModalPhotos = (props) => {
  const { images, isOpen, toggle, index, setIndex } = props;

  // const [index, setIndex] = useState(init_index());

  useEffect(() => {}, []);

  return(
  <div id="jquery-lightbox" style={{ top: "93.7px", left: "0px" }}>
    <div
      id="lightbox-container-image-box"
      style={{ width: "520px", height: "395px" }}
    >
      <div id="lightbox-container-image">
        <img id="lightbox-image" src="" style={{ display: "inline" }} />
        <div style={{ display: "block" }} id="lightbox-nav">
          <a
            href="#"
            id="lightbox-nav-btnPrev"
            style={{
              display: "none",
              height: "395px",
              background:
                "url(&quot;themes/images/lightbox/lightbox-blank.gif&quot;) no-repeat transparent",
            }}
          ></a>
          <a
            href="#"
            id="lightbox-nav-btnNext"
            style={{
              display: "block",
              height: "395px",
              background:
                "url(&quot;themes/images/lightbox/lightbox-blank.gif&quot;) no-repeat transparent",
            }}
          ></a>
        </div>
        <div id="lightbox-loading" style={{ display: "none" }}>
          <a href="#" id="lightbox-loading-link">
            <img src="" />
          </a>
        </div>
      </div>
    </div>
    <div
      id="lightbox-container-image-data-box"
      style={{ display: "block", width: "500px" }}
    >
      <div id="lightbox-container-image-data">
        <div id="lightbox-image-details">
          <span
            id="lightbox-image-details-caption"
            style={{ display: "inline" }}
          >
            Fujifilm FinePix S2950 Digital Camera
          </span>
          <span
            id="lightbox-image-details-currentNumber"
            style={{ display: "block" }}
          >
            Image 1 of 7
          </span>
        </div>
        <div id="lightbox-secNav">
          <a href="#" id="lightbox-secNav-btnClose" onClick="document.getElementById('modal-images').remove()">
            <img src="" />
          </a>
        </div>
      </div>
    </div>
  </div>)
};

export default withRouter(ModalPhotos);
