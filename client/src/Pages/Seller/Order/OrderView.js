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
        <div className="col-12">
          <div className="card m-lg-2 shadow-sm">
            <div className="card-header d-flex justify-content-between py-2 text-capitalize fw-bold ">
              <span>Commande : {order.orderNumber}</span>
              {order.processAt && <span>Placé sur: {order.processAt}</span>}
              {order.deliveredAt && <span>Livré le: {order.deliveredAt}</span>}
            </div>
            <div className="card-body">
              <div className="row">
                {!isEmpty(order.items) &&
                  order.items.map((item, i) => (
                    <div key={i} className="col-6">
                      <div className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                        <div className="col-2">
                          <img
                            src={item.image}
                            alt="name"
                            className="productCart__img"
                            width="100%"
                          />
                        </div>
                        <div className="col-10">
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
                              {item.newPrice} Dhs X {item.qty} ={" "}
                              <span className="first-color">
                                {item.newPrice * item.qty} Dhs
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
        <div className="col-6">
          <div className="card h-100 m-lg-2 my-4 shadow-sm">
            <div className="card-header text-capitalize fw-bold ">
            Informations de livraison
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Nom complet</span>
                <span className="fw-bold">{order.fullName}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Téléphone</span>
                <span className="fw-bold">{order.phone}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Adresse</span>
                <span className="fw-bold">{order.address}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Note</span>
                <span className="fw-bold">{order.orderNote}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card h-100 m-lg-2 shadow-sm">
            <div className="card-header text-capitalize fw-bold ">
              Montant Total
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Sous-total</span>
                <span className="fw-bold">{order.totalAmount} Dhs</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Livraison</span>
                <span className="fw-bold">-</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted text-capitalize">Total</span>
                <span className="fw-bold">{order.totalAmount} Dhs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderView;
