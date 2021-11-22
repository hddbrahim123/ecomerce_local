import { TOGGLE_LEFT_MENU } from "./ActionTypes";

const INIT_STATE = {
    leftMenu: true
}

const layoutReducer = (state = INIT_STATE , action)=>{
    switch (action.type) {
        case TOGGLE_LEFT_MENU:
            
            return{
                ...state,
                leftMenu:action.payload
            }
    
        default:
            return state;
    }
}

export default layoutReducer