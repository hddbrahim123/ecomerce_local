import { filter } from 'lodash'
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

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
                                <option key={i} value={cat.id}>{cat.name} ({cat.countProducts})</option>
                            ))}
                        </select>
                    </div>
                    <input id="search" value={filters.search} onChange={handleChange} type="search" className="form-control mx-auto"/>
                    <div className="mx-2">
                        <Link onClick={searchProducts} to="#">
                            {/* <i className='bx bx-search-alt-2' width="96" height="96"></i> */}
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABNtJREFUaEPtmjFv20YUx/+PKhCpqD9AU1hKJ2fr0HRqlhiVYC/xlCzx5iXemiGZWg/uFg/pZi/tJC/Z7CUOGdhLt2rpFk2tZCT5ADYqF6j5iidTAU3dkcfjyQJrcbEBko/vd+/d/969E+GaXXTNeDED/r9HfBbhIhH+cokX/j3HPSIsgPHF8G/sYkYXhHcEdDwPnT8PqFvkezbvFo7wfJNveoRHABYB3MzpxHsAhyFj9zgg+X/ilzXwwn2eOzvDYwCrjrxsV6vY6e7TiSN7SjNWwI0WLzJjkwhzLp1jxgkRNno+Hbq0G7eVG7jR4qcOo6rjavd82poEtDGwpPDgDJt0MVe111CYgH0G3n5SwclImCJBmyPgNoD7SUEbM0jYq97AlusUNwaut/hFGiwBOzeqaJs6KAP4zxlWGUMdUF+Evd5r2nAZaSPgepOf0YUSj13MOGLgua3KisoTIPbvaezv9gN67go6E1gECsAL1Qclqn/5tO3CmVstXk+J9hNXQpYKPJy3A7xSqXEYYuP4De25gB3ZmP+OVzwPm0mbot61GpZNp0uaT6nAjRb/JAKTNJAV2SgrvgZwm/li6SKCrK9vQej0XtORzildpJnhJLW1wFEF9Uox2kf9gL5XORyByrKVVXFJVbWlS9N6k39WzemQsWyrFSN/tcA6odJ9NE3YdNEMGdvHAe0k7+sGOyuzTKaXFrjRYonupUilfdAGWBxkxlY/oHbSWU1qv+/5tGwCpl/pFHekSAhDvEzeqlZxN004dHM+y0HPw8Pkzimq1X9Lvqt6Nst+/L4ywqrRlQqqH9DDLOMx6A6AXZmnkfPfAMO1/I5CF5S2601+qdhiKjMiy6/UOawSDV3q6cRLJ0gp6+3YWltv8ioRRAQ/XlLo6ETTBFoZYdXIhoy144AkaoWvRot/SUZapQ/zTb7jEeTZOLBRpuWaw40W/+F67sTtqUAAdHo+rcWf02lJz6evbEddGWEVcJGPaNL+0qBKNdUP6G7yWde+TA3YNEJTAy66HJgCZqU0Mz70A1qysSfvTEW0TJ01neum9tKAx2rZPMtSHgfSnr2yZalI4eEKVuxcWeFhW1q6hL3S0jIa3QMifB6HcLFbMR0UTUV22vPpW1MbquecbQ+LOJF8dyrbQ20DADjs+/TEJWDSlqZDelqtYqlom2ciLZ4igzG1Fo84HQnHAYDPkhBX3MT7UKvhQdHoatfhOFxam1bXorGJ8HyTH3uEddW7LndqmX3pSLH1jXjgUIoS2+basBFPeKo71ZBNRaWCNVdnyUbAAp3VvpFof1rDrmnayXT5e4BHuqjGI+0S2hg4ms/PVH3qhHNdIuyFjK7qMM0jLDBjJfMwLZHbrqCNgUfft+1O5pzXpyqhdAGdGzhKbzlvklOJMfXOCXbpcdn6MfCDZEYY4tdJQFsBj5aswQDrulPFvOBylFKrYXukAVE97xzaGngEFB13yu88FpO1twH0KQFt3bnyJKALA8ehxMHzc0j/WXrPstx8/NmSpCsR3sk8lIZdpYLfTZYa19BOgQ0iavWIS+hSAMsouYIuDbAr6FIBG0BnHpqXDjgFer/n049ZIlFKYAW0EazR9jBrxKZ5P1oGV/L8rKm0EbYd6Bmw7ciV5b1ZhMsSKVs/ZxG2HbmyvHftIvwfVOSxW1outL8AAAAASUVORK5CYII="/>
                        </Link>
                        {/* <Button onClick={searchProducts} className="btn secondary">Rechercher</Button> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
