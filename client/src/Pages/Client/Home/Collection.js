import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import laptop from '../../../assets/images/laptop2.jpg'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Aos from 'aos'
import 'aos/dist/aos.css' 
import { isEmpty } from 'lodash'

const Collection = ({categories})=>{

    useEffect(() => {
        Aos.init({
            duration:2000
        })
    }, [])

    return (
        <React.Fragment>
            <section>
              <div className="container-fluid collection mb-5">
                  {!isEmpty(categories) && categories.map((category,i)=>(
                    <div key={i} data-aos="fade-down" className="collection__box shadow-sm">
                        <div className="collection__data">
                            <p className="collection__title fs-6 mb-2">{category.name} </p>
                            <Link to="/products" className="collection__link">
                                <span className="collection__name">view collection</span>
                                <i className='bx bx-right-arrow-alt collection__icon'></i>
                            </Link>
                        </div>
                        <img src={laptop} alt="name" className="collection__img" />
                    </div>
                  ))}               
              </div>
            </section>
        </React.Fragment>
    )
}

export default Collection
