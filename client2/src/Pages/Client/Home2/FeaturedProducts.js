import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config'

const FeaturedProducts = ({products}) => {
	const baseSiteUrl = window.location.origin.toString() + "/#";
	const matrice = (split) => {
		let tab = []
		let sub = [];
		for (let i = 0; i < products.length; i++) {
			const element = products[i];
			if (i % split === split-1 || i === products.length-1) {
				sub.push(element);
				tab[tab.length] = sub;
				sub = [];
			} else {
				sub.push(element);
			}
		}
		return tab;
	}
	const urlImage = (product) =>{
        return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
    }
    return (
		<div className="well well-small">
			<h4>Produits populaires <small className="pull-right">{products.length}+ Produits populaires</small></h4>
			<div className="row-fluid">
				<div id="featured" className="carousel slide">
					<div className="carousel-inner">
						{/* <div className="item active">
							<ul className="thumbnails">
								<li className="span3">
									<div className="thumbnail">
										<i className="tag"></i>
										<a to="/product/1"><img src={"images/products/1.jpg"} alt=""/></a>
										<div className="caption">
											<h5>camera</h5>
											<h4><Link className="btn" to="/product/1">VIEW</Link> <span className="pull-right">15 Dhs</span></h4>
										</div>
									</div>
								</li>
								<li className="span3">
									<div className="thumbnail">
										<i className="tag"></i>
										<a to="/product/1"><img src={"images/products/1.jpg"} alt=""/></a>
										<div className="caption">
											<h5>camera</h5>
											<h4><Link className="btn" to="/product/1">VIEW</Link> <span className="pull-right">15 Dhs</span></h4>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div className="item">
							<ul className="thumbnails">
								<li className="span3">
									<div className="thumbnail">
										<i className="tag"></i>
										<a to="/product/1"><img src={"images/products/1.jpg"} alt=""/></a>
										<div className="caption">
											<h5>camera</h5>
											<h4><Link className="btn" to="/product/1">VIEW</Link> <span className="pull-right">15 Dhs</span></h4>
										</div>
									</div>
								</li>
								<li className="span3">
									<div className="thumbnail">
										<i className="tag"></i>
										<a to="/product/1"><img src={"images/products/1.jpg"} alt=""/></a>
										<div className="caption">
											<h5>camera</h5>
											<h4><Link className="btn" to="/product/1">VIEW</Link> <span className="pull-right">15 Dhs</span></h4>
										</div>
									</div>
								</li>
							</ul>
						</div> */}
						{matrice(4).map((products,i) => (
							<div key={i} className={`item ${i === 0 ? ' active' : ''}`}>
								<ul className="thumbnails">
									{products.map((product,j)=>
										<li key={j} className="span3">
											<div title={product.name} className="thumbnail">
												<i className="tag"></i>
												<a href={baseSiteUrl+"/product/"+product.slug}><img src={urlImage(product)} alt=""/></a>
												<div className="caption">
													<h6 title={product.name}>{!!product.shortName ? product.shortName : product.name.substring(0,10)}</h6>
													<h4><a className="btn" href={baseSiteUrl+"/product/"+product.slug}> <i className="icon-shopping-cart"></i> {product.newPrice} Dhs</a></h4>
												</div>
											</div>
										</li>
									)}
								</ul>
							</div>
						))}
					</div>
				<a className="left carousel-control" href="#featured" data-slide="prev">‹</a>
				<a className="right carousel-control" href="#featured" data-slide="next">›</a>
				</div>
			</div>
		</div>
    )
}

export default FeaturedProducts
