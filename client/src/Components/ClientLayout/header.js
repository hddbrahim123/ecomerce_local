import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import iconmenu from "../../assets/icons/icon-menu.svg";
// import brand from "../../assets/icons/nike-logo.svg";
import cart from "../../assets/icons/shopping-bag.svg";

import Aos from "aos";
import "aos/dist/aos.css";

import dictionary from "../../Core/dictionary";
import { useSelector } from "react-redux";

const Header = ({language, handleStoreLanguage}) => {
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  let countItem = useSelector(state => state.Cart.count)

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  const content = dictionary.headerContent[language];

  return (
    <header data-aos="fade-down" className="header shadow-sm">
      <nav className="nav ">
        <div className="nav__toggle" onClick={toggleMenu}>
          <img src={iconmenu} alt="icon-toggle" />
        </div>
        {/* <div className="nav__brand">
          <img src={brand} alt="icon-brand" />
        </div> */}
        <div className={show ? "nav__menu show" : "nav__menu"}>
          <ul className="nav__list">
            <li className="nav__item ">
              <Link to="/" className="nav__link">
                {content.home}
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/products" className="nav__link">
                {content.shoop}
              </Link>
            </li>
            {/* <li className="nav__item">
              <Link to="#" className="nav__link">
                {content.about}
              </Link>
            </li>
            <li className="nav__item">
              <Link to="#" className="nav__link">
                {content.contact}
              </Link>
            </li> */}
          </ul>
        </div>
        {/* <div className="m-3">
          <select
            value={language}
            onChange={(e) => {
              handleStoreLanguage(e.target.value);
            }}
          >
            {dictionary.languages.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div> */}
        <div className="nav__cart">
        <span className="">
          <Link to="/cart">
            <img src={cart} alt="cart" /> {countItem > 0 && <span className="badge bg-warning">{countItem}</span>}
          </Link> 
        </span>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
