import React from "react";
import Carousel2 from "./Carousel2";
import Featured_Books from "./Featured_Books";
import {Link} from "react-router-dom";

function Home(){
    return(
        <>
            <div className="row home-header">
                <div className="col">
                    <h4>On Sale</h4>
                </div>
                <div className="col">
                    <button className="btn btn-secondary view-all"><Link to="/Shop" className="text-white-color">View All</Link></button>
                </div>
            </div>
            <Carousel2 />
            <Featured_Books />
        </>
    )
}

export default Home;