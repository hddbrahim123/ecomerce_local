import { isEmpty } from "lodash";
import React, { useState } from "react";

const MenuCategories = ({ categories }) => {
  const [down] = useState(true);

  const CategoryItem = (category) =>
  {
    // return <Link to={"#/products/" + category.id} className="text-muted">
    //         {/* <img src={icon} alt={category.name} className="mx-1"  /> */}{" "}
    //         {category.name}
    //         {/* <img src={icone} alt={category.name} className="float-end" /> */}
    //       </Link>
    return <a
              id={"st_ma_"+category.id}
              href={"#/products/" + category.id}
              title={category.name}
              className="ma_level_1 ma_item"
            >
              {category.name}
            </a>
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-warning form-control"
        type="button"
        // onMouseEnter={()=>setDown(true)}
        // onMouseLeave={()=>setDown(false)}
      >
        Categories
      </button>
      <ul className={down ? "form-control" : "form-control"}>
        {categories.map((category, i) => (
          <li
            key={i}
            className="dropdown-item outline-success me-2 sub-dropdown"
          >
            
              {CategoryItem(category)}
              {!isEmpty(category.children) && <div className="dropdown-content">
                
                    <ul className="">
                      {category.children.map((category2,index2)=>(
                        <li key={index2} className="">
                          {CategoryItem(category2)}
                          {!isEmpty(category2.children) && <ul className="mu_level_2 p_granditem_1">
                            {category2.children.map((category3,index3)=>(
                              <li key={index3} className="ml_level_2 granditem_0 p_granditem_1">
                                {CategoryItem(category3)}
                              </li>
                            ))}
                          </ul>}
                        </li>
                      ))}
                      </ul>

              </div>}
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuCategories;
