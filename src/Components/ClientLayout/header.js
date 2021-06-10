import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import iconmenu from '../../assets/icons/icon-menu.svg'
import brand from '../../assets/icons/nike-logo.svg'
import cart from '../../assets/icons/shopping-bag.svg'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Header = ()=>{
  const [show , setShow] = useState(false)
  const toggleMenu = () => setShow(!show)

  useEffect(() => {
    Aos.init({
      duration:2000
    })
  }, [])

    return (
      <header data-aos="fade-down" className="header shadow-sm">
        <nav className="nav ">
            <div className="nav__toggle" onClick={toggleMenu}>
             <img src={iconmenu} alt="icon-toggle" />
            </div>
            <div className="nav__brand">
                <img src={brand} alt="icon-brand" />
            </div>
            <div className={show ? "nav__menu show" : "nav__menu"}>
                <ul className="nav__list">
                  <li className="nav__item ">
                    <Link to="/" className="nav__link">home</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/products" className="nav__link">shoop</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="#" className="nav__link">About</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="#" className="nav__link">Contact</Link>
                  </li>
                </ul>
            </div>
            <div className="nav__cart">
              <img src={cart} alt="cart" />
            </div>
        </nav>      
      </header>
    )
}

export default Header
