import React, {useState} from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import navbar_logo from "../../assets/bookworm_icon.svg";

export default class NavBar extends Component{

    state={
        choose:"home",
        cart:0
    }

    componentDidMount(){
        let cart = JSON.parse(localStorage.getItem("cart"));
        if(cart){
            this.setState({cart:cart.length});
        }else{
            this.setState({cart:0});
        }
    }

    choose(item){
        document.getElementById("home").style.textDecoration = "none";
        document.getElementById("shop").style.textDecoration = "none";
        document.getElementById("about").style.textDecoration = "none";
        document.getElementById("cart").style.textDecoration = "none";
        this.setState({choose:item});
        document.getElementById(item).style.textDecoration = "underline";
        console.log()
    }

    render(){
        return(
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-logo">
                        <img className="navbar-logo" src={navbar_logo}/>
                            BookWorm
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item" id="home" onClick={()=>this.choose("home")}>
                                <Link to="/" className="nav-links navhvr">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item" id="shop" onClick={()=>this.choose("shop")}>
                                <Link to="/Shop" className="nav-links navhvr">
                                    Shop
                                </Link>
                            </li>
                            <li className="nav-item" id="about" onClick={()=>this.choose("about")}>
                                <Link to="/About" className="nav-links navhvr">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item" id="cart" onClick={()=>this.choose("cart")}>
                                <Link to="/Cart" className="nav-links navhvr">
                                    Cart({this.state.cart})
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}
