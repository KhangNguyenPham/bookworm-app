import React from "react";
import {Link} from "react-router-dom";

function Customer_Review(){
    return(
        <div className="customer-review">
            <div>
                <h3>Customer Review <span>(Filtered by 5 stars)</span></h3>     
                <h2>4.6 Star</h2>
                <p>(3134)
                    <span className="span-star"> 
                        <Link className="star-link" to="">5 star (200)</Link> | 
                        <Link className="star-link" to=""> 4 star (100)</Link> | 
                        <Link className="star-link" to=""> 3 star (20)</Link> | 
                        <Link className="star-link" to=""> 2 star (5)</Link> | 
                        <Link className="star-link" to=""> 1 star (0)</Link>
                    </span>
                </p>
                <div className="row">
                    <div className="col-4">
                        <p>Showing 1-12 of 3134 reviews</p>
                    </div>
                    <div className="col-8">
                        <button className="sort-by-all-sale btn btn-shop">
                            <select className="form-select">
                                <option selected>Sort by date</option>
                                <option value="0">Sort by date: newest to oldest</option>
                                <option value="1">Sort by date: oldest to newest</option>
                            </select>
                        </button>
                        <button className="btn-show btn btn-shop">
                            <select className="form-select">
                                <option value="0">Show 5</option>
                                <option value="1">Show 10</option>
                                <option value="2">Show 15</option>
                                <option value="3">Show 20</option>
                            </select>
                        </button>  
                    </div>
                </div>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-comment">
                    <h3>Lorem Ipsum<span className="span-star">| 5 star</span></h3>
                    <p>
                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        adipisci velit... There is no one who loves pain itself, who seeks after it 
                        and wants to have it, simply because it is pain..
                    </p>
                </li>
                <li className="list-group-item list-comment">
                    <h3>Lorem Ipsum<span className="span-star">| 5 star</span></h3>
                    <p>
                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        adipisci velit... There is no one who loves pain itself, who seeks after it 
                        and wants to have it, simply because it is pain..
                    </p>
                </li>
                <li className="list-group-item list-comment">
                    <h3>Lorem Ipsum<span className="span-star">| 5 star</span></h3>
                    <p>
                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        adipisci velit... There is no one who loves pain itself, who seeks after it 
                        and wants to have it, simply because it is pain..
                    </p>
                </li>
                <li className="list-group-item list-comment">
                    <h3>Lorem Ipsum<span className="span-star">| 5 star</span></h3>
                    <p>
                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        adipisci velit... There is no one who loves pain itself, who seeks after it 
                        and wants to have it, simply because it is pain..
                    </p>
                </li>
                <li className="list-group-item list-comment">
                    <h3>Lorem Ipsum<span className="span-star">| 5 star</span></h3>
                    <p>
                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        adipisci velit... There is no one who loves pain itself, who seeks after it 
                        and wants to have it, simply because it is pain..
                    </p>
                </li>
                <li className="list-group-item list-comment">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                        </ul>
                    </nav>
                </li>
            </ul>
        </div>
    )
}

export default Customer_Review;