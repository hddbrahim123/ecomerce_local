import React from 'react'
import {Link} from 'react-router-dom'

import { map } from 'lodash'


const Paginate = (props)=>{

    const {pagination , onPageChange , className } = props
    const {pageNumber , totalPage} = pagination

    const handlePageClick = (newPage)=>{
        onPageChange(newPage)
    }
    
    return (
        <React.Fragment>
            <div  className="col-lg-12">
                <nav aria-label="Page navigation example">
                    <ul className={`pagination   mt-2 mb-5 pb-1 ${className}`}>
                        <li className={ pageNumber === 1 ? "page-item disabled" : "page-item" }>
                        <Link to="#" onClick={() => handlePageClick(pageNumber - 1)} className="page-link pagination-rounded shadow-sm " href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                        </li>

                        {map(Array(totalPage), (item, i) => (
                            <li key={i}  className="page-item">
                                <Link to="#"  onClick={() => handlePageClick(i + 1)} className={i + 1 === pageNumber ? "page-link pagination-rounded active shadow-sm" : "page-link pagination-rounded shadow-sm"} >{i + 1}</Link>
                            </li>                        
                        ))}
                    
                    <li className={ pageNumber >= totalPage ? "page-item disabled" : "page-item" }>
                            <Link to="#" onClick={() => handlePageClick(pageNumber + 1)} className="page-link pagination-rounded shadow-sm" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Paginate
