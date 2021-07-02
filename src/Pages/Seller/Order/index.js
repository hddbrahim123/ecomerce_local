import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import MetaTags from 'react-meta-tags'

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { isEmpty } from "lodash";
import { getOrders } from "../../../Core/ApiCore/Order";
import moment from "moment";

import CreateOrderStatusModal from './CreateOrderStatusModal'

const Orders = props => {

  const [orders, setOrders] = useState([])
  const [isOpen, setIsOpen] = useState()

  const toggleModal = ()=> setIsOpen(!isOpen)

  useEffect(() => {
    getOrders()
      .then(res=>{
        setOrders(res)
        console.log(res)
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
                  <Th scope="col" data-priority="6"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isEmpty(orders) && orders.map((order,i)=>(
                <>
                  <CreateOrderStatusModal orderNumber={order.orderNumber} isOpen={isOpen} toggle={toggleModal} />
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
                    <Td>
                      <Link onClick={toggleModal} to="#" className="text-success fw-bold">
                        <i className='bx bx-edit'></i>
                      </Link>
                    </Td>                  
                  </Tr> 
                </>
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