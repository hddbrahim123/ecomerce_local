import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalPhotos = (props) => {
  const { images, isOpen, toggle, init_index } = props
  const [index, setIndex] = useState(init_index());
  const handleClick = (i) => {
    setIndex(i);
  };
  useEffect(() => {
    setIndex(init_index());
  }, [])
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal modal-lg"
      tabIndex="-1"
      toggle={toggle}
      fullscreen={true}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <p>{index}</p>
          <div className="row">
            <div className="col-md-2 col-sm-2 col-lg-2">
              {images &&
                images.length &&
                images.map((image, i) => (
                  <div key={"pic_"+i} className="gallery__small__img m-1">
                    <img
                      width="50px"
                      src={image}
                      onClick={()=>handleClick(i)}
                      alt="photo"
                    ></img>
                  </div>
                ))}
            </div>
            <div className="col-md-10 col-sm-10 col-lg-10">
              <div>
                {images && images.length && (
                  <img
                    src={images[index]}
                    width="200px"
                    alt="product"
                    className="gallery__main__img mb-2"
                  ></img>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between"></ModalFooter>
      </div>
    </Modal>
  );
};

export default ModalPhotos;
