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
const ModalPanier = (props) => {
  const { images, prix } = props;

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
      
    </Modal>
  );
};
export default withRouter(ModalPanier);
