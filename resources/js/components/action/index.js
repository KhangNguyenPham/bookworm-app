export const GET_TOTAL_ITEM = "GET_TOTAL_ITEM";
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const ADD = "ADD";
export const ORDER = "ORDER";

export function get_total_item(){
    return{
        type: "GET_TOTAL_ITEM"
    }
} 

export function increase(){
    return{
        type: "INCREASE"
    }
} 

export function decrease(){
    return{
        type: "DECREASE"
    }
} 

export function add(){
    return{
        type: "ADD"
    }
} 

export function order(){
    return{
        type: "ORDER"
    }
} 