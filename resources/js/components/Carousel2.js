import React from "react";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default class Carousel2 extends Component {

    responsive = {
        surface: {
            breakpoint: { max: 3000, min: 2000 },
            items: 4,
            slidesToSlide: 4 
        },
        desktop:{
            breakpoint: { max: 2000, min: 1024 },
            items: 4,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 690 },
            items: 3,
            slidesToSlide: 3 
        },
        mobile: {
            breakpoint: { max: 690, min: 400 },
            items: 2,
            slidesToSlide: 2 
        },
        cuibap: {
            breakpoint: { max: 400, min: 0 },
            items: 1,
            slidesToSlide: 1 
        }
    };

    state = {
        books:[]
    }

    componentDidMount(){
        axios.get("/api/Book/sale").then(response => {
                const books = response.data;
                this.setState({books});
        }).catch(error => console.log(error));
    }

    render(){
        return(
            <>
            <Carousel
                className="carousel"
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={this.responsive}
                ssr={true} 
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {this.state.books.map((book, index)=>(
                    <div key={index} className="card card-book card-caroulsel">
                        <Link to={"Product/" + book.id}>
                            <img className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"}/>
                            <div className="card-body infbook">
                                <h5 className="card-title">{book.book_title}</h5>
                                <p className="card-text">{book.author_name}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><del>${book.book_price}</del> ${book.discount_price}</li>
                            </ul>
                        </Link>
                    </div>  
                ))} 
            </Carousel>;
            </>
        )
    }
}
