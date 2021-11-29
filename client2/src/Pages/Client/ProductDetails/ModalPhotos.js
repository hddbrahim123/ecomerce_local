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
      // style={customStyles}
      // className="modal-images"
      contentLabel="Example Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
      <div className="m-row">
        <div className="m-col">
          <div className="slider">
            <div className="product">
              {images &&
                images.length &&
                images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    onClick={() => setIndex(i)}
                    alt="photo"
                  ></img>
                ))}
            </div>
            <div className="preview">
              {images && images.length && (
                <img src={images[index]} alt="product" className=""></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withRouter(ModalPhotos);
