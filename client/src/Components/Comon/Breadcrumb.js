import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = (props)=>{
    return (
        <React.Fragment>
            <div className="row">
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={props.link}>{props.item}</Link></li>
                    <li className="breadcrumb-item " >{props.title}</li>
                    </ol>
                </nav>
            </div>            
        </React.Fragment>
    )
}

export default Breadcrumb
