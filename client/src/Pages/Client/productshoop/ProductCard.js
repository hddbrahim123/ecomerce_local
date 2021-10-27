import React from 'react'
import { Link, withRouter } from 'react-router-dom'

//Import Star Ratings
import StarRatings from "react-star-ratings"
import { API_URL } from '../../../config';

const ProductCard = (props) => {
    const { product, history } = props;
    const urlImage = (product) =>{
        return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
    }
    return (
        <React.Fragment>
            <div
                onClick={() =>
                    history.push(`/product/${product.slug}`)
                }
                className="card m-1 mb-2 shadow-sm" style={{ cursor: "pointer" }}>
                <div className="card-body">
                    <div className="product-img position-relative">
                        {product.isOffer ? (
                            <span className="featured__offre">
                                {`-${product.offer}%`}
                            </span>
                        ) : ""}
                        <img
                            src={urlImage(product)}
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
                        {product.oldPrice != product.newPrice ? (
                            <h5 className="my-0">
                                <span className="text-muted me-2">
                                    <del>{product.oldPrice} Dhs</del>
                                </span>
                                <b>{product.newPrice} Dhs</b>
                            </h5>
                        ) : (
                            <h5 className="my-0">
                                <b>{product.newPrice} Dhs</b>
                            </h5>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(ProductCard)
