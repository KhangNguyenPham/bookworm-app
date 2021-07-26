import { combineReducers } from "redux";
import { ADD, DECREASE, GET_TOTAL_ITEM, INCREASE, ORDER } from "../action";

const init={
    total_item = 0
}

function get_total(state = init, action){
    switch(action.type){
        case GET_TOTAL_ITEM:
            return{
                ...state
            }
        case INCREASE:
            return{
                ...state
            }
        case DECREASE:
            return{
                ...state
            }
        case ADD:
            return{
                ...state
            }
        case ORDER:
            return{
                ...state
            }
        default:
            return state;
    }
}

const cart = combineReducers({
    _get_total:get_total
});

export default cart;