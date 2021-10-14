import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import dictionary from "../../../Core/dictionary";

const CreateOrderStatusModal = ({
  isOpen,
  toggle,
  language,
  status,
  handleChangeStatus,
  orderStatus,
  updateOrderStatus
}) => {
  const content = dictionary.orderContent[language];
  const paymentStatus = dictionary.paymentStatus[language];
  const messages = dictionary.messages[language];
  
  useEffect(() => {
    // getOrdersStatus().then((res) => {
    //   setOrderStatus(res);
    // });
  }, []);
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
        <ModalHeader toggle={toggle}>{content.modalOrderHeadTitle}</ModalHeader>
        <ModalBody>
          <form>
            <div className="row">
              <div className="mb-4 px-2">
                <label htmlFor="status" className="form-label">
                  {content.modalOrderLabelStatus}
                </label>
                <div className="col-md-12">
                  <select
                    type="text"
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={handleChangeStatus}
                  >
                    <option value=""></option>
                    {!isEmpty(orderStatus) &&
                      orderStatus.map((statu, i) => (
                        <option value={statu.id} key={i}>
                          {statu.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button type="button" color="primary" onClick={updateOrderStatus}>
            {content.modalOrderButtonUpdateStatusText}
          </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            {content.modalOrderButtonCloseText}
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default withRouter(CreateOrderStatusModal);
