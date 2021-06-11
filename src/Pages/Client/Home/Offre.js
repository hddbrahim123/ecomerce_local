import { isEmpty } from 'lodash'
import React, { useState } from 'react'

const Arrivals = ({products})=>{
    return (
        <React.Fragment>
            <section>
                <div className="container-fluid my-3">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="card shadow-sm mx-lg-5">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="">Le meilleur de nos boutiques officielles | Jusqu'à -25%</h4>
                                        {!isEmpty(products) && products.map((product,i)=>(
                                            <div className="col-lg-2">
                                                <div className="text-center m-2">
                                                    <img src={product.image} alt="name" width="100%" className="" />
                                                    <span className="first-color fw-bolder">{product.name}</span>
                                                    <h6 className="text-muted">{product.newPrice}Dh</h6>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Arrivals
