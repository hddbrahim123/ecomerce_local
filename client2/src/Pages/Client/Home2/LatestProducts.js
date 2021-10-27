import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config'

function LatestProducts({products}) {
    const urlImage = (product) =>{
        return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
    }
    return (
        <div>
            <h4>Derniers produits </h4>
            <ul className="thumbnails">
                {products.map((product,i)=>(
                    <li key={i} className="span3">
                        <div className="thumbnail">
                            <Link to={"/product/"+product.slug}><img src={urlImage(product)} alt=""/></Link>
                            <div className="caption">
                            <h6 title={product.name}>{product.shortName}</h6>
                            <p> 
                                {product.description}
                            </p>
                            <h4 style={{textAlign:"center"}}><a className="btn" href=""> <i className="icon-zoom-in"></i></a> <Link to={"/product/"+product.slug} className="btn">Add to <i className="icon-shopping-cart"></i></Link> <Link className="btn btn-primary" to={"/product/"+product.slug}>{product.newPrice} Dh</Link></h4>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>	
        </div>
    )
}

export default LatestProducts
