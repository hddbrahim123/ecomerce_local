
import 
{ 
    ADD_ITEM_TO_CART,
    DEC_PRODUCT_QTY,
    INC_PRODUCT_QTY,
    REMOVE_PRODUCT_IN_CART
} 
from "./actionTypes"


const products = JSON.parse(localStorage.getItem('cart')) || []

const INIT_STATE = {
    products: products,
    count:products.reduce((total,product)=>  total + product.qty, 0)
}

const cart = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return{
                ...state,
                products:action.payload,
                count:action.payload.reduce((total,product)=> total + product.qty , 0)
            }
        case INC_PRODUCT_QTY:
            return{
                ...state,
                products:action.payload,
                count:action.payload.reduce((total,product)=> total + product.qty , 0)
            }
        case DEC_PRODUCT_QTY:
            return{
                ...state,
                products:action.payload,
                count:action.payload.reduce((total,product)=> total + product.qty , 0)
            }    
        case REMOVE_PRODUCT_IN_CART:
            return{
                ...state,
                products:action.payload,
                count:action.payload.reduce((total,product)=> total + product.qty , 0)
            }
        default:{
            return state
        }
    }
}
export default cart