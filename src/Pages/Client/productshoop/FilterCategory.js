import { isEmpty } from 'lodash'
import React, { useState } from 'react'

const FilterCategory = ({categories, checkedCategories, handleFilters})=>{
    const [checked, setChecked] = useState(new Set());
    checkedCategories.forEach(e => checked.add(e));

    const handleCategory = (category) => {
        if (checked.has(category.id)) {
            checked.delete(category.id);
        } else {
            checked.add(category.id);
        }
        //setChecked(checked);
        handleFilters(Array.from(checked));
    }

    return (
        <React.Fragment>
            <h6 className="text-muted mb-3">Categories</h6>
            {JSON.stringify(checkedCategories)}
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
