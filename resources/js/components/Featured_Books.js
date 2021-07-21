import React from "react";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Featured_Books extends Component{

    state = {
        books:[],
    }

    componentDidMount(){
        axios.get("/api/Book/feature/recommend").then(response=>{
            this.setState({books:response.data});
            console.log(this.state.books)
        }).catch(error=>console.log(error));
    }

    popularShow(){
        axios.get("/api/Book/feature/popular").then(response=>{
            this.setState({books:response.data});
            document.getElementById("popular").style.background = "grey";
            document.getElementById("recommend").style.background = "white";
            document.getElementById("recommend").style.color = "black";
        }).catch(error=>console.log(error));
    }

    recommendShow(){
        axios.get("/api/Book/feature/recommend").then(response=>{
            this.setState({books:response.data});
            document.getElementById("recommend").style.background = "grey";
            document.getElementById("popular").style.background = "white";
        }).catch(error=>console.log(error));
    }

    render(){
        return(
            <>
                <div className="featured-books">
                    <h3>Featured Books</h3>
                    <button id="recommend" className="btn btn-secondary border-0" onClick={()=>this.recommendShow()}>Recommended</button>
                    <button id="popular" className="btn" onClick={()=>this.popularShow()}>Popular</button>
                    <div className="list-featured-books">
                        <div className="row">
                            {this.state.books.map((book, index)=>(
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <div className="card card-book">
                                        <Link to={"Product/" + book.id}>
                                            <img className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.booktitle + " photo"} />
                                            <div className="card-body">
                                                <h5 className="card-title">{book.book_title}</h5>
                                                <p className="card-text">{book.author_name}</p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <del>
                                                        {(book.discount_price != null ? "$" + book.book_price : "")} 
                                                    </del>
                                                    {(book.discount_price != null ? " $" + book.discount_price : " $" + book.book_price)}
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>   
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
