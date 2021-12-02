import React from 'react'

const ListCategories = (props) => {
    const { categories,categoryId } = props
    const baseSiteUrl = window.location.origin.toString() + "/#";
    
    console.log(categoryId)
    return (
        <ul id="sideManu" className="nav nav-tabs nav-stacked">
            {categories.map((category, i) => (
                // {!!category.icon?ReactHtmlParser(category.icon.replace('class=','className=')):''}
                <li key={category.id} className="subMenu">{category.children ? (<a className={categoryId === category.id ? 'link-selected' : ''}> {category.name}</a>) : (<a className={categoryId === category.id ? 'link-category link-selected' : 'link-category'} href={`${baseSiteUrl}/products/${category.id}`}> {category.name}</a>)}
                    {category.children && (
                        <ul>
                            {category.children.map((subCategory, j) => (
                                <li key={subCategory.id}><a className={categoryId === subCategory.id ? 'link-category link-selected' : 'link-category'} href={`${baseSiteUrl}/products/${subCategory.id}`}> <i className="icon-chevron-right"></i> {subCategory.name}</a></li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default ListCategories
