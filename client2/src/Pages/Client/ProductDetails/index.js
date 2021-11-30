import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import MetaTags from "react-meta-tags";

// Import Star Ratings
// import StarRatings from "react-star-ratings";
// import ReleatedProduct from "./Releated";

// import { isEmpty, map } from "lodash";
// import Aos from "aos";
// import "aos/dist/aos.css";
import {
	getProductDetailViewClient,
	getRelatedProducts,
} from "../../../Core/ApiCore/ProductClient";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decProductQty, incProductQty, removeProductInCart, setProductQty } from "../../../store/action";
import dictionary from "../../../Core/dictionary";
import { API_URL } from "../../../config";
import { isEmpty } from "lodash";
import ModalImages from "./ModalImages";
// import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
// import FicheTechnique from "./FicheTechnique";

const ProductDetails = (props) => {
	const [language] = useState(
		localStorage.getItem("language") ?? dictionary.defaultLanguage
	);
	const [product, setProduct] = useState({});

	const [releatedProducts, setReleatedProducts] = useState([]);

	const [index, setIndex] = useState(0);

	const dispatch = useDispatch();

	// const handleImage = (i) => {
	// 	setIndex(i);
	// };

	let item = useSelector(state => product.slug ? state.Cart.products.find(p => p.slug == product.slug) : {})
	//let qty = useSelector(state => product.slug ? state.Cart.products.find(p => p.slug == product.slug)?.qty : {})

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	//const toggle = () => setIsOpen(!isOpen);
	const addItemCart = () => {
		const { slug, name, newPrice, oldPrice, images } = product;
		dispatch(addToCart({ slug, name, newPrice, oldPrice, images, qty:1 }));
		//props.history.push("/cart");
	};
	const toCart = () => {
		window.location = `${baseSiteUrl}/cart`;
	};

	const properties = [
		"mainCharacteristics",
		"technicalDescription",
		"general",
		"garantie",
		"venduWith"
	];
	const titles = [
		"PRINCIPALES CARACTÉRISTIQUES",
		"DESCRIPTIF TECHNIQUE",
		"GENERAL",
		"GARANTIE",
		"VENDU AVEC LE PRODUIT",
	];

	// const imageLoading = 'images/lightbox/lightbox-ico-loading.gif'
	// const imageBtnPrev = 'images/lightbox/lightbox-btn-prev.gif'
	// const imageBtnNext = 'images/lightbox/lightbox-btn-next.gif'
	// const imageBtnClose = 'images/lightbox/lightbox-btn-close.gif'
	// const imageBlank = 'images/lightbox/lightbox-blank.gif'

	const selectImage = (e)=>{
		setIndex(e);
	}
	const handleChangeQty = (e) => {
		let qty = parseInt(e.target.value);
		if (qty > 0) {
			if (qty <= product.quantity) {
				if (isEmpty(item)) {
					addItemCart();
				} else {
					dispatch(setProductQty(item, qty));
				}
			}
		} else if (qty < 1){
			dispatch(removeProductInCart(product.slug));
		}
	}
	const urlImage = (image,product) =>{
        return `${API_URL}User/Image?slug=${product.slug}&file=${image}`;
    }
	const [isListView, setIsListView] = useState(false);
	const divider = '>';
	useEffect(() => {
		// Aos.init({
		// 	duration: 2000,
		// });
		// if (window.location.href.indexOf('?') > -1) {
		// 	window.location = window.location.href.replace('?','')
		// }
		let slug = props.match.params.slug;
		if (slug) {
			getProductDetailViewClient(slug).then((res) => {
				if (res) {
					if (res.images) {
						for (let i = 0; i < res.images.length; i++) {
							res.images[i] = urlImage(res.images[i],res);
						}
					}
					//res.quantity = 0;
					setProduct(res);
					getRelatedProducts(slug, parseInt(3)).then((res) =>
						setReleatedProducts(res)
					);
				} else {
					props.history.push("/");
				}
			});
		}
	}, [props]);
	const baseSiteUrl = window.location.origin.toString() + "/#";
	const content = dictionary.detailProductContent[language];
	//document.head.title = product.metaTitle ?? "Product Details";
	return (
		<div className="span9">
			{/* <MetaTags>
				<title>{product.metaTitle ?? "Product Details"}</title>
			</MetaTags> */}
			<ul className="breadcrumb">
				<li><a href={baseSiteUrl}>Accueil</a></li>
				{/* <li><a href={baseSiteUrl+`/products`}>Produits</a> <span className="divider">/</span></li>
				<li className="active"> Details produit</li> */}
				{product.categories && product.categories.map((c,i)=>(
					<li><span className="divider">{divider}</span><a href={`${baseSiteUrl}/products/${c.id}`}>{c.name}</a></li>
				))}
			</ul>
			<div className="row">
				<div id="" className="span3">
					{product.images && index > -1 && <a onClick={(e)=>setIsOpen(!isOpen)} title={product.name}>
						<img src={product.images[index]} className="medium-image" alt={product.name}/>
					</a>}
					<div id="differentview" className="moreOptopm carousel slide">
						<div className="carousel-inner">
							<div className='item active'>
								{product.images && product.images.map((img,i)=>(
									<a key={i} onClick={(e)=>selectImage(i)}><img className="short-image" src={img} alt=""/></a>
								))}
							</div>
						</div>
					</div>
					{/* <div className="btn-toolbar">
						<div className="btn-group">
							<span className="btn"><i className="icon-envelope"></i></span>
							<span className="btn"><i className="icon-print"></i></span>
							<span className="btn"><i className="icon-zoom-in"></i></span>
							<span className="btn"><i className="icon-star"></i></span>
							<span className="btn"><i className=" icon-thumbs-up"></i></span>
							<span className="btn"><i className="icon-thumbs-down"></i></span>
						</div>
					</div> */}
				</div>
				<div className="span6">
					<h3>{product.name}</h3>
					<div>{ReactHtmlParser(product.description)}</div>
					<hr className="soft"/>
					<form className="form-horizontal qtyFrm">
						<div className="control-group">
							<label className="control-label"><span>{product.newPrice} Dhs</span></label>
							<div className="controls">
							{/* {(item && item.qty > 0) && (<div className="">
								<button
								className="btn btn-primary"
								onClick={() => {
									dispatch(decProductQty(item));
								}}
								>
								-
								</button>
								<span className="px-2">{item.qty}</span>
								<button
								className="btn btn-primary"
								onClick={() => {
									if (product.quantity > item.qty) {
									dispatch(incProductQty(item));
									}
								}}
								>
								+
								</button>
								</div>)} */}
								
								{ReactHtmlParser("</br>")}
								{!!item?.qty && <input type="number"
									value={item.qty}
									className="span1"
									placeholder="Qty."
									onChange={handleChangeQty}
								/>}
								{(isEmpty(item) && product.quantity > 0) ? <button onClick={addItemCart} className="btn btn-large btn-primary pull-right"> Ajouter au panier <i className=" icon-shopping-cart"></i></button> 
								: (product.quantity < 1) ? <button disabled className="btn btn-large btn-primary pull-right"> Ajouter au panier <i className=" icon-shopping-cart"></i></button>
								: (<div className="pull-right mx-3"><button onClick={()=>dispatch(removeProductInCart(product.slug))} className="btn btn-large btn-primary "> Annuler  </button>
								<a href={`${baseSiteUrl}/cart`} className="btn btn-large btn-danger mx-3"> Acheter <i className=" icon-shopping-cart"></i></a></div>)}
							</div>
						</div>
					</form>
					<hr className="soft"/>
					{product.quantity > 0 ? <h4>{product.quantity} articles en stock</h4>
					: <h4 style={{color:"red"}} className="text-danger">indisponible pour le moment</h4>}
					
					{/* <form className="form-horizontal qtyFrm pull-right">
					<div className="control-group">
						<label className="control-label"><span>Color</span></label>
						<div className="controls">
						<select className="span2">
							<option>Black</option>
							<option>Red</option>
							<option>Blue</option>
							<option>Brown</option>
							</select>
						</div>
					</div>
					</form> */}
					{!!product.details && <hr className="soft clr"/>}
					{!!product.details && ReactHtmlParser(product.details)}
					{/* <a className="btn btn-small pull-right" href="#detail">More Details</a>
					<br className="clr"/>
					<a href="#" name="detail"></a>
					<hr className="soft"/> */}
				</div>
				<h3><Link to="/Products" className="btn btn-large pull-right my-3"><i className="icon-arrow-left"></i> Continuer vos achats </Link></h3>
				<div className="span9">
					<ul id="productDetail" className="nav nav-tabs">
						<li className="active"><a href="#home" data-toggle="tab">Details Produit</a></li>
						<li><a href="#profile" data-toggle="tab">Produits connexe</a></li>
					</ul>
					<div id="myTabContent" className="tab-content">
						<div className="tab-pane fade active in" id="home">
						<h4>Informations de produit</h4>
						<table className="table table-bordered">
							<tbody>
								{/* <tr className="techSpecRow"><th colSpan="2">Product Details</th></tr> */}
								{properties.map((p,i)=> !product[p] ? undefined : (
									<tr key={i} className="techSpecRow"><td className="techSpecTD1">{titles[i]}: </td><td className="techSpecTD2">{ReactHtmlParser(product[p])}</td></tr>
								))}
							{/* <tr className="techSpecRow"><td className="techSpecTD1">Brand: </td><td className="techSpecTD2">Fujifilm</td></tr>
							<tr className="techSpecRow"><td className="techSpecTD1">Model:</td><td className="techSpecTD2">FinePix S2950HD</td></tr>
							<tr className="techSpecRow"><td className="techSpecTD1">Released on:</td><td className="techSpecTD2"> 2011-01-28</td></tr>
							<tr className="techSpecRow"><td className="techSpecTD1">Dimensions:</td><td className="techSpecTD2"> 5.50" h x 5.50" w x 2.00" l, .75 pounds</td></tr>
							<tr className="techSpecRow"><td className="techSpecTD1">Display size:</td><td className="techSpecTD2">3</td></tr> */}
							</tbody>
						</table>
						{!!product.specification ? <h5>Spécification</h5> : ''}
						{!!product.specification ? ReactHtmlParser(product.specification) : ''}
						</div>
						<div className="tab-pane fade" id="profile">
							<div id="myTab" className="pull-right">
							<a href="#listView" onClick={()=>setIsListView(true)} data-toggle="tab"><span className={`btn btn-large ${isListView ? "btn-primary":""}`}><i className="icon-list"></i></span></a>
							<a href="#blockView" onClick={()=>setIsListView(false)} data-toggle="tab"><span className={`btn btn-large ${!isListView ? "btn-primary":""}`}><i className="icon-th-large"></i></span></a>
							</div>
							<br className="clr"/>
							<hr className="soft"/>
							<div className="tab-content">
								<div className="tab-pane" id="listView">
									{releatedProducts.map((product,i)=>(
										<div key={i}>
											<div className="row">	  
												<Link onClick={()=>window.scrollTo(0,0)} to={`/product/${product.slug}`} className="span2">
													<img src={urlImage(product.image,product)} alt=""/>
												</Link>
												<div className="span4">
													<h3>{product.shortName}</h3>				
													<hr className="soft"/>
													<h5>{product.name}</h5>
													<Link className="btn btn-small pull-right" onClick={()=>window.scrollTo(0,0)} to={`/product/${product.slug}`}>View Details</Link>
													<br className="clr"/>
												</div>
												<div className="span3 alignR">
													<form className="form-horizontal qtyFrm">
														{/* <label className="checkbox">
															<input type="checkbox"/>  Adds product to compair
														</label> */}
														<br/>
														<div className="btn-group">
															<Link onClick={()=>window.scrollTo(0,0)} to={"/product/"+product.slug} className="btn btn-large btn-primary"> <i className=" icon-shopping-cart"></i> {product.newPrice} Dhs</Link>
															{/* <a href="" className="btn btn-large"><i className="icon-zoom-in"></i></a> */}
														</div>
													</form>
												</div>
											</div>
											<hr className="soft"/>
										</div>
									))}
								</div>
								<div className="tab-pane active" id="blockView">
									<ul className="thumbnails">
									{releatedProducts.map((product,i)=>(
										<li key={i} className="span3">
											<div title={product.name} className="thumbnail">
												<Link onClick={()=>window.scrollTo(0,0)} to={`/product/${product.slug}`}><img src={urlImage(product.image,product)} alt=""/></Link>
												<div className="caption">
													<h5>{product.shortName}</h5>
													<h4> <button className="btn btn-primary"> <i className="icon-shopping-cart"></i> {product.newPrice} Dh</button></h4>
												</div>
											</div>
										</li>
									))}
									</ul>
									<hr className="soft"/>
								</div>
							</div>
							<br className="clr"/>
						</div>
					</div>
				</div>
			</div>
			<ModalImages
				images={product.images}
				isOpen={isOpen}
				toggle={toggle}
				index={index}
				setIndex={setIndex}
			/>
		</div>
	)
}

export default ProductDetails;
