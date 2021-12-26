import React, { useState } from 'react'

const ListCategories = ({ categories,categoryId, setCategories }) => {
    const baseSiteUrl = window.location.origin.toString() + "/#";
    
    // const [categoriess, setCategoriess] = useState([]);
    const [idCategory, setIdCategory] = useState(0);
    const [idCategoryy, setIdCategoryy] = useState(0);
    const clickCategory = (category) => {
        if (category.id === idCategory) {
            setIdCategory(0);
        }else{
            setIdCategory(category.id);
        }
        // let isOpen = category.open === true ? false : true;
        // category.open = isOpen;
        // setCategoriess(categoriess.map(e => category.id == e.id ? {...e, open: isOpen} : e));
    }
    const clickCategoryy = (category) => {
        if (category.id === idCategoryy) {
            setIdCategoryy(0);
        }else{
            setIdCategoryy(category.id);
        }
    }

    return (
        <ul id="sideManu" className="nav nav-tabs nav-stacked">
            {categories.map((category, i) => (
                // {!!category.icon?ReactHtmlParser(category.icon.replace('class=','className=')):''}
                <li onClick={(e)=>clickCategory(category)} key={category.id} className="subMenu">
                    {category.children ? (<a className={categoryId === category.id ? 'link-selected' : ''}> {category.name}</a>) : (<a className={categoryId === category.id ? 'link-category link-selected' : 'link-category'} href={`${baseSiteUrl}/products/${category.id}`}> {category.name}</a>)}
                    {category.children && (
                        <ul style={{ display:category.id == idCategory ? 'block':'none' }}>
                            {category.children.map((subCategory, j) => (
                                <li onClick={(e)=>{e.stopPropagation(); clickCategoryy(subCategory)}} key={subCategory.id}>
                                    {subCategory.children ? (<a className={categoryId === subCategory.id ? 'link-selected' : ''}> {subCategory.name}</a>) : (<a className={categoryId === subCategory.id ? 'link-category link-selected' : 'link-category'} href={`${baseSiteUrl}/products/${subCategory.id}`}> {subCategory.name}</a>)}
                                    {subCategory.children && (
                                        <ul style={{ display:subCategory.id == idCategoryy ? 'block':'none' }}>
                                            {subCategory.children.map((subCategory2, k) => (
                                            <li onClick={(e)=>e.stopPropagation()} key={subCategory2.id}>
                                                <a className={categoryId === subCategory2.id ? 'link-category link-selected' : 'link-category'} href={`${baseSiteUrl}/products/${subCategory2.id}`}>  -- {subCategory2.name}</a>
                                            </li>
                                        ))}</ul>)}
                                    
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default ListCategories
