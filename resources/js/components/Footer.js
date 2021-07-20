import React from "react";
import Footer_logo from "../../assets/bookworm_icon.svg";

function Footer(){
    return(
        <>
            <footer>
                <div className="row">
                    <div className="col-1">
                        <img className="footer-logo" src={Footer_logo} />
                    </div>
                    <div className="col-11">
                        <h6>BOOKWORM</h6>
                        <sm>Address</sm>
                        <br/>
                        <sm>Phone</sm>
                    </div>  
                </div>
            </footer>
        </>
    )
}

export default Footer;