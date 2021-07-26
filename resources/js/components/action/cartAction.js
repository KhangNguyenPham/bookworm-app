export const UPDATE_TOTAL_CART = "UPDATE_TOTAL_CART";

export function updateTotalCart(total){
    return{
        type: "UPDATE_TOTAL_CART",
        total
    }
} 