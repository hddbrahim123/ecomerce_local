import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config';

function ProductHome(props) {
    const { product, history} = props;
    const urlImage = (product) =>{
        return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
    }
    return (
        <div className="col-2" style={{cursor:"pointer"}}
            onClick={() =>
                document.location = `/#/product/${product.slug}`
            }>
            <div className="text-center m-2">
                <img src={urlImage(product)} alt="name" width="100%" className="rounded" />
                <h5 className="mb-3 text-truncate">
                    <Link
                        to={"/product/" + product.slug}
                        className="first-color text-capitalize"
                        >
                        {product.name}{" "}
                    </Link>
                </h5>
                <h6 className="text-muted">{product.newPrice} Dhs</h6>
            </div>
        </div>
    )
}

export default ProductHome
