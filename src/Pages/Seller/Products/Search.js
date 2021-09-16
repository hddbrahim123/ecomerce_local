import { filter } from 'lodash'
import React, {useState} from 'react'

function Search({categories,filters,handleChange,searchProducts}) {
    
    return (
        <div>
            <form action="">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select 
                            id="categoryId"
                            value={filters.categoryId} 
                            onChange={handleChange} className="btn">
                            <option value="">Selectionner categorie</option>
                            {categories && categories.map((cat,i)=>(
                                <option key={i} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <input id="search" value={filters.search} onChange={handleChange} type="search" className="form-control mx-auto"/>
                    <div className="input-group-apprend">
                        <button onClick={searchProducts} className="btn">Rechercher</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
