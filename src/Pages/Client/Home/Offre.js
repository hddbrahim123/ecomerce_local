import { isEmpty } from 'lodash'
import React from 'react'
import {Link,withRouter} from "react-router-dom"
import ProductHome from './ProductHome'
// import dictionary from "../../../Core/dictionary"

const Offre = (props)=>{
    const {language,products,dictionary,history} = props
    const content = dictionary.homeContent[language]
    return (
        <React.Fragment>
            <section>
                <div className="container-fluid my-3">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="card shadow-sm mx-lg-5">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="">{content.titleOffer}</h4>
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

export default withRouter(Offre)
