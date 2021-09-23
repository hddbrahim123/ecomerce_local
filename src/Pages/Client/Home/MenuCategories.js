import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuCategories = ({ categories }) => {
  const [down, setDown] = useState(true);
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        // onMouseEnter={()=>setDown(true)}
        // onMouseLeave={()=>setDown(false)}
      >
        Categories
      </button>
      <ul className={down ? "dropdown-menu show" : "dropdown-item"} aria-labelledby="dropdownMenuButton1">
          {categories.map((category,i)=>(
            // <li key={i}>
            //     <a className="dropdown-item" href="#">
            //         Action
            //     </a>
            // </li>
            <li key={i} className="dropdown-item">
                <Link to={"/products/"+category.id} className="text-muted">
                    {/* <img src={icon} alt={category.name} className="mx-1"  /> */}
                    {" "}{category.name}
                    {/* <img src={icone} alt={category.name} className="float-end" /> */}
                </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MenuCategories;
