import axios from "axios";
import React from "react";
import { Component } from "react";
import { Toast } from "react-bootstrap";

export default class Body_Cart extends Component{

    state={
        cart:[],
        total:0,
        toast:"",
        show:false,
        empty:""
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

            this.props.get_item_total(this.state.total);
        }else{
            this.setState({empty: "Your cart is empty now"});
        }
    }

    inc(id){
        let store = localStorage.getItem("cart");
        let total = this.state.total;
        if(store!=null){
            let cart = JSON.parse(store);
            cart.forEach(book => {
                if(book.id == id){
                    if(book.quantity+1 <=8){
                        book.quantity+=1;
                        total+=Number(book.price);
                    }
                }
            });
            this.setState({
                cart,
                total
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            this.props.get_item_total(this.state.total);
        }
    }

    dec(id){
        let store = localStorage.getItem("cart");
        let total = this.state.total;
        if(store!=null){
            let cart = JSON.parse(store);
            cart.forEach(book => {
                if(book.id == id){
                    if(book.quantity-1 >=0){
                        book.quantity-=1;
                        total-=Number(book.price);
                    }
                }
            });
            this.setState({
                cart,
                total
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            this.props.get_item_total(this.state.total);
        }
    }

    place_order(){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        let order={
            "order_date": dateTime,
            "order_amount": this.props.quantity_item,
            "list":this.state.cart
        }
        axios.post("/api/Order", order)
        .then((response)=>{
            this.setState({
                toast:response.data,
                show:true,
                cart:[],
                total:0,
                empty: "Your cart is empty now"
            })    
            localStorage.removeItem("cart");
            this.props.get_item_total(this.state.total);
        })
        .catch((error)=>{console.log(error)});
    }

    render(){
        return(
            <div className="row body-shop">
                <div className="col-lg-8 col-md-12"> 
                    <Toast className={"mt-2 bg-info"} show={this.state.show} onClose={()=>{this.setState({show:false})}}>
                        <Toast.Header>
                            <strong className="me-auto">BookWorm</strong>
                        </Toast.Header>
                        <Toast.Body>{this.state.toast}</Toast.Body>
                    </Toast>    
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
                                            <button className="add-to-cart-action" onClick={()=>this.dec(book.id)}>-</button>
                                            <input className="add-to-cart-number" type="text" value={book.quantity}/>
                                            <button className="add-to-cart-action" onClick={()=>this.inc(book.id)}>+</button>
                                        </div>
                                    </td>
                                    <td>
                                        ${Math.round(book.quantity * Number(book.price)*100)/100}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="empty-cart">{this.state.empty}</h3>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="total-cart">
                        <h5>Cart Totals</h5>
                        <h3>${Math.round(this.state.total*100)/100}</h3>
                        <button className="add-to-card-submit" type="submit" onClick={()=>this.place_order()}><h5>Place order</h5></button>
                    </div>
                </div>
            </div>
        )
    }
}
