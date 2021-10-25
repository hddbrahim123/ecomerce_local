
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetChildrenCategory } from "../../Core/ApiCore/Category";

function Header2({totalQty,solde}) {
	
	const [parentCategories, setParentCategories] = useState([])
	let welcome = '';
	let client = '';

	const [filter, setFilter] = useState({
		search:'',
		categoryId:undefined
	})

	const handleChangeFilter = (e) =>{
		let value = e.target.id === 'categoryId' ? e.target.value === '' ? undefined : e.target.value : e.target.value;
		setFilter({...filter, [e.target.id]: value})
	}

	useEffect(() => {
		GetChildrenCategory('', true, true)
		.then((res) => {
				if (res && res.length) {
					setParentCategories(res);
				}else{
					setParentCategories([]);
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
						<Link to='/cart' className="btn btn-mini">{solde} Dhs</Link>
						<span> </span>
						<Link to='/cart' ><span className="btn btn-mini btn-primary"><i className="icon-shopping-cart icon-white"></i> [ {totalQty} ] Itemes in your cart </span> </Link> 
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
				<Link className="brand" to="/"><img src="images/logo.png" alt="Bootsshop"/></Link>
					<form className="form-inline navbar-search" method="post" onSubmit={(e)=>e.preventDefault()} >
					<input id="search" value={filter.search} onChange={handleChangeFilter} className="" type="text" />
					<select value={filter.categoryId} onChange={handleChangeFilter} className="srchTxt">
						<option>All</option>
						{parentCategories.map((category,i) => 
							(<option key={i} value={category.id}>{category.name}</option>))}
					</select> 
					<button type="submit" id="submitButton" className="btn btn-primary">Go</button>
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
