import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dictionary from "../../Core/dictionary"

const Sidebar = ({language})=>{

  let isOpen = useSelector(state => state.Layout.leftMenu)

  const [category , setCategory] = useState(false)
  const [product , setProduct] = useState(false)
  const [slide , setSlide] = useState(false)

  const toggleCategoryDropdown = () => setCategory(!category)
  const toggleProductDropdown = () => setProduct(!product)
  const toggleSlideDropdown = () => setSlide(!slide)
  const content = dictionary.sellerLayout[language]
    return (
        <React.Fragment>
         <div className={isOpen ? "sidebar show__sidebar " : "sidebar shadow-sm"}>
           <nav className="sidebar__container">
              <div className="sidebar__list">

                <div className="sidebar__items">
                  <h2 className="sidebar__subtitle">{content.menuHome}</h2>

                  <Link to="/seller" className="sidebar__links">
                    <i className='bx bx-home sidebar__icon' ></i>
                    <span className="sidebar__name">{content.menuDashboard}</span>
                  </Link>
                </div>

                <div className="sidebar__items">
                  <h2 className="sidebar__subtitle">{content.menuShoop}</h2>

                  <div className="sidebar__dropdown">  
                    <Link to="#" className="sidebar__links" onClick={toggleSlideDropdown}>
                        <i className='bx bx-home sidebar__icon' ></i>
                        <span className="sidebar__name">{content.menuSlide}</span>
                        <i className='bx bx-chevron-down sidebar__icon sidebar__dropdown__icon'></i>
                    </Link>
                    <div className={ slide ? "sidebar__dropdown__collapse show__dropdown" : "sidebar__dropdown__collapse" }>
                      <div className="sidebar__dropdown__content">
                        <Link to="/seller/slide/create" className="sidebar__dropdown__links">{content.menuAddSlide}</Link>
                        <Link to="/seller/slides" className="sidebar__dropdown__links">{content.menuShowSlides}</Link>
                      </div>  
                    </div>                      
                  </div>
                </div>

                <div className="sidebar__items">
                  <h2 className="sidebar__subtitle">{content.menuShoop}</h2>

                  <div className="sidebar__dropdown">
                    <Link to="#" className="sidebar__links" onClick={toggleCategoryDropdown}>
                        <i className='bx bx-home sidebar__icon' ></i>
                        <span className="sidebar__name">{content.menuCategories}</span>
                        <i className='bx bx-chevron-down sidebar__icon sidebar__dropdown__icon'></i>
                    </Link>
                    <div className={ category ? "sidebar__dropdown__collapse show__dropdown" : "sidebar__dropdown__collapse" }>
                        <div className="sidebar__dropdown__content">
                            <Link to="/seller/categories/create" className="sidebar__dropdown__links">{content.menuAddCategory}</Link>
                            <Link to="/seller/categories" className="sidebar__dropdown__links">{content.menuShowCategories}</Link>
                        </div>
                    </div>
                  </div>

                  <div className="sidebar__dropdown">  
                    <Link to="#" className="sidebar__links" onClick={toggleProductDropdown}>
                        <i className='bx bx-home sidebar__icon' ></i>
                        <span className="sidebar__name">{content.menuProduit}</span>
                        <i className='bx bx-chevron-down sidebar__icon sidebar__dropdown__icon'></i>
                    </Link>
                    <div className={ product ? "sidebar__dropdown__collapse show__dropdown" : "sidebar__dropdown__collapse" }>
                      <div className="sidebar__dropdown__content">
                        <Link to="/seller/products/create" className="sidebar__dropdown__links">{content.menuAddProduct}</Link>
                        <Link to="/seller/products" className="sidebar__dropdown__links">{content.menuShowProducts}</Link>
                      </div>  
                    </div>                      
                  </div>
                  
                  <Link to="/seller/orders" className="sidebar__links">
                    <i className='bx bx-home sidebar__icon' ></i>
                    <span className="sidebar__name">{content.menuShowOrders}</span>
                  </Link>
                </div>                
             </div>
           </nav> 
         </div>
        </React.Fragment>
    )
}

export default Sidebar
