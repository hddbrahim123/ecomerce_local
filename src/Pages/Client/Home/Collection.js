import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import collection1 from '../../../assets/images/collection1.png'

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
              <div className="container collection mb-5">
                <div data-aos="fade-down" className="collection__box shadow-sm">
                    <img src={collection1} alt="name" className="collection__img" />
                    <div className="collection__data">
                        <h2 className="collection__title">Men <br /><span className="collection__subtitle">back up</span></h2>
                        <Link to="#" className="collection__link">
                            <span className="collection__name">view collection</span>
                            <i className='bx bx-right-arrow-alt collection__icon'></i>
                        </Link>
                    </div>
                </div>
                <div data-aos="fade-down" className="collection__box shadow-sm">
                    <div className="collection__data">
                        <h2 className="collection__title">women <br /><span className="collection__subtitle">back up</span></h2>
                        <Link to="#" className="collection__link">
                            <span className="collection__name">view collection</span>
                            <i className='bx bx-right-arrow-alt collection__icon'></i>
                        </Link>
                    </div>
                    <img src={collection1} alt="name" className="collection__img" />
                </div>
              </div>
            </section>
        </React.Fragment>
    )
}

export default Collection
