import React from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'

const ModalImages = ({ images, isOpen, toggle, index, setIndex }) => {

    const photos = images && images.map((m,j) => ({ source: m })) || []
    return (
        <ModalGateway>
            {isOpen ? (
            <Modal onClose={toggle}>
                <Carousel views={photos} currentIndex={index} />
            </Modal>
            ) : null}
        </ModalGateway>
        )
}

export default ModalImages
