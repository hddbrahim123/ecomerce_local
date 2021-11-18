
import 
{ 
    REMOVE_PRODUCT_IN_CART,
    ADD_ITEM_TO_CART,
    SET_PRODUCT_QTY,
    DEC_PRODUCT_QTY,
    INC_PRODUCT_QTY,
    EMPTY_CART
} 
from "./actionTypes"

export const addToCart = (item)=>{

    let items = JSON.parse(localStorage.getItem('cart')) || []
    let index = items.findIndex(e=>e.slug === item.slug)
    if (index === -1) {
        //items = uniqBy([{...item , qty:1} , ...items],'slug')
        items = [...items, {...item, qty: parseInt(item.qty)}];
        localStorage.setItem('cart', JSON.stringify(items))
    }else{
        items = items.filter(p => {return {...p, qty:p.qty}});
    }
    return{
        type:ADD_ITEM_TO_CART,
        payload:items
    }
}

export const setProductQty = (item, qty)=>{
    if(qty > -1){
        let items = JSON.parse(localStorage.getItem('cart')) || []

        items = items.map(product=> (product.slug === item.slug ? {...product , qty: parseInt(qty) } : product))
        
        localStorage.setItem('cart', JSON.stringify(items))

        return{
            type: SET_PRODUCT_QTY,
            payload:items
        }
    }
    return{
        type:null
    }
}

export const incProductQty = (item)=>{
    let items = JSON.parse(localStorage.getItem('cart')) || []

    items = items.map(product=> (product.slug === item.slug ? {...item , qty:parseInt(product.qty) +1 } : product))

    localStorage.setItem('cart', JSON.stringify(items))

    return{
        type: INC_PRODUCT_QTY,
        payload:items
    }
}

export const decProductQty = (item)=>{
    if(item.qty > 1){
        let items = JSON.parse(localStorage.getItem('cart')) || []

        items = items.map(product=> (product.slug === item.slug ? {...item , qty:parseInt(product.qty) -1 } : product))
        
        localStorage.setItem('cart', JSON.stringify(items))

        return{
            type: DEC_PRODUCT_QTY,
            payload:items
        }
    }
    return{
        type:null
    }
}

export const removeProductInCart = (slug)=>{

        let items = JSON.parse(localStorage.getItem('cart')) || []

        items = items.filter(product => (product.slug !== slug ))
        
        localStorage.setItem('cart', JSON.stringify(items))

        return{
            type: REMOVE_PRODUCT_IN_CART,
            payload:items
        }
}


export const emptyCart = ()=>{

    localStorage.setItem('cart', JSON.stringify([]))

    return{
        type: EMPTY_CART,
        payload:[]
    }
}