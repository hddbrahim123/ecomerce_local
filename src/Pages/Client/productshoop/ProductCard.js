import React from 'react'
import { Link } from 'react-router-dom'


//Import Star Ratings
import StarRatings from "react-star-ratings"

const ProductCard = ({product})=>{
    return (
        <React.Fragment>
            <div className="card m-2 mb-4 shadow-sm">
                <div className="card-body">
                    <div className="product-img position-relative">
                        {product.isOffer ? (
                            <span className="featured__offre">
                                {`-${product.offer}%`}
                            </span>
                        ) : null}

                        <img
                            src={product.image}
                            alt=""
                            className="img-fluid mx-auto d-block"
                        />
                        </div>
                        <div className="mt-4 text-center">
                        <h5 className="mb-3 text-truncate">
                            <Link
                            to={"/product/" + product.slug}
                            className="first-color text-capitalize"
                            >
                            {product.name}{" "}
                            </Link>
                        </h5>
                        <div className="text-muted mb-3">
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
                        <h5 className="my-0">
                            <span className="text-muted me-2">
                            <del>${product.oldPrice}</del>
                            </span>
                            <b>${product.newPrice}</b>
                        </h5>
                    </div>    
                </div>                
            </div> 
        </React.Fragment>
    )
}

export default ProductCard
