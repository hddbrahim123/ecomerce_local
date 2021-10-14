import React from 'react'
import { Link } from 'react-router-dom'

function ProductHome(props) {
    const { product, history} = props
    return (
        <div className="col-2" style={{cursor:"pointer"}}
            onClick={() =>
                document.location = `/#/product/${product.slug}`
            }>
            <div className="text-center m-2">
                <img src={product.image} alt="name" width="100%" className="rounded" />
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
