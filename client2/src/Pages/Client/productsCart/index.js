import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import {
    removeProductInCart,
    incProductQty,
    decProductQty,
    setProductQty
} from "../../../store/action";
import dictionary from "../../../Core/dictionary";
import { createOrder } from "../../../Core/ApiCore/Order";

const ProductsCart = (props) => {
    const [language] = useState(localStorage.getItem("language") ?? dictionary.defaultLanguage);
    const products = useSelector((state) => state.Cart.products);
    const totalDiscount = useSelector((state) => state.Cart.totalDiscount);
    const totalPrice = useSelector((state) => state.Cart.totalPrice);
    const totalQty = useSelector((state) => state.Cart.totalQty);

    const content = dictionary.orderContent[language];
    const messages = dictionary.messages[language];
    
    const [order, setOrder] = useState({
        fullName: "",
        phone: "",
        address: "",
        ordersNote: "",
    });
    
    const handleOrder = (e) =>
    setOrder({ ...order, [e.target.id]: e.target.value });

    const increment = (itemCart)=>{
        dispatch(incProductQty(itemCart))
    }

    const decrement = (itemCart)=>{
        dispatch(decProductQty(itemCart))
    }

    const remove = (itemCart)=>{
        dispatch(removeProductInCart(itemCart.slug))
    }

    const changeQty = (e,itemCart)=>{
        let qty = e.target.value;
        if (qty > 0) {
            dispatch(setProductQty(itemCart,qty))
        }
    }

    const submitOrder = (e) => {
        e.preventDefault();
        order.totalAmount = totalPrice;
        order.items = products;
        order.totalQty = totalQty;
        console.log(order);
        if (!order.fullName) {
            toastr.error(messages.ordreFullNameRequired, messages.checkForm);
            return;
        } else if (!order.phone) {
            toastr.error(messages.ordrePhoneRequired, messages.checkForm);
            return;
        } else {
            createOrder(order).then((res) => {
                if (res.success) {
                    toastr.options.progressBar = true;
                    toastr.success(messages.ordreCreateSuccess, "");
                    localStorage.removeItem("cart");
                    // props.history.push("/products");
                } else {
                    toastr.options.progressBar = true;
                    toastr.error(messages.ordreCreateError, messages.checkForm);
                }
            });
        }
    };
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    useEffect(() => {

    }, []);
    return (
    <div className="span9">
        <ul className="breadcrumb">
            <li><a href="/">Accueil</a> <span className="divider">/</span></li>
            <li className="active"> Panier</li>
        </ul>
        <h3>  Panier [ <small>{totalQty} Produits(s) </small>]<Link to="/Products" className="btn btn-large pull-right"><i className="icon-arrow-left"></i> Continuer vos achats </Link></h3>
        <hr className="soft"/>
        {/* <table className="table table-bordered">
            <tbody>
                <tr><th> I AM ALREADY REGISTERED  </th></tr>
                <tr>
                    <td>
                        <form className="form-horizontal">
                            <div className="control-group">
                                <label className="control-label" htmlFor="inputUsername">Username</label>
                                <div className="controls">
                                    <input type="text" id="inputUsername" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="inputPassword1">Password</label>
                                <div className="controls">
                                    <input type="password" id="inputPassword1" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="controls">
                                    <button type="submit" className="btn">Sign in</button> OR <a href="register.html" className="btn">Register Now!</a>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="controls">
                                    <a href="forgetpass.html" style={{textDecoration:"underline"}}>Forgot password ?</a>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table> */}
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                    <th>Remise</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,i)=> (
                    <tr key={i}>
                        <td><Link to={"/product/"+product.slug}><img width="60" src={!isEmpty(product.images)?product.images[0]:""} alt=""/></Link></td>
                        <td>{product.name}</td>
                        <td>
                        <div className="input-append"><input value={product.qty} onChange={(e)=>changeQty(e,product)} className="span1" style={{maxWidth:"34px"}} placeholder="1" id="appendedInputButtons" size="16" type="text"/><button className="btn" type="button" onClick={()=>decrement(product)}><i className="icon-minus"></i></button><button className="btn" type="button" onClick={()=>increment(product)}><i className="icon-plus"></i></button><button className="btn btn-danger" type="button" onClick={()=>remove(product)}><i className="icon-remove icon-white"></i></button>				</div>
                        </td>
                        <td>{!!product.oldPrice ? product.oldPrice +" Dhs": !!product.newPrice ? product.newPrice +" Dhs" : "" }</td>
                        <td>{(!!product.oldPrice && !!product.newPrice)? `${(product.oldPrice - product.newPrice)} Dhs` : ""}</td>
                        <td>{(!!product.qty && !!product.newPrice)?product.newPrice * product.qty + " Dhs":""}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="5" style={{textAlign:"right"}}>Total Price:	</td>
                    <td> {totalPrice} Dhs</td>
                </tr>
                <tr>
                    <td colSpan="5" style={{textAlign:"right"}}>Total Remise:	</td>
                    <td> {!!totalDiscount ? totalDiscount + " Dhs":""}</td>
                </tr>
                <tr>
                    <td colSpan="5" style={{textAlign:"right"}}><strong>TOTAL ({totalPrice} - {totalDiscount??0} Dhs) =</strong></td>
                    <td className="label label-important" style={{display:"block"}}> <strong> {totalPrice - (totalDiscount??0)} Dhs</strong></td>
                </tr>
            </tbody>
        </table>


        {/* <table className="table table-bordered">
            <tbody>
                <tr>
                    <td>
                        <form className="form-horizontal">
                            <div className="control-group">
                                <label className="control-label"><strong> VOUCHERS CODE: </strong> </label>
                                <div className="controls">
                                    <input type="text" className="input-medium" placeholder="CODE"/>
                                    <button type="submit" className="btn"> ADD </button>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table> */}

        <table className="table table-bordered">
            <tbody>
                <tr><th>ESTIMEZ VOTRE LIVRAISON </th></tr>
                <tr>
                    <td>
                        <form className="form-horizontal">
                            <div className="control-group">
                                <label className="control-label" htmlFor="fullName">{content.labelFullName}</label>
                                <div className="controls">
                                    <input type="text" 
                                        id="fullName"
                                        className="form-control"
                                        placeholder={content.placeHolderEnterFullName}
                                        value={order.fullName}
                                        onChange={handleOrder}
                                        />
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="phone">{content.labelPhone}</label>
                                <div className="controls">
                                    <input type="text" 
                                        id="phone"
                                        className="form-control"
                                        placeholder={content.labelPlaceHolderPhone}
                                        value={order.phone}
                                        onChange={handleOrder}
                                        />
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="address">{content.labelAddress}</label>
                                <div className="controls">
                                    <textarea 
                                        id="address"
                                        className="form-control"
                                        rows="3"
                                        placeholder={content.labelPlaceHolderAddress}
                                        value={order.address}
                                        onChange={handleOrder}
                                        />
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="ordersNote">{content.labelOrderNotes}</label>
                                <div className="controls">
                                    <textarea id="ordersNote"
                                        className="form-control"
                                        rows="3"
                                        placeholder={content.placeHolderOrderNote}
                                        value={order.ordersNote}
                                        onChange={handleOrder}
                                        />
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="controls">
                                    <button onClick={submitOrder} className="btn" disabled={isEmpty(products)}>Acheter</button>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
        <Link to="/Products" className="btn btn-large"><i className="icon-arrow-left"></i> Continuer vos achats </Link>
        {/* <button onClick={toggleModal} className="btn btn-large pull-right">Acheter</button> */}
        {/* <CreateOrderModal
            language={language}
            isOpen={modal}
            toggle={toggleModal}
        /> */}
    </div>
);
};

export default ProductsCart;
