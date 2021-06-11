import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


//Import Star Ratings
import StarRatings from "react-star-ratings"
import ReleatedProduct from './Releated'

import Aos from 'aos'
import 'aos/dist/aos.css' 
import { getProductDetailViewClient } from '../../../Core/ApiCore/ProductClient'
import ReactHtmlParser from 'react-html-parser'; 
import { isEmpty } from 'lodash'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../store/action'

const ProductDetails = (props)=>{

   const [product , setProduct] = useState({})
   const [index , setIndex] = useState(0)

   const dispatch = useDispatch()


   const handleImage =(i)=>setIndex(i)

   const addItemCart = (product)=>{
      const { slug , name , newPrice , images } = product

      dispatch(addToCart({ slug , name , newPrice , images}))
      props.history.push('/products/cart')
  }

   useEffect(() => {
      Aos.init({
          duration:2000
      })

      let slug = props.match.params.slug

      getProductDetailViewClient(slug)
         .then(res=>setProduct(res))
  }, [])

    return (
      <React.Fragment>
       <section data-aos="fade-down" className="main">
          <div className="container-fluid pt-2  p-lg-4">
             <div className="card">
               <div className="card-body">
               {!isEmpty(product) && (

                  <div className="row main__card">
                     <div data-aos="fade-right" className="col-lg-5 d-flex  align-items-center justify-content-center mb-2 p-lg-5">
                        <div className="gallery ">
                           <img src={product.images[index]} width="100%" alt="product" className="gallery__main__img mb-2"  />
                           <div className="d-flex justify-content-center">
                              {!isEmpty(product.images) && product.images.map((image , i)=>(
                                 <div key={i} className="gallery__small__img m-1">
                                    <img 
                                       src={image} 
                                       alt={product.name}
                                       onClick={()=>handleImage(i)}
                                       width="100%"
                                    />
                                 </div>                                 
                              ))}                              
                           </div>
                        </div>
                     </div>
                     <div data-aos="fade-left" className="col-lg-7 p-lg-5">
                        <div className="info">
                        <div className="data mb-3">
                           <span className="data__subtitle mb-2">{product.category}</span>
                           <h1 className="data__title mb-2 text-capitalize">{product.name}</h1>

                           <div className="text-muted float-start me-3">
                           <StarRatings
                              rating={product.rating}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#2D363F"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                           />
                           </div>

                        <div className="price my-4">
                           Price : {''}
                           <span className="price__new ">{product.newPrice} Dh</span>       
                           <del className="price__old">{product.oldPrice} Dh</del> 
                        </div>

                        
                           <p className="data__description">{ ReactHtmlParser (product.description)}</p>     
                        </div>
                        {!isEmpty(product.size) && (
                           <div className="size">
                              <h2 className="size__title mb-4">Size</h2>
                              <div className="size__content">
                                 <span className="size__tallas">
                                    40
                                 </span>
                                 <span className="size__tallas active">
                                    41
                                 </span>
                                 <span className="size__tallas">
                                    42
                                 </span>
                                 <span className="size__tallas">
                                    43
                                 </span>
                              </div>  
                           </div>
                        )}
                        

                     <div className="action   d-flex justify-content-between align-items-center">
                        <Link 
                           to="#" 
                           className="action__addToCart text-center w-100 text-capitalize"
                           onClick={()=>{addItemCart(product)}}
                        >Commander ici</Link>   
                     </div> 
                </div>
               </div>
                  </div>
               )}
               </div>
            </div>
          </div>
          <div className="container-fluid pt-2 p-lg-4">
            <div className="row">
               <div className="col-lg-12">
                  <div className="card">
                     <div className="card-body">
                     <h5 className="">Details :</h5>
                        <div className="p-lg-4">
                           { ReactHtmlParser (product.specification)}
                        </div>
                     </div>
                  </div>   
               </div>   
            </div>   
          </div>  
       </section>
       <section>
      
       
       </section>
       <section>
         <ReleatedProduct />
       </section>
       </React.Fragment>
    )
}

export default ProductDetails
