import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { createOrder } from '../../../Core/ApiCore/Order'
import TotalPrice from '../../../Core/helpers/totalPrice'

const CreateOrderModal = (props)=>{
    const {isOpen, toggle} = props
    let products = useSelector(state => state.Cart.products)
    let totalQty = useSelector(state => state.Cart.count)

    const [order , setOrder] = useState({
        "firstName": "string",
        "lastName": "string",
        "phone": 0,
        "address": "string",
        "ordersNote": "string",
    })


    
    const handleOrder = (e) => setOrder({ ...order, [e.target.id]: e.target.value })

    const submitOrder = (e)=>{
        e.preventDefault()

        order.totalAmount = TotalPrice(products)
        order.products = products
        order.totalQty = totalQty
        console.log(order)

        createOrder(order)
          .then(res=>{
            console.log(res)
        })
    }
    useEffect(()=>{
    },[])
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
          <ModalHeader toggle={toggle}>Create Order</ModalHeader>
          <ModalBody>
            <form>
            <Row>
            <Col md="6">

              <FormGroup className="mb-4 px-2" row>
                <Label
                htmlFor="firstName"
                className="form-label"
                >
                  first Name
                </Label>
                <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your name"
                    onChange={handleOrder}
                />
                </FormGroup>
                </Col>
                <Col md="6">

                <FormGroup className="mb-4 px-2" row>

                <Label
                    htmlFor="lastName"
                    className="form-label"
                    >
                    last Name
                </Label>
                <Input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your name"
                    onChange={handleOrder}
                />
              </FormGroup>
              </Col>
              </Row>
              <FormGroup className="mb-4" row>
                <Label
                htmlFor="phone"
                
                className="form-label"
                >
                Phone
                </Label>
                <Col md={12}>
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your Phone no."
                    onChange={handleOrder}
                />
                </Col>
              </FormGroup>
              <FormGroup className="mb-4" row>
                <Label
                htmlFor="address"
                className="form-label"
                >
                Address
                </Label>
                <Col md="12">
                <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    placeholder="Enter full address"
                    onChange={handleOrder}
                />
                </Col>
              </FormGroup>
              <FormGroup className="mb-0" row>
                <Label
                htmlFor="ordersNote"
                
                className="form-label"
                >
                Order Notes:
                </Label>
                <Col md="12">
                <textarea
                    className="form-control"
                    id="ordersNote"
                    rows="3"
                    placeholder="Write some note.."
                    onChange={handleOrder}
                />
                </Col>
               </FormGroup>
            </form>
                  
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <Button type="button" color="primary" onClick={submitOrder}>
              Create Order
            </Button>
            <Button type="button" color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    )
}

export default CreateOrderModal
