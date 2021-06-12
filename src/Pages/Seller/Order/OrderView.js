import React from 'react'
import { Link } from 'react-router-dom'

import img from '../../../assets/images/laptop2.jpg'

const OrderView = ()=>{



    return (
        <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card m-lg-2 shadow-sm">
                            <div className="card-header d-flex justify-content-between py-2 text-capitalize fw-bold ">
                                <span>Order Id : 475697808089</span>
                                <span>Placed on: 11 Jun, 2021</span>
                                <span>Delivered on: 11 Jun, 2021</span>
                            </div>
                            <div className="card-body">
                                <div  className="row">
                                    <div  className="col-lg-6">
                                        <div  className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                                            <div className="col-lg-2">
                                                <img src={img} alt="name" className="productCart__img" width="100%" />       
                                            </div>
                                            <div className="col-lg-10">
                                                <h5 className="mb-2 text-capitalize  fs-5 text-truncate">
                                                    <Link to={"/product/"} className="first-color">
                                                       Hp Laptop 8Ram
                                                    </Link>
                                                </h5>
                                                <div className="d-flex justify-content-between align-items-end " >
                                                    <h5 className="text-muted fs-6">
                                                        $200 X 1 = <span className="first-color">$400</span>
                                                    </h5>
                                                </div>
                                            </div>                                         
                                        </div>                                          
                                    </div>
                                    <div  className="col-lg-6">
                                        <div  className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                                            <div className="col-lg-2">
                                                <img src={img} alt="name" className="productCart__img" width="100%" />       
                                            </div>
                                            <div className="col-lg-10">
                                                <h5 className="mb-2 text-capitalize  fs-5 text-truncate">
                                                    <Link to={"/product/"} className="first-color">
                                                       Hp Laptop 8Ram
                                                    </Link>
                                                </h5>
                                                <div className="d-flex justify-content-between align-items-end " >
                                                    <h5 className="text-muted fs-6">
                                                        $200 X 1 = <span className="first-color">$400</span>
                                                    </h5>
                                                </div>
                                            </div>                                         
                                        </div>                                          
                                    </div>
                                    <div  className="col-lg-6">
                                        <div  className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                                            <div className="col-lg-2">
                                                <img src={img} alt="name" className="productCart__img" width="100%" />       
                                            </div>
                                            <div className="col-lg-10">
                                                <h5 className="mb-2 text-capitalize  fs-5 text-truncate">
                                                    <Link to={"/product/"} className="first-color">
                                                       Hp Laptop 8Ram
                                                    </Link>
                                                </h5>
                                                <div className="d-flex justify-content-between align-items-end " >
                                                    <h5 className="text-muted fs-6">
                                                        $200 X 1 = <span className="first-color">$400</span>
                                                    </h5>
                                                </div>
                                            </div>                                         
                                        </div>                                          
                                    </div>
                                    <div  className="col-lg-6">
                                        <div  className="row productCart  mb-4 bg-white shadow-sm m-1 p-2">
                                            <div className="col-lg-2">
                                                <img src={img} alt="name" className="productCart__img" width="100%" />       
                                            </div>
                                            <div className="col-lg-10">
                                                <h5 className="mb-2 text-capitalize  fs-5 text-truncate">
                                                    <Link to={"/product/"} className="first-color">
                                                       Hp Laptop 8Ram
                                                    </Link>
                                                </h5>
                                                <div className="d-flex justify-content-between align-items-end " >
                                                    <h5 className="text-muted fs-6">
                                                        $200 X 1 = <span className="first-color">$400</span>
                                                    </h5>
                                                </div>
                                            </div>                                         
                                        </div>                                          
                                    </div>
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
                                    <span  className="text-muted text-capitalize">name</span>                                                                       
                                    <span className="fw-bold">ibrahim haddad</span> 
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span  className="text-muted text-capitalize">phone</span>                                                                       
                                    <span className="fw-bold">(+212)621826414</span> 
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span  className="text-muted text-capitalize">Address</span>                                                                       
                                    <span className="fw-bold">Hay Aoulad Fadoul Rue D No 12</span> 
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
                                    <span  className="text-muted text-capitalize">SubTotal</span>                                                                       
                                    <span className="fw-bold">$2000</span> 
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span  className="text-muted text-capitalize">shipping</span>                                                                       
                                    <span className="fw-bold">-</span> 
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <span  className="text-muted text-capitalize">Total</span>                                                                       
                                    <span className="fw-bold">$2000</span> 
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default OrderView
