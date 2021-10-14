import {TOGGLE_LEFT_MENU} from './ActionTypes'


export const toggleLeftmenu = (isOpen)=>{
    return{
        type:TOGGLE_LEFT_MENU,
        payload:isOpen
    }
}

