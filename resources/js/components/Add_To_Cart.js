import React from "react";

function Add_To_Cart(){
    return(
        <div className="add-to-cart">
            <form className="add-to-cart-form">
                <div className="input-group-text">
                    <h4>$29.99</h4>
                </div>
                <div className="add-to-cart-box">
                    <small>Quanity</small>
                    <div className="input-add-to-cart">
                        <button className="add-to-cart-action">-</button>
                        <input className="add-to-cart-number" type="number" min="0" max="8"/>
                        <button className="add-to-cart-action">+</button>
                    </div>
                    <button className="add-to-card-submit" type="submit"><h5>Add to cart</h5></button>
                </div>
            </form>
        </div>
    )
}

export default Add_To_Cart;