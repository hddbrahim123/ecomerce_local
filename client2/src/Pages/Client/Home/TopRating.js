import { isEmpty } from 'lodash'
import React from 'react'
import { Link , withRouter } from 'react-router-dom'
import ProductHome from './ProductHome'
// import dictionary from "../../../Core/dictionary"

const TopRating = ({language, products, dictionary, history})=>{
    const content = dictionary.homeContent[language]
    return (
        <React.Fragment>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="card shadow-sm mx-lg-5">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="text-capitalize">{content.titleTopRating}</h4>
                                        {!isEmpty(products) && products.map((product,i)=>(
                                            <ProductHome key={i} product={product} index={i} />
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
