import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'

import { Modal , ModalHeader , ModalBody , ModalFooter} from 'reactstrap'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { getOrdersStatus, UpdateOrderStatus } from '../../../Core/ApiCore/Order'

const CreateOrderStatusModal = (props)=>{
    const {isOpen, toggle ,orderNumber} = props

    const [orderStatus , setOrderStatus] = useState([]) 
    const [status , setStatus] = useState() 

    const handleStatus = e => {
      setStatus(e.target.value)
    }

    const submitOrderStatus = (e)=>{
        e.preventDefault()
        UpdateOrderStatus(orderNumber , status)
          .then(res=>{
            if(res.success){
              toastr.options.progressBar = true
              toastr.success("Order Status Updated SuccessFully","success")
              props.history.push(`/seller/order/${orderNumber}`)
            }else{
              toastr.error(res.message,res.code)
            }
          })     

    }

    useEffect(()=>{
      getOrdersStatus()
        .then(res=>{
          setOrderStatus(res)
          console.log(res)
        })
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
              <div className="row">
                <div  className="mb-4 px-2">
                <label
                    htmlFor="status"
                    className="form-label"
                    >
                    Status
                </label>
                <div className="col-md-12">
                <select
                    type="text"
                    className="form-select"
                    id="status"
                    onChange={handleStatus}
                >
                  {!isEmpty(orderStatus) && orderStatus.map((statu , i)=>(
                      <option value={statu.id} key={i}>{statu.name}</option>
                  ))}
                </select>
                </div>
              </div>
              </div>
            </form>
                  
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <button type="button" color="primary" onClick={submitOrderStatus}>
              Update Statu
            </button>
            <button type="button" color="secondary" onClick={toggle}>
              Close
            </button>
          </ModalFooter>
        </div>
      </Modal>
    )
}

export default withRouter(CreateOrderStatusModal)
