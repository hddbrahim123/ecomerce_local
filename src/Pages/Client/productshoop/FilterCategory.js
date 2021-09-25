import { isEmpty } from 'lodash'
import React, { useState } from 'react'

const FilterCategory = ({categories, checkedCategories, handleFilters})=>{
    const [checked] = useState(new Set(checkedCategories))

    const handleCategory = (category)=>{
        if(checked.has(category.id)){
            checked.delete(category.id)
        }else{
            checked.add(category.id)
        }
        handleFilters(Array.from(checked))
    }

    return (
        <React.Fragment>
            <h6 className="text-muted mb-3">Categories</h6>
            <ul>
                {!isEmpty(categories) && categories.map((category , i)=>(
                    <li key={i} className="list-unstyled my-2">
                        <input
                            type="checkbox" 
                            checked={checked.has(category.id)}
                            id={category.id} 
                            className="form-check-input mx-2" 
                            onChange={()=>handleCategory(category)}
                        />
                        <label htmlFor={category.id}>{category.name}</label>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default FilterCategory
