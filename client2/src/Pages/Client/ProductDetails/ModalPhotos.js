import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
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
            fullscreen={true}
        >
        <div className="modal-content">
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
            <div className="row">
                <div className="col-md-2 col-sm-2 col-2">
                {images &&
                    images.length &&
                    images.map((image, i) => (
                    <div key={"pic_" + i} className="gallery__small__img m-1">
                        <img
                        width="60px"
                        src={image}
                        onClick={() => setIndex(i)}
                        alt="photo"
                        ></img>
                    </div>
                    ))}
                </div>
                <div className="col-md-10 col-sm-10 col-10">
                <div>
                    {images && images.length && (
                    <img
                        src={images[index]}
                        width="100%"
                        alt="product"
                        className="mb-1"
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

export default withRouter(ModalPhotos);
