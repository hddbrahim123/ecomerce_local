import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { withRouter } from "react-router";

const ModalPhotos = (props) => {
  const { images, isOpen, toggle, index, setIndex } = props;
  // const [index, setIndex] = useState(init_index());

  useEffect(() => {}, []);

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal modal-lg"
      tabIndex="-1"
      toggle={toggle}
      fullscreen={'true'}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
            modal photos
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between"></ModalFooter>
      </div>
    </Modal>
  );
};

export default withRouter(ModalPhotos);
