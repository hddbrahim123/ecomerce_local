import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { GetOrderDetailsView } from "../../../Core/ApiCore/Order";

const OrderView = (props) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    let orderNumber = props.match.params.orderNumber;
    console.log(orderNumber);

    GetOrderDetailsView(orderNumber).then((res) => {
      console.log(res);
      setOrder(res);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card m-lg-2 shadow-sm">
            <div className="card-header d-flex justify-content-between py-2 text-capitalize fw-bold ">
              <span>Order Id : {order.orderNumber}</span>
              {order.processAt && <span>Placed on: {order.processAt}</span>}
              {order.deliveredAt && <span>Delivered on: {order.deliveredAt}</span>}
            </div>
            <div className="card-body">
              <div className="row">
                {!isEmpty(order.items) &&
                  order.items.map((item, i) => (
                    <div key={i} className="col-lg-6">
                      <div className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                        <div className="col-lg-2">
                          <img
                            src={item.image}
                            alt="name"
                            className="productCart__img"
                            width="100%"
                          />
                        </div>
                        <div className="col-lg-10">
                          <h5 className="mb-2 text-capitalize  fs-5 text-truncate">
                            <Link
                              to={"/product/" + item.slug}
                              className="first-color"
                            >
                              {item.name}
                            </Link>
                          </h5>
                          <div className="d-flex justify-content-between align-items-end ">
                            <h5 className="text-muted fs-6">
                              {item.newPrice}Dh X {item.qty} ={" "}
                              <span className="first-color">
                                {item.newPrice * item.qty}Dh
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card h-100 m-lg-2 my-4 shadow-sm">
            <div className="card-header text-capitalize fw-bold ">
              information de shipping
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">name</span>
                <span className="fw-bold">{order.fullName}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">phone</span>
                <span className="fw-bold">{order.phone}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Address</span>
                <span className="fw-bold">{order.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100 m-lg-2 shadow-sm">
            <div className="card-header text-capitalize fw-bold ">
              Total summury
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">SubTotal</span>
                <span className="fw-bold">{order.totalAmount}Dh</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">shipping</span>
                <span className="fw-bold">-</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Total</span>
                <span className="fw-bold">{order.totalAmount}Dh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderView;
