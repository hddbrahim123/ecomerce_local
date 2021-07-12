import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { isEmpty } from "lodash";
import { getOrders } from "../../../Core/ApiCore/Order";
import moment from "moment";
import dictionary from "../../../Core/dictionary";
import CreateOrderStatusModal from "./CreateOrderStatusModal";
import OrderFilter from './OrderFilter'

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import {
  UpdateOrderStatus,
} from "../../../Core/ApiCore/Order";

const Orders = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState();
  //const [filter, setFilter] = useState({status: ''});
  const [status, setStatus] = useState(1);

  const content = dictionary.orderContent[language];
  const paymentStatus = dictionary.paymentStatus[language];

  const statusOrder = () => {
    var data = [];
    Object.keys(paymentStatus).forEach((e, i) => {
      //console.log({id:i+1,name:paymentStatus[e]})
      data.push({ id: i + 1, name: paymentStatus[e] });
    });
    return data;
  }

  const [orderStatus, setOrderStatus] = useState(statusOrder());
  const [order, setOrder] = useState();
  
  const LoadOrders = (status) => {
    getOrders(status).then((res) => {
      if (res && res.length) {
        setOrders(res);
      } else {
        setOrders([]);
      }
    });
  }

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  const handleChangeFilter = (e) =>
  {
    setStatus(e.target.value);
    console.log(e.target.value, status)
    LoadOrders(e.target.value);
  }

  const handleChangeStatus = (e) =>
  {
    if (order) {
      setOrder({...order, status:e.target.value})
    }
  }

  const updateOrderStatus = (e) => {
    e.preventDefault();
    if (!order) {
      toastr.error("null order")
    }
    UpdateOrderStatus(order.orderNumber, order.status).then((res) => {
      if (res.success) {
        order.status = status;
        toastr.options.progressBar = true;
        toggle();
        LoadOrders(status);
        //toastr.success("Order Status Updated SuccessFully", "success");
        //window.location.reload();
        //props.history.push(`/seller/order/${orderNumber}`);
      } else {
        toastr.error(res.message, res.code);
      }
    });
  };
  const countFound = ()=>{
    let msg = content.ordersFound.replace('{count}', orders ? orders.length : 0)
    return (
      <div class="row"><label><span>{msg}</span></label></div>
    )
  }
  useEffect(() => {
    LoadOrders(status);
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>{content.titleOrdersSeller}</title>
      </MetaTags>
      <div className="container-fluid">
        <OrderFilter orderStatus={orderStatus} status={status} handleChangeFilter={handleChangeFilter} />
        {countFound()}
        <div className="row">
          <div className="table-rep-plugin ">
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
            >
              <CreateOrderStatusModal
                language={language}
                orderStatus={orderStatus}
                order={order}
                status={order?.status}
                handleChangeStatus={handleChangeStatus}
                isOpen={isOpen}
                toggle={toggle}
                updateOrderStatus={updateOrderStatus}
              />
              <Table className="table custom__table  table-nowrap align-middle table-borderless">
                <Thead>
                  <Tr>
                    <Th scope="col" data-priority="1">
                      {content.orderId}
                    </Th>
                    <Th scope="col" data-priority="2">
                      {content.headColOrderClient}
                    </Th>
                    <Th scope="col" data-priority="3">
                      {content.headColOrderTotal}
                    </Th>
                    <Th scope="col" data-priority="4">
                      {content.headColOrderStatus}
                    </Th>
                    <Th scope="col" data-priority="5">
                      {content.headColOrderDate}
                    </Th>
                    <Th scope="col" data-priority="6">
                      {content.headColOrderActions}
                    </Th>
                    <Th scope="col" data-priority="6"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!isEmpty(orders) &&
                    orders.map((order, i) => (
                      <Tr key={i}>
                        <Td>{order.orderNumber}</Td>
                        <Td>
                          <h5 className="my-3">{order.fullName}</h5>
                        </Td>
                        <Td>{order.totalAmount} Dh</Td>
                        <Td>
                          <span className="badge bg-primary px-2">
                            {paymentStatus[order.statusName]}
                          </span>
                        </Td>
                        <Td>{moment(order.Date).calendar()}</Td>
                        <Td>
                          <button
                            className="btn-sm btn-primary btn-rounded"
                            onClick={() => {
                              props.history.push(
                                `/seller/order/${order.orderNumber}`
                              );
                            }}
                          >
                            {content.buttonViewDetailsText}
                          </button>
                        </Td>
                        <Td>
                          <Link
                            onClick={() => {
                              setOrder(order);
                              setIsOpen(!isOpen);
                            }}
                            to="#"
                            className="text-success fw-bold"
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Orders;
