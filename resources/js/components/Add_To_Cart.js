import React from "react";
import axios from "axios";
import { Component } from "react";

export default class Add_To_Cart extends Component{

    state = {
        book_price:"",
        discount_price:""
    }

    componentDidMount(){
        let url = "/api/Book/" + this.props.book_id;
        axios.get(url).then(response => {
            const book_price = response.data[0].book_price;
            const discount_price = response.data[0].discount_price;
            this.setState({book_price});
            this.setState({discount_price});
        }).catch(error => console.log(error));
    }

    render(){
        return(
            <div className="add-to-cart">
                <form className="add-to-cart-form">
                    <div className="input-group-text">
                        <h4>
                            <del>
                                {(this.state.discount_price != null ? "$" + this.state.book_price : "")} 
                            </del>
                        {(this.state.discount_price != null ? " $" + this.state.discount_price : " $" + this.state.book_price)}
                        </h4>
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
}