import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";


import { GetOrderDetailsView } from "../../../Core/ApiCore/Order";

const OrderView = (props) => {
  const baseSiteUrl = "http://tsa5arli.xyz/#"; // "http://localhost:3000/#";
  const [order, setOrder] = useState({});
  const urlImage = (product) =>{
    return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
  }
  useEffect(() => {
    let orderNumber = props.match.params.orderNumber;
    GetOrderDetailsView(orderNumber).then((res) => {
      if (res) {
        setOrder(res);
      }else{
        setOrder({});
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card m-lg-2 shadow-sm">
            <div className="card-header d-flex justify-content-between py-2 text-capitalize fw-bold ">
              <span>Commande : {order.orderNumber}</span>
              {order.processAt && <span>Placé sur: {moment(order.processAt).calendar("YYYY/MM/DD")}</span>}
              {order.deliveredAt && <span>Livré le: {moment(order.deliveredAt).calendar("YYYY/MM/DD")}</span>}
            </div>
            <div className="card-body">
              <div className="row">
                {!isEmpty(order.items) &&
                  order.items.map((item, i) => (
                    <div key={i} className="col-6">
                      <div className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                        <div className="col-2">
                          <img
                            src={urlImage(item)}
                            alt="name"
                            className="productCart__img"
                            width="100%"
                          />
                        </div>
                        <div className="col-10">
                          <h5 className="mb-2 fs-5 text-truncate">
                            <a
                              href={`${baseSiteUrl}/product/${item.slug}`}
                              target="_blank"
                              className="first-color"
                            >
                              {item.name}
                            </a>
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
                <span className="text-muted">Nom complet</span>
                <span className="fw-bold">{order.fullName}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Téléphone</span>
                <span className="fw-bold">{order.phone}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Adresse</span>
                <span className="fw-bold">{order.address}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Note</span>
                <span className="fw-bold">{order.ordersNote}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card h-100 m-lg-2 shadow-sm">
            <div className="card-header fw-bold ">
              Montant Total
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Sous-total</span>
                <span className="fw-bold">{order.totalAmount} Dhs</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Livraison</span>
                <span className="fw-bold">-</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Total</span>
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
