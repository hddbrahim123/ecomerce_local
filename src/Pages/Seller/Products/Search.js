import { filter } from 'lodash'
import React, {useState} from 'react'

function Search({categories,filters,handleChange,searchProducts}) {
    
    return (
        <div>
            
            <form action="">
                <div class="input-group input-group-lg">
                    <div class="input-group-prepend">
                        <select 
                            id="categoryId"
                            value={filters.categoryId} 
                            onChange={handleChange} class="btn">
                            <option value="">Selectionner categorie</option>
                            {categories && categories.map((cat,i)=>(
                                <option value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <input id="search" value={filters.search} onChange={handleChange} type="search" class="form-control mx-auto"/>
                    <div class="input-group-apprend">
                        <button onClick={searchProducts} class="btn">Rechercher</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
