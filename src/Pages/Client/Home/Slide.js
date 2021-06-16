import React, { useEffect, useState } from 'react'


import laptop from '../../../assets/images/laptop2.jpg'
import { Link } from 'react-router-dom';
import { slide } from '../../../Components/Comon/data';
import { isEmpty } from 'lodash';

const Slide = ()=>{

    const [slideProduct , setSlideProduct] = useState({})


    useEffect(() => {
        setSlideProduct(slide)
    }, [])

    return (
        <React.Fragment>
            {!isEmpty(slideProduct) && (
                <div className="home__slide d-flex justify-content-between align-items-center p-lg-2" >
                    <div className="m-2">
                        <h6 className="home__slide__title text-capitalize fw-bold fs-6  first-color  my-4">{slideProduct.title}</h6>
                        <p className="text-muted  mb-3">{slideProduct.description}</p>
                        <Link className="home__slide__btn btn btn-primary py-2 px-2 my-4 border-0" to="products">Shoop Now</Link>
                    </div>
                    <img src={laptop} alt={slideProduct.title} className="home__slide__img" width="160px" />
                </div>
            )}
        </React.Fragment>
    )
}
export default Slide
