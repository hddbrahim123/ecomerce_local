import { isEmpty } from 'lodash'
import React from 'react'

const FilterCategory = ({categories})=>{
    return (
        <React.Fragment>
            <h6 className="text-muted mb-3">Categories</h6>
            <ul>
                {!isEmpty(categories) && categories.map((category , i)=>(
                    <li key={i} className="list-unstyled my-2">
                        <input type="checkbox" id={category.id} className="form-check-input mx-2" />
                        <label htmlFor={category.id}>{category.name}</label>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default FilterCategory
