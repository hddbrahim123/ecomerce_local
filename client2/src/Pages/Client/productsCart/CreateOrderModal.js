import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { createOrder } from "../../../Core/ApiCore/Order";
import TotalPrice from "../../../Core/helpers/totalPrice";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { withRouter } from "react-router";
import dictionary from "../../../Core/dictionary";

const CreateOrderModal = (props) => {
  const { isOpen, toggle, language } = props;
  let products = useSelector((state) => state.Cart.products);
  let totalQty = useSelector((state) => state.Cart.totalQty);

  const [order, setOrder] = useState({
    fullName: "",
    phone: "",
    address: "",
    ordersNote: "",
  });

  const handleOrder = (e) =>
    setOrder({ ...order, [e.target.id]: e.target.value });

  const submitOrder = (e) => {
    e.preventDefault();

    order.totalAmount = TotalPrice(products);
    order.items = products;
    order.totalQty = totalQty;
    console.log(order);
    if (!order.fullName) {
      toastr.error(messages.ordreFullNameRequired, messages.checkForm);
      return;
    } else if (!order.phone) {
      toastr.error(messages.ordrePhoneRequired, messages.checkForm);
      return;
    } else {
      createOrder(order).then((res) => {
        if (res.success) {
          toastr.options.progressBar = true;
          toastr.success(messages.ordreCreateSuccess, "");
          localStorage.removeItem("cart");
          props.history.push("/products");
        } else {
          toastr.options.progressBar = true;
          toastr.error(messages.ordreCreateError, messages.checkForm);
        }
        console.log(res);
      });
    }
  };
  const content = dictionary.orderContent[language];
  const messages = dictionary.messages[language];
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
        <ModalHeader toggle={toggle}>{content.titleCreateOrder}</ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <FormGroup className="mb-4 px-2" row>
                <Label htmlFor="fullName" className="form-label">
                  {content.labelFullName}
                </Label>
                <Col md={12}>
                  <Input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder={content.placeHolderEnterFullName}
                    value={order.fullName}
                    onChange={handleOrder}
                  />
                </Col>
              </FormGroup>
            </Row>
            <FormGroup className="mb-4" row>
              <Label htmlFor="phone" className="form-label">
                {content.labelPhone}
              </Label>
              <Col md={12}>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder={content.labelPlaceHolderPhone}
                  value={order.phone}
                  onChange={handleOrder}
                />
              </Col>
            </FormGroup>
            <FormGroup className="mb-4" row>
              <Label htmlFor="address" className="form-label">
                {content.labelAddress}
              </Label>
              <Col md="12">
                <textarea
                  className="form-control"
                  id="address"
                  rows="3"
                  placeholder={content.labelPlaceHolderAddress}
                  value={order.address}
                  onChange={handleOrder}
                />
              </Col>
            </FormGroup>
            <FormGroup className="mb-0" row>
              <Label htmlFor="ordersNote" className="form-label">
                {content.labelOrderNotes}
              </Label>
              <Col md="12">
                <textarea
                  className="form-control"
                  id="ordersNote"
                  rows="3"
                  placeholder={content.placeHolderOrderNote}
                  value={order.ordersNote}
                  onChange={handleOrder}
                />
              </Col>
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button type="button" color="primary" onClick={submitOrder}>
            {content.buttonCreateOrderText}
          </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            {content.buttonCloseText}
          </Button>
        </ModalFooter>
      </div>
    </Modal>
    
  );
};

export default withRouter(CreateOrderModal);
