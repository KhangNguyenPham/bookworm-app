import React from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

export default class Customer_Review extends Component {

    constructor(props){
        super(props)
        this.state = {
            reviews:[],
            total_reviews:"",
            avg_star:0,
            per_page:5,
            activePage: 1,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            pageRangeDisplayed: 5,
            sort:"oldest"
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount(){
        let url = "/api/Review/" + this.props.book_id + "?page=" + this.state.current_page;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total
            });
            console.log(response);
        }).catch(error => console.log(error));

        let url_total = "/api/Review/" + this.props.book_id + "/total_reviews";
        axios.get(url_total).then(response => {
            const total_reviews = response.data;
            this.setState({total_reviews});
            console.log(response);
        }).catch(error => console.log(error));

        let url_avg = "/api/Review/" + this.props.book_id + "/rating_star";
        axios.get(url_avg).then(response => {
            const avg_star = response.data["avg_star"]||0;
            this.setState({avg_star});
            console.log(response);
        }).catch(error => console.log(error));
    }

    handlePageChange(pageNumber) {
        let url = "/api/Review/" + this.props.book_id + "?page=" + pageNumber;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page
            });
        }).catch(error => console.log(error));
    }

    tabRow() {
        if (this.state.items instanceof Array) {
            return this.state.items.map(function (object, i) {
                return <TableRow
                    obj={object} st={this.state} key={i} index={i}
                />;
            }, this)
        }
    }

    sort(day){
        this.setState({sort: day.target.value});
    }

    show(number){
        this.setState({per_page: number.target.value});
    }

    render(){
        return(
            <div className="customer-review">
                <h1>{this.state.sort}</h1>
                <h1>{this.state.show}</h1>
                <div>
                    <h3>Customer Review <span>(Filtered by 5 stars)</span></h3>     
                    <h2>{this.state.avg_star} Star</h2>
                    <p>({this.state.total_reviews})
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
                            <p>Showing 1-5 of {this.state.total_reviews} reviews</p>
                        </div>
                        <div className="col-8">                         
                            <select className="form-select" value={this.state.sort} onChange={this.sort}>
                                <option value="oldest">Sort by date: newest to oldest</option>
                                <option value="newest">Sort by date: oldest to newest</option>
                            </select>
                            <select className="form-select" value={this.state.per_page} onChange={this.show}>
                                <option value="5">Show 5</option>
                                <option value="10">Show 10</option>
                                <option value="15">Show 15</option>
                                <option value="20">Show 20</option>
                            </select>  
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {this.state.reviews.map((review)=>
                        <li className="list-group-item list-comment">
                            <h3>{review.review_title}<span className="span-star">| {review.rating_start} star</span></h3>
                            <p>
                                {review.review_details}
                            </p>
                        </li>
                    )}
                    <li className="list-group-item list-comment">
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.totalItemsCount}
                            itemsCountPerPage={this.state.per_page}
                            onChange={this.handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />  
                    </li>
                    
                </ul>
            </div>
        )
    }  
    }