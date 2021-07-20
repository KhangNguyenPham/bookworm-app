import React from "react";
import Book_image from "../../assets/bookcover/book1.jpg";

function Body_Cart(){
    return(
        <div className="row body-shop">
            <div className="col-8">      
                <table className="table table-image list-cart">
                    <thead>
                        <tr>
                            <th scop="col">Product</th>
                            <th scop="col">Price</th>
                            <th scop="col">Quanity</th>
                            <th scop="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="about-book">
                                    <img class="img-fluid img-thumbnail w-25" src={Book_image}/>
                                    <div>
                                        <h5>Book tite</h5>
                                        <p>Author Name</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                $29.99
                            </td>
                            <td>
                                <div className="input-add-to-cart">
                                    <button className="add-to-cart-action">-</button>
                                    <input className="add-to-cart-number" type="number" min="0" max="8"/>
                                    <button className="add-to-cart-action">+</button>
                                </div>
                            </td>
                            <td>
                                Total
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="about-book">
                                    <img class="img-fluid img-thumbnail w-25" src={Book_image}/>
                                    <div>
                                        <h5>Book tite</h5>
                                        <p>Author Name</p>
                                    </div>
                                </div>
                            </td>
                            <td>$29.99</td>
                            <td>
                                <div className="input-add-to-cart">
                                    <button className="add-to-cart-action">-</button>
                                    <input className="add-to-cart-number" type="number" min="0" max="8"/>
                                    <button className="add-to-cart-action">+</button>
                                </div>
                            </td>
                            <td>Total</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <div className="total-cart">
                    <h5>Cart Totals</h5>
                    <h3>$99.99</h3>
                    <button className="add-to-card-submit" type="submit"><h5>Place order</h5></button>
                </div>
            </div>
        </div>
    )
}

export default Body_Cart;