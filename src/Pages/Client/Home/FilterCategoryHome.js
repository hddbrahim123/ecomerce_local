import { isEmpty } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

import icon from '../../../assets/images/icon-img/5.png'
import icone from '../../../assets/images/icon-img/4.png'

const FilterCategoryHome = ({categories})=>{
    return (
        <React.Fragment>
            <div className="text-muted d-flex align-items-center justify-content-between ">
                Categories
                <img src={icone} alt="icon" className=" float-end" />
            </div>
            <ul className="d-none d-lg-block">
                {!isEmpty(categories) && categories.map((category , i)=>(
                    <li key={i} className="list-unstyled my-4">
                        <Link to="/products" className="text-muted my-4">
                            <img src={icon} alt={category.name} className="mx-1"  />
                            {" "}{category.name}
                            <img src={icone} alt={category.name} className="float-end" />
                        </Link>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default FilterCategoryHome
