import { combineReducers } from "redux";
import layoutReducer from "./layout/reducers";

const rootReducer = combineReducers({
    Layout: layoutReducer
})

export default rootReducer