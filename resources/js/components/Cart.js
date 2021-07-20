import React from "react";
import Body_Cart from "./Body_Cart";

function Cart(){
    return(
        <div>
            <h4 className="header-shop">Your cart: 3 items</h4>
            <hr className="hr-about-us"/>
            <Body_Cart />
        </div>
    )
}

export default Cart;