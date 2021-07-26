import React from "react";
import { Component } from "react";
import Body_Cart from "./Body_Cart";
export default class Cart extends Component{
    state={
        item:0
    }

    componentDidMount(){
        let store = localStorage.getItem("cart")
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
            this.setState({item:cart.length})
        }else{
            this.setState({item:0});
        }
    }

    get_item_total_from_child = (total) =>{
        this.setState({item:total});
        this.props.get_total_from_nav(this.state.total);
    }

    render(){
        return(
            <div>
                <h4 className="header-shop">Your cart: {this.state.item} items</h4>
                <hr className="hr-about-us"/>
                <Body_Cart quantity_item={this.state.item} get_item_total={this.get_item_total_from_child} />
            </div>
        )
    }
}
