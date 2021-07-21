import React, {Component} from "react";
import axios from "axios";

export default class Book_Information extends Component{

    state = {
        books:[],
    }

    componentDidMount(){
        let url = "/api/Book/" + this.props.book_id;
        axios.get(url).then(response => {
            const books = response.data;
            this.setState({books});
        }).catch(error => console.log(error));
    }

    render(){
        return(
            <div className="book-information">
                {this.state.books.map((book)=>
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <img className="image-book-information" src={"../images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"}/>
                        <p className="by-author"><span>By (author)</span> {book.author_name}</p>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 content-and-title">
                        <h3>{book.book_title}</h3>
                        <p className="book-content">
                            {book.book_summary}   
                        </p>
                    </div>
                </div>
                )}
            </div>
        )
    }
}
    
