import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategorySelecter({ categories }) {
  const [selectedCategories,setSelectedCategories] = useState([]);

//   const findCategory = (categories, id) => {
//     categories.forEach((category) => {
//       if (category.id === id) {
//         return category;
//       }
//       if (category.children) {
//         let ret = findCategory(category.children, id);
//         if (ret != undefined) {
//           return ret;
//         }
//       }
//     });
//     return undefined;
//   };

  const getCategories = (level, parent) => {
    if (!parent) {
      return categories;
    } else {
      //let category = findCategory(categories, parent.id);
      if (parent.children) {
        return parent.children;
      }
    }
    return [];
  };

  const handleClick = (category) => {
    console.log(category);
    let index = selectedCategories.findIndex(e=>e.id === category.id);
    if (index === -1) {
        setSelectedCategories([...selectedCategories, category])
    } else {
        setSelectedCategories([...selectedCategories.splice(index)])
    }
  };

  const List = (categories) => {
    return (
      <ul>
        {categories.map((category, index) => (
          <li key={index} id={category.id}>
            <Link
              to="#"
              onClick={() => {
                if (category.hasChildren) {
                  handleClick(category);
                }
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
        {JSON.stringify(selectedCategories)}
      <ul style={{ display: "flex" }}>
        <li>{List(getCategories(1, ""))}</li>
        {Array.from(selectedCategories).map((category, index) => (
          <li key={index}>{List(getCategories(index + 2, category))}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySelecter;
