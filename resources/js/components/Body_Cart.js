import axios from "axios";
import React from "react";
import { Component } from "react";

export default class Body_Cart extends Component{

    state={
        cart:[],
        total:""
    }
    
    componentDidMount(){
        const cart = JSON.parse(localStorage.getItem("cart"));
        this.setState({cart});
    }

    render(){
        return(
            <div className="row body-shop">
                <div className="col-lg-8 col-md-12">     
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
                           
                            {this.state.cart == null ? "" : this.state.cart.map((book)=>
                                (
                                <tr>
                                    <td>
                                        <div className="about-book">
                                            <img class="img-fluid img-thumbnail w-25" src={"images/" + book.photo + ".jpg"}/>
                                            <div>
                                                <h5>{book.book_title}</h5>
                                                <p>{book.author_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        ${book.price}
                                        <del>
                                            <br></br> 
                                        </del>
                                    </td>
                                    <td>
                                        <div className="input-add-to-cart">
                                            <button className="add-to-cart-action">-</button>
                                            <input className="add-to-cart-number" type="text" value={book.quantity}/>
                                            <button className="add-to-cart-action">+</button>
                                        </div>
                                    </td>
                                    <td>
                                        {Math.round(book.quantity * Number(book.price)*100)/100}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="total-cart">
                        <h5>Cart Totals</h5>
                        <h3>$99.99</h3>
                        <button className="add-to-card-submit" type="submit"><h5>Place order</h5></button>
                    </div>
                </div>
            </div>
        )
    }
}
