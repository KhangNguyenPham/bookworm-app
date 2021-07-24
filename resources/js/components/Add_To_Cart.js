import React from "react";
import axios from "axios";
import { Component } from "react";

export default class Add_To_Cart extends Component{

    state = {
        book_price:"",
        discount_price:"",
        total:1,
        final_price:"",
    }

    componentDidMount(){
        let url = "/api/Book/" + this.props.book_id;
        axios.get(url).then(response => {
            const book_price = response.data[0].book_price;
            const discount_price = response.data[0].discount_price;
            let final_price = (discount_price != null ? discount_price : book_price);
            this.setState({
                book_price,
                discount_price,
                final_price
            });
        }).catch(error => console.log(error));
    }

    dec(){
        if(this.state.total==1){
            this.setState({total:1});
        }else{
            this.setState({total: this.state.total-1});
        }
    }

    inc(){
        if(this.state.total==8){
            this.setState({total:8});
        }else{
            this.setState({total: this.state.total+1});
        }
    }

    add_to_cart(){
        let url = "/api/Book/" + this.props.book_id;
        axios.get(url).then(response => {
            const book_price = response.data[0].book_price;
            const discount_price = response.data[0].discount_price;
            let final_price = (discount_price != null ? discount_price : book_price);
            this.setState({
                book_price,
                discount_price,
                final_price
            });
        }).catch(error => console.log(error));
        /*let in_cart = Number(localStorage.getItem(this.props.book_id)) + Number(this.state.total);
        if(in_cart <= 8){
            localStorage.setItem(this.props.book_id, Number(in_cart));
        }else{
            alert("No");
        }*/
        let cart = [];
        let book = {
                id: this.props.book_id,
                quantity: this.state.total
            }
        let in_cart = 0;
        let store = localStorage.getItem("cart");
        if(store){
            cart = JSON.parse(store);
            cart.forEach(element => {
                if(element.id == book.id){
                    in_cart+=element.quantity;
                }
            });
            if((book.quantity + in_cart) <= 8){
                cart.push(book);
            }else{
                alert("No");
            }                
            localStorage.setItem("cart", JSON.stringify(cart));
        }else{
            localStorage.setItem("cart","");
            cart.push(book);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        console.log(cart, book.quantity);
    }

    render(){
        return(
            <div className="add-to-cart">
                <div className="add-to-cart-form">
                    <div className="input-group-text">
                        <h4>
                            <del>
                                {(this.state.discount_price != null ? "$" + this.state.book_price : "")} 
                            </del>
                        ${Math.round(this.state.final_price * this.state.total * 100)/100}
                        </h4>
                    </div>
                    <div className="add-to-cart-box">
                        <small>Quanity</small>
                        <div className="input-add-to-cart">
                            <button onClick={()=>this.dec()} className="add-to-cart-action">-</button>
                            <input value={this.state.total} className="add-to-cart-number" type="text"/>
                            <button onClick={()=>this.inc()} className="add-to-cart-action">+</button>
                        </div>
                        <button className="add-to-card-submit" type="submit" onClick={()=> this.add_to_cart()}><h5>Add to cart</h5></button>
                    </div>
                </div>
            </div>
        )
    }
}