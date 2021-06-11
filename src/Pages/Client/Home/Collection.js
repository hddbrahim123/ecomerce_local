import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import laptop from '../../../assets/images/laptop2.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css' 

const Collection = ()=>{

    useEffect(() => {
        Aos.init({
            duration:2000
        })
    }, [])

    return (
        <React.Fragment>
            <section>
              <div className="container-fluid collection mb-5">
                <div data-aos="fade-down" className="collection__box shadow-sm">
                    <div className="collection__data">
                        <h2 className="collection__title mb-2">Laptop </h2>
                        <Link to="#" className="collection__link">
                            <span className="collection__name">view collection</span>
                            <i className='bx bx-right-arrow-alt collection__icon'></i>
                        </Link>
                    </div>
                    <img src={laptop} alt="name" className="collection__img" />
                </div>
                <div data-aos="fade-down" className="collection__box shadow-sm">
                    <div className="collection__data">
                        <h2 className="collection__title mb-2">Laptop</h2>
                        <Link to="#" className="collection__link">
                            <span className="collection__name">view collection</span>
                            <i className='bx bx-right-arrow-alt collection__icon'></i>
                        </Link>
                    </div>
                    <img src={laptop} alt="name" className="collection__img" />
                </div>
                <div data-aos="fade-down" className="collection__box shadow-sm">
                    <div className="collection__data">
                        <h2 className="collection__title mb-2">Laptop</h2>
                        <Link to="#" className="collection__link">
                            <span className="collection__name">view collection</span>
                            <i className='bx bx-right-arrow-alt collection__icon'></i>
                        </Link>
                    </div>
                    <img src={laptop} alt="name" className="collection__img" />
                </div>
                <div data-aos="fade-down" className="collection__box shadow-sm">
                    <div className="collection__data">
                        <h2 className="collection__title mb-2">Laptop </h2>
                        <Link to="#" className="collection__link">
                            <span className="collection__name">view collection</span>
                            <i className='bx bx-right-arrow-alt collection__icon'></i>
                        </Link>
                    </div>
                    <img src={laptop} alt="name" className="collection__img" />
                </div>
              </div>
            </section>
        </React.Fragment>
    )
}

export default Collection
