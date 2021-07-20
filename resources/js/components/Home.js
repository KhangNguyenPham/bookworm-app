import React from "react";
import Carousel from "./Carousel";
import Featured_Books from "./Featured_Books";

function Home(){
    return(
        <>
            <div className="row home-header">
                <div className="col">
                    <h4>On Sale</h4>
                </div>
                <div className="col">
                    <button className="btn btn-secondary view-all">View All</button>
                </div>
            </div>
            <Carousel />
            <Featured_Books />
        </>
    )
}

export default Home;