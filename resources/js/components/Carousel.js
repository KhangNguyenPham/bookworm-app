import React from "react";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Carousel extends Component {

    state = {
        books:[],
    }

    componentDidMount(){
        axios.get("/api/Book/sale").then(response => {
                const books = response.data.data;
                this.setState({books});
        }).catch(error => console.log(error));
    }

    render(){
        return(
            <>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row">
                            {this.state.books.map((book, index)=>(
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="card card-book">
                                        <img className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{book.book_title}</h5>
                                            <p className="card-text">{book.author_name}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><del>${book.book_price}</del> ${book.discount_price}</li>
                                        </ul>
                                    </div>  
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" to="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" to="carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            </>
        )
    }
}
