import React from 'react'

function FeaturedProducts() {
    return (
        <div class="well well-small">
			<h4>Featured Products <small class="pull-right">200+ featured products</small></h4>
			<div class="row-fluid">
				<div id="featured" class="carousel slide">
					<div class="carousel-inner">
						<div class="item active">
							<ul class="thumbnails">
								<li class="span3">
									<div class="thumbnail">
										<a href="product_details.html"><img src="" alt=""/></a>
										<div class="caption">
										<h5>Product name</h5>
										<h4><a class="btn" href="product_details.html">VIEW</a> <span class="pull-right">$222.00</span></h4>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				<a class="left carousel-control" href="#featured" data-slide="prev">‹</a>
				<a class="right carousel-control" href="#featured" data-slide="next">›</a>
				</div>
			</div>
		</div>
    )
}

export default FeaturedProducts
