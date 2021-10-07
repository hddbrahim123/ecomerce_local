import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategorySelecter({ categories,selectCategory,selectedCategories,setSelectedCategories }) {
  
  // const findCategoryFilter = (categories, filter) => {
  //   let tab = [];
  //   categories.forEach((category) => {
  //     if (filter(category)) {
  //       tab[tab.length] = category;
  //     }
  //     if (category.children) {
  //       let ret = findCategoryFilter(category.children, filter);
  //       tab = tab.concat(ret);
  //     }
  //   });
  //   return tab;
  // };

  // const findCategory = (cats, id) => {
  //   cats.forEach((category) => {
  //     if (category.id == id) {
  //       return category;
  //     }
  //     if (category.children) {
  //       let ret = findCategory(category.children, id);
  //       if (ret.id == id) {
  //         return ret;
  //       }
  //     }
  //   });
  //   return {};
  // };

  // const findCheminCategory = (cats, id) => {
  //   let tab = [];
  //   cats.forEach(category => {
  //     if (category.id == id) {
  //       tab = [category];
  //     } else if (category.children) {
  //       let t = findCheminCategory(category.children, id);
  //       if (t.length) {
  //         tab = [category, ...t];
  //       }
  //     }
  //   });
  //   if (tab.length && tab.length != selectedCategories.length) {
  //     setSelectedCategories(tab);
  //     selectCategory(tab[tab.length-1]);
  //   }
  //   return tab;
  // };

  const getChildren = (parent) => {
    if (!parent) {
      return categories;
    } else {
      if (!isEmpty(parent.children)) {
      return parent.children;
      }
    }
    return [];
  };

  const handleClick = (category, index) => {
    let i = selectedCategories.findIndex(e => e.id === category.id);
    
    if (i === -1 || i < selectedCategories.length-1) {
      let tab = [...selectedCategories.filter((e, i) => i < index), category];
      setSelectedCategories(tab);
      selectCategory(category);
    } else {
      let tab = [...selectedCategories.filter((e, i) => i < index)];
      setSelectedCategories(tab);
      selectCategory({});
    }
  };

  const List = (level, categories, selectedId) => {
    return isEmpty(categories) ? "" : (
      <div className="m-1 p-2" style={{borderStyle: 'solid', borderColor:'WindowFrame'}}>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              id={category.id}
              className=""
              style={selectedId == category.id ? { backgroundColor: "ActiveCaption" } : {}}
            >
              <a
                style={selectedId == category.id ? { textDecoration: "underline" } : {}}
                href="javascript:console.log('click');"
                onClick={() => {
                  handleClick(category, level);
                }}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{overflowX:'auto', whiteSpace:'nowrap'}}>
      Chemin : {selectedCategories.map((e, i) => `${e.name} ${(i < selectedCategories.length-1) ? '> ' : ''}`)}
      <ul style={{display: "flex"}} >
        <li key={0}>
          {List(
            0,
            getChildren(""),
            selectedCategories.length > 0 ? selectedCategories[0].id : ""
          )}
        </li>
        {Array.from(selectedCategories).map((category, index) => (
          <li key={index+1}>
            {List(
              index + 1,
              getChildren(category),
              selectedCategories.length > index + 1
                ? selectedCategories[index + 1].id
                : ""
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySelecter;
