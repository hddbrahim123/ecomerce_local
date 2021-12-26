
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, GetChildrenCategory } from "../../Core/ApiCore/Category";

function Header2(props) {
	const {totalQty,solde} = props;
	const baseSiteUrl = window.location.origin.toString() + "/#";
	const [categories, setCategories] = useState([])
	let welcome = '';
	let client = '';

	const [filter, setFilter] = useState({
		search:'',
		categoryId:undefined
	})

	const handleChangeFilter = (e) => {
		if (e.target.id === 'search') {
			setFilter({...filter, 'search': e.target.value})
		} else {
			let value = e.target.value === '' ? undefined : e.target.value;
			setFilter({...filter, 'categoryId': value})
		}
		// let value = e.target.id === 'categoryId' ? e.target.value === '' ? undefined : e.target.value : e.target.value;
		// setFilter({...filter, [e.target.id]: value})
	}
	const goToProducts = () => {
		window.location=(baseSiteUrl+`/products/${filter.categoryId??0}/${filter.search.replaceAll(' ','_')}`);
		window.location.reload();
	}
	useEffect(() => {
		let url = decodeURIComponent(window.location.hash).split('/');
		
		//console.log(window.location);
		if (url.length == 4) {
			setFilter({...filter, categoryId: url[2], search: url[3]?.replaceAll('_',' ')?.replaceAll('%20',' ')})
		}
		getCategories(true, true)
		.then((res) => {
				if (res && res.length) {
					setCategories(res);
				}else{
					setCategories([]);
				}
			})
	}, [])
	
	return (
	<div id="header">
		<div className="container">
			<div id="welcomeLine" className="row">
				<div className="span6">{welcome}<strong> {client}</strong></div>
				<div className="span6">
					<div className="pull-right">
						{/* <a href="product_summary.html"><span className="">Fr</span></a>
						<a href="product_summary.html"><span className="">Es</span></a>
						<span className="btn btn-mini">En</span>
						<a href="product_summary.html"><span>&pound;</span></a> */}
						<a href={`${baseSiteUrl}/cart`} className="btn btn-mini">{solde} Dhs</a>
						<span> </span>
						<a href={`${baseSiteUrl}/cart`} ><span className="btn btn-mini btn-primary"><i className="icon-shopping-cart icon-white"></i> [ {totalQty} ] Articles en panier </span> </a> 
					</div>
				</div>
			</div>
			<div id="logoArea" className="navbar">
			<a id="smallScreen" data-target="#topMenu" data-toggle="collapse" className="btn btn-navbar">
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</a>
			<div className="navbar-inner">
				<a className="brand" href={`${baseSiteUrl}`}><img src="images/logo.png" alt="Bootsshop"/></a>
					<form className="form-inline navbar-search" method="post" onSubmit={(e)=>e.preventDefault()} >
					<input id="search" value={filter.search} onChange={handleChangeFilter} className="" type="text" />
					<select id="categoryId" value={filter.categoryId} onChange={handleChangeFilter} className="srchTxt">
						<option value="0">Tous</option>
						{categories.map((cat,i) => 
						(
							<optgroup key={i} value={cat.id} label={`${cat.name}`}>
								<option key={i} value={cat.id}>{cat.name}</option>
								{cat.children && cat.children.map((child,j)=>(
									<option key={j} value={child.id}>{child.name}</option>
								))}
							</optgroup>
						))}
					</select> 
					<button onClick={goToProducts} className="btn btn-primary">Rechercher</button>
					</form>
					{/* <ul id="topMenu" className="nav pull-right">
						<li className=""><a href="special_offer.html">Specials Offer</a></li>
						<li className=""><a href="normal.html">Delivery</a></li>
						<li className=""><a href="contact.html">Contact</a></li>
						<li className="">
						<a href="#login" role="button" data-toggle="modal" style={{paddingRight:"0"}}><span className="btn btn-large btn-success">Login</span></a>
							<div id="login" className="modal hide fade in" tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
									<h3>Login Block</h3>
								</div>
								<div className="modal-body">
									<form className="form-horizontal loginFrm">
									<div className="control-group">								
										<input type="text" id="inputEmail" placeholder="Email"/>
									</div>
									<div className="control-group">
										<input type="password" id="inputPassword" placeholder="Password"/>
									</div>
									<div className="control-group">
										<label className="checkbox">
										<input type="checkbox"/> Remember me
										</label>
									</div>
									</form>		
									<button type="submit" className="btn btn-success">Sign in</button>
									<button className="btn" data-dismiss="modal" aria-hidden="true">Close</button>
								</div>
							</div>
						</li>
					</ul> */}
				</div>
			</div>
		</div>
	</div>
    );
}

export default Header2;
