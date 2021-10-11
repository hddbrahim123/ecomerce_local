import React from 'react'

function LatestProducts() {
    return (
        <div>
            <h4>Latest Products </h4>
            <ul className="thumbnails">
                <li className="span3">
                <div className="thumbnail">
                    <a  href="product_details.html"><img src="images/products/6.jpg" alt=""/></a>
                    <div className="caption">
                    <h5>Product name</h5>
                    <p> 
                        Lorem Ipsum is simply dummy text. 
                    </p>
                    <h4 style="text-align:center"><a className="btn" href="product_details.html"> <i className="icon-zoom-in"></i></a> <a className="btn" href="#">Add to <i className="icon-shopping-cart"></i></a> <a className="btn btn-primary" href="#">$222.00</a></h4>
                    </div>
                </div>
                </li>
            </ul>	
        </div>
    )
}

export default LatestProducts
