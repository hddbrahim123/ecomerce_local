import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Aos from 'aos'
import 'aos/dist/aos.css' 

const Footer = ()=>{

    useEffect(() => {
        Aos.init({
            duration:2000
        })
    }, [])

    return (
        <React.Fragment>
            <footer data-aos="fade-up" className="footer">
             <div className="container">   
              <div className="row">
                <div className="col-lg-3">
                    <h2 className="footer__title">Our services</h2>
                    <ul className="footer__menu">
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Online Help</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Contact Us</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Order Status</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" ></Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3">
                    <h2 className="footer__title">Explore</h2>
                    <ul className="footer__menu">
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Home</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Shop</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >shooping cart</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >About Us</Link>
                        </li>
                    </ul>   
                </div>
                <div className="col-lg-3">
                    <h2 className="footer__title">CUSTOMER SUPPORT</h2>
                    <ul className="footer__menu">
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >7/24 Hour Support</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Shipping Guide</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >International Shipping</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Career</Link>
                        </li>
                    </ul>                   
                </div> 
                <div className="col-lg-3">
                    <h2 className="footer__title">information</h2>
                    <ul className="footer__menu">
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Terms of Use</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Privecy Policy</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Refund Policy</Link>
                        </li>
                        <li className="footer__list">
                            <Link to="#" className="footer__link" >Billing System</Link>
                        </li>
                    </ul>                   
                </div>     
              </div>   
             </div>    
            </footer>  
        </React.Fragment>
    )
}

export default Footer
