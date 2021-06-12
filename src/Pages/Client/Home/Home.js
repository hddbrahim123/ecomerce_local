import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import Aos from 'aos'
import 'aos/dist/aos.css'
import { getCategories } from '../../../Core/ApiCore/Category'
import FilterCategoryHome from './FilterCategoryHome'
import Slide from './Slide'
import icone from '../../../assets/images/icon-img/4.png'

const Home = ()=>{

  const [categories , setCategories] = useState([])

  useEffect(()=>{
    Aos.init({
      duration:2000
    })
    getCategories()
      .then(res=>setCategories(res))
  },[])
    return (
        <React.Fragment>
          <section className="bg-white">
            <div data-aos="fade-right" className="container-fluid px-lg-4 p-lg-2">
              <div className="row">
                <div className="col-lg-3 d-none d-lg-block">
                  <div className="card my-4 shadow-sm">
                    <div className="card-body">
                      <FilterCategoryHome  categories={categories} />
                    </div>
                  </div>
                </div>
                <div data-aos="fade-left" className="col-lg-9">
                <div className="card my-4 shadow-sm">
                  <div className="card-body m-0 p-0">
                    <Slide />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
    )
}

export default Home
