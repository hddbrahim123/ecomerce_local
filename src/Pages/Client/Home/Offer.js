import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import offer from '../../../assets/images/collection1.png'
import laptop from '../../../assets/images/laptop2.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css' 

const Offer = ()=>{

  useEffect(() => {
      Aos.init({
          duration:2000
      })
  }, [])

    return (
        <React.Fragment>
            <section data-aos="fade-down">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 my-4">
                    <div className="offer">
                      <div className="offer__data">
                        <h2 className="offer__title">25% off</h2>
                        <p className="offer__description">offer in all my products</p>
                        <Link to="#" className="offer__link">shop now</Link>  
                      </div>
                      <img src={laptop} alt="name"  className="offer__img" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </React.Fragment>
    )
}

export default Offer
