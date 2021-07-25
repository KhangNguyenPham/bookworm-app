import axios from "axios";
import React from "react";
import { Component } from "react";

export default class Body_Cart extends Component{

    state={
        cart:[],
        total:0
    }
    
    componentDidMount(){
        let store = localStorage.getItem("cart");
        let total = 0;
        if(store!=null){
            let cart = JSON.parse(store);
            
            for(let i = 0; i < cart.length; i++){
                for(let j = i+1; j < cart.length; j++){
                    if(cart[i].id == cart[j].id){
                        cart[i].quantity = cart[i].quantity + cart[j].quantity;
                        cart[j] = "";
                    }
                }
            }
            cart = cart.filter(book => book != "");
            localStorage.setItem("cart", JSON.stringify(cart));
            
            cart.forEach(element => {
                total += Number(element.price) * element.quantity;
            });
            
            this.setState({
                cart,
                total
            });
        }
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
                                        ${Math.round(book.quantity * Number(book.price)*100)/100}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="total-cart">
                        <h5>Cart Totals</h5>
                        <h3>${Math.round(this.state.total*100)/100}</h3>
                        <button className="add-to-card-submit" type="submit"><h5>Place order</h5></button>
                    </div>
                </div>
            </div>
        )
    }
}
