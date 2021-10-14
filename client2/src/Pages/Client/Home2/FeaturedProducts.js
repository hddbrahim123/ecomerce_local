import React from 'react'

function FeaturedProducts() {
    return (
		<div className="well well-small">
			<h4>Featured Products <small className="pull-right">200+ featured products</small></h4>
			<div className="row-fluid">
				<div id="featured" className="carousel slide">
					<div className="carousel-inner">
						<div className="item active">
							<ul className="thumbnails">
								<li className="span3">
								<div className="thumbnail">
								<i className="tag"></i>
									<a href="product_details.html"><img src="images/products/b1.jpg" alt=""/></a>
									<div className="caption">
									<h5>Product name</h5>
									<h4><a className="btn" href="product_details.html">VIEW</a> <span className="pull-right">$222.00</span></h4>
									</div>
								</div>
								</li>
							</ul>
						</div>
					</div>
				<a className="left carousel-control" href="#featured" data-slide="prev">‹</a>
				<a className="right carousel-control" href="#featured" data-slide="next">›</a>
				</div>
			</div>
		</div>
	
    )
}

export default FeaturedProducts
