import React, { useEffect, useState } from "react"

import MetaTags from 'react-meta-tags'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { isEmpty } from "lodash";
import { getOrders } from "../../../Core/ApiCore/Order";
import moment from "moment";


const Orders = props => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
      .then(res=>{
        setOrders(res)
      })
    
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>List Orders |  Sellers</title>
      </MetaTags>

      <div className="container-fluid">
        <div className="row">
         <div className="table-rep-plugin ">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              className="table custom__table  table-nowrap align-middle table-borderless"
            >
              <Thead>
                <Tr>
                  <Th scope="col" data-priority="1">orderId</Th>
                  <Th scope="col" data-priority="2">billingName</Th>
                  <Th scope="col" data-priority="3">total</Th>
                  <Th scope="col" data-priority="4">paymentStatus</Th>
                  <Th scope="col" data-priority="5">Date</Th>
                  <Th scope="col" data-priority="6">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(orders) && orders.map((order,i)=>(
                <Tr key={i}>
                  <Td>{order.orderNumber}</Td>
                  <Td>
                    <h5 className="my-3">{order.fullName}</h5> 
                  </Td>
                  <Td>{order.totalAmount}Dh</Td>
                  <Td>
                    <span className="badge bg-primary px-2">{order.status}</span>
                  </Td>
                  <Td>{moment(order.Date).calendar()}</Td>
                  <Td>
                    <button
                      className="btn-sm btn-primary btn-rounded"
                      onClick={()=>{props.history.push(`/seller/order/${order.orderNumber}`)}}
                    >
                      View Details
                    </button>
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
  )
}
export default Orders