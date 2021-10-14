import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const ModalConfirmation = ({isOpen,toggle,title,message,buttonTextProcess,buttonTextClose,handleProcess}) => {
    

    return (
        <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
          {message}
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <Button type="button" color="primary" onClick={handleProcess}>
                {buttonTextProcess}
            </Button>
            <Button type="button" color="secondary" onClick={toggle}>
                {buttonTextClose}
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    )
}

export default ModalConfirmation
