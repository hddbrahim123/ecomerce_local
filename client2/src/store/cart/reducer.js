
import 
{ 
    ADD_ITEM_TO_CART,
    SET_PRODUCT_QTY,
    DEC_PRODUCT_QTY,
    INC_PRODUCT_QTY,
    REMOVE_PRODUCT_IN_CART
} 
from "./actionTypes"

const products = JSON.parse(localStorage.getItem('cart')) || []

const INIT_STATE = {
    products: products,
    totalQty:products.reduce((total,product)=>  total + product.qty, 0),
    solde:products.reduce((solde,product)=>  solde + product.newPrice, 0),
    totalPrice: products.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty ? product.qty* product.newPrice : 0), 0)
}

const cart = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return{
                ...state,
                products:action.payload,
                totalQty:action.payload.reduce((total,product)=> total + (!!product.newPrice && !!product.qty) ? product.qty : 0 , 0),
                solde:action.payload.reduce((solde,product)=>  solde + (!!product.newPrice && !!product.qty) ? product.newPrice : 0, 0),
                totalPrice: action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty ? product.qty * product.newPrice : 0), 0),
                totalDiscount:action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty && !!product.oldPrice ? product.oldPrice - product.newPrice : 0), 0)
            }
        case SET_PRODUCT_QTY:
            return{
                ...state,
                products:action.payload,
                totalQty:action.payload.reduce((total,product)=> total + (!!product.newPrice && !!product.qty) ? product.qty : 0 , 0),
                solde:action.payload.reduce((solde,product)=>  solde + (!!product.newPrice && !!product.qty) ? product.newPrice : 0, 0),
                totalPrice: action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty ? product.qty * product.newPrice : 0), 0),
                totalDiscount:action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty && !!product.oldPrice ? product.oldPrice - product.newPrice : 0), 0)
            }
        case INC_PRODUCT_QTY:
            return{
                ...state,
                products:action.payload,
                totalQty:action.payload.reduce((total,product)=> total + (!!product.newPrice && !!product.qty) ? product.qty : 0 , 0),
                solde:action.payload.reduce((solde,product)=>  solde + (!!product.newPrice && !!product.qty) ? product.newPrice : 0, 0),
                totalPrice: action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty ? product.qty * product.newPrice : 0), 0),
                totalDiscount:action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty && !!product.oldPrice ? product.oldPrice - product.newPrice : 0), 0)
            }
        case DEC_PRODUCT_QTY:
            return{
                ...state,
                products:action.payload,
                totalQty:action.payload.reduce((total,product)=> total + (!!product.newPrice && !!product.qty) ? product.qty : 0 , 0),
                solde:action.payload.reduce((solde,product)=>  solde + (!!product.newPrice && !!product.qty) ? product.newPrice : 0, 0),
                totalPrice: action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty ? product.qty * product.newPrice : 0), 0),
                totalDiscount:action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty && !!product.oldPrice ? product.oldPrice - product.newPrice : 0), 0)
            }    
        case REMOVE_PRODUCT_IN_CART:
            return{
                ...state,
                products:action.payload,
                totalQty:action.payload.reduce((total,product)=> total + (!!product.newPrice && !!product.qty) ? product.qty : 0 , 0),
                solde:action.payload.reduce((solde,product)=>  solde + (!!product.newPrice && !!product.qty) ? product.newPrice : 0, 0),
                totalPrice: action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty ? product.qty * product.newPrice : 0), 0),
                totalDiscount:action.payload.reduce((total,product)=>  total + (!!product.newPrice && !!product.qty && !!product.oldPrice ? product.oldPrice - product.newPrice : 0), 0)
            }
        default:{
            return state
        }
    }
}
export default cart