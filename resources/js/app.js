/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

//require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');
import React from "react";
import ReactDOM  from "react-dom";
import NavBar from "./components/NavBar";
import Footer  from "./components/Footer";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import { Component } from "react";

export default class App extends Component{
    
    state={
        item:0
    }

    get_item_total_from_child = (total) =>{
        this.setState({item:total});
    }

    render(){
        return(
            <>
             <Router>
                 <NavBar item={this.state.item} />
                 <Switch>
                     <Route exact path="/">
                         <Home />
                     </Route>
     
                     <Route path="/Shop">
                         <Shop />
                     </Route>
     
                     <Route path="/Product/:id">
                         <Product />
                     </Route>
     
                     <Route path="/Cart">
                         <Cart get_total_from_nav={this.get_item_total_from_child}/>
                     </Route>
     
                     <Route path="/About">
                         <About />
                     </Route>
                 </Switch>    
                 <Footer />
             </Router>
            </>
         );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

