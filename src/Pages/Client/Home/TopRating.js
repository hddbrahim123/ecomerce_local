import { isEmpty } from 'lodash'
import React from 'react'
import { Link , withRouter } from 'react-router-dom'
import dictionary from "../../../Core/dictionary"

const TopRating = ({language,products})=>{
    const content = dictionary.homeContent[language]
    return (
        <React.Fragment>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="card shadow-sm mx-lg-5">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="text-capitalize">{content.titleTopRating}</h4>
                                        {!isEmpty(products) && products.map((product,i)=>(
                                            <div key={i} className="col-lg-2">
                                                <div className="text-center m-2">
                                                    <img src={product.image} alt="name" width="100%" className="" />
                                                    <h5 className="mb-3 text-truncate">
                                                        <Link
                                                        to={"/product/" + product.slug}
                                                        className="first-color text-capitalize"
                                                        >
                                                        {product.name}{" "}
                                                        </Link>
                                                    </h5>
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

export default withRouter(TopRating)
