import { combineReducers } from "redux";
import layoutReducer from "./layout/reducers";
import Cart from "./cart/reducer"

const rootReducer = combineReducers({
    Layout: layoutReducer,
    Cart: Cart
})

export default rootReducer