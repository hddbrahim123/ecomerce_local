import React from "react";
import { withRouter } from "react-router";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
const ModalPhotos = (props) => {
  const { images, isOpen, toggle, index, setIndex } = props;

  //seEffect(() => {}, []);
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    if (isOpen) {
      toggle();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      <div className="row">
        <div className="col-md-2 col-sm-2 col-2">
          {images &&
            images.length &&
            images.map((image, i) => (
              <div key={"pic_" + i} className="gallery__small__img m-1">
                <img src={image} onClick={() => setIndex(i)} alt="photo"></img>
              </div>
            ))}
        </div>
        <div className="col-md-10 col-sm-10 col-10">
          <div>
            {images && images.length && (
              <img
                src={images[index]}
                alt="product"
                className="img-large"
              ></img>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withRouter(ModalPhotos);
