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
            sort:"oldest",
            star:5, 
            from:"",
            to:"",
            count1:0,
            count2:0,
            count3:0,
            count4:0,
            count5:0,

        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.sort = this.sort.bind(this);
        this.show = this.show.bind(this);
    }

    componentDidMount(){
        let url = "/api/Review/" + this.props.book_id + "/filltered_by_star/" + this.state.star + 
        "/per_page/" + this.state.per_page + "/sort/" + this.state.sort;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from: response.data.from,
                to: response.data.to,
            });
            console.log(url);
        }).catch(error => console.log(error));

        let url_total = "/api/Review/" + this.props.book_id + "/total_reviews";
        axios.get(url_total).then(response => {
            const total_reviews = response.data;
            this.setState({total_reviews});
        }).catch(error => console.log(error));

        let url_avg = "/api/Review/" + this.props.book_id + "/rating_star";
        axios.get(url_avg).then(response => {
            const avg_star = response.data["avg_star"]||0;
            this.setState({avg_star});
        }).catch(error => console.log(error));

        axios.get("/api/Review/" + this.props.book_id + "/list_star/" + 1).then(response => {
            this.setState({count1:response.data});
        }).catch(error => console.log(error));

        axios.get("/api/Review/" + this.props.book_id + "/list_star/" + 2).then(response => {
            this.setState({count2:response.data});
        }).catch(error => console.log(error));

        axios.get("/api/Review/" + this.props.book_id + "/list_star/" + 3).then(response => {
            this.setState({count3:response.data});
        }).catch(error => console.log(error));

        axios.get("/api/Review/" + this.props.book_id + "/list_star/" + 4).then(response => {
            this.setState({count4:response.data});
        }).catch(error => console.log(error));

        axios.get("/api/Review/" + this.props.book_id + "/list_star/" + 5).then(response => {
            this.setState({count5:response.data});
        }).catch(error => console.log(error));
        
    }

    handlePageChange(pageNumber) {
        let url = "/api/Review/" + this.props.book_id + "/filltered_by_star/" + this.state.star + 
        "/per_page/" + this.state.per_page + "/sort/" + this.state.sort +"?page=" + pageNumber;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from: response.data.from,
                to: response.data.to,
            });
        }).catch(error => console.log(error));
        console.log(url)
    }
    
    sort(day){
        let url = "/api/Review/" + this.props.book_id + "/filltered_by_star/" + this.state.star + 
        "/per_page/" + this.state.per_page + "/sort/" + day.target.value;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from: response.data.from,
                to: response.data.to,
                sort: day.target.value
            });
        }).catch(error => console.log(error));
        console.log(url)
    }

    show(number){
        let url = "/api/Review/" + this.props.book_id + "/filltered_by_star/" + this.state.star + 
        "/per_page/" + number.target.value + "/sort/" + this.state.sort;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from: response.data.from,
                to: response.data.to,
                per_page: number.target.value
            });
        }).catch(error => console.log(error));
        console.log(url)
    }

    fill(star){
        let url = "/api/Review/" + this.props.book_id + "/filltered_by_star/" + star + 
        "/per_page/" + this.state.per_page + "/sort/" + this.state.sort;
        axios.get(url).then(response => {
            const reviews = response.data.data;
            this.setState({
                reviews,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                star:star,
                from: response.data.from,
                to: response.data.to,
            });
        }).catch(error => console.log(error));
        console.log(url)
    }

    render(){
        return(
            <div className="customer-review">
                <div>
                    <h3>Customer Review <span>(Filtered by {this.state.star} stars)</span></h3>     
                    <h2>{this.state.avg_star} Star</h2>
                    <p>({this.state.total_reviews})
                        <span className="span-star"> 
                            <Link onClick={()=>this.fill(5)} className="star-link"> 5 star ({this.state.count5})</Link> | 
                            <Link onClick={()=>this.fill(4)} className="star-link"> 4 star ({this.state.count4})</Link> | 
                            <Link onClick={()=>this.fill(3)} className="star-link"> 3 star ({this.state.count3})</Link> | 
                            <Link onClick={()=>this.fill(2)} className="star-link"> 2 star ({this.state.count2})</Link> | 
                            <Link onClick={()=>this.fill(1)} className="star-link"> 1 star ({this.state.count1})</Link>
                        </span>
                    </p>
                    <div className="row">
                        <div className="col-4">
                            <p>Showing {this.state.from || 0} - {this.state.to || 0} of {this.state.total_reviews} reviews</p>
                        </div>
                        <div className="col-8">                         
                            <select className="form-select" onChange={this.sort}>
                                <option value="oldest">Sort by date: newest to oldest</option>
                                <option value="newest">Sort by date: oldest to newest</option>
                            </select>
                            <select className="form-select" onChange={this.show}>
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