import React, {useState} from "react";
import {Link} from "react-router-dom";
import navbar_logo from "../../assets/bookworm_icon.svg";

function NavBar(){
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
                        <li className="nav-item">
                            <Link to="/" className="nav-links">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Shop" className="nav-links">
                                Shop
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/About" className="nav-links">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Cart" className="nav-links">
                                Cart(0)
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar;
