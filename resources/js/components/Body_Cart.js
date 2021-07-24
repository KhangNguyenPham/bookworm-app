import axios from "axios";
import React from "react";
import { Component } from "react";
import Book_image from "../../assets/bookcover/book1.jpg";

export default class Body_Cart extends Component{

    state={
        books:[],
        book_price:"",
        discount_price:"",
        final_price:"",
        total:""
    }
    
    componentDidMount(){
        axios.get("api/Book/").then(response=>{
            this.setState({books:response.data});
        }).catch(error=>console.log(error));
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
                            {this.state.books.map((book)=>
                                <tr>
                                    <td>
                                        <div className="about-book">
                                            <img class="img-fluid img-thumbnail w-25" src={"images/" + book.book_cover_photo + ".jpg"}/>
                                            <div>
                                                <h5>{book.book_title}</h5>
                                                <p>{book.author_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        ${Math.round(this.state.final_price * localStorage.getItem(book.id) * 100)/100}
                                        <del>
                                            <br></br>
                                            {(this.state.discount_price != null ? "$" + this.state.book_price : "")} 
                                        </del>
                                    </td>
                                    <td>
                                        <div className="input-add-to-cart">
                                            <button className="add-to-cart-action">-</button>
                                            <input className="add-to-cart-number" type="text" value={localStorage.getItem(book.id)} />
                                            <button className="add-to-cart-action">+</button>
                                        </div>
                                    </td>
                                    <td>
                                        Total
                                    </td>
                                </tr>
                            )}
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
