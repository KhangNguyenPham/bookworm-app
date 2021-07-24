import axios from "axios";
import React from "react";
import { Component } from "react";

export default class Write_A_Review extends Component{

    constructor(props){
        super(props);
        this.state = {
            title:"",
            detail:"",
            star:""
        }
        this.title = this.title.bind(this);
        this.detail = this.detail.bind(this);
        this.star = this.star.bind(this);
    }   

    title(event){
        let title = event.target.value;
        this.setState({title});
    }

    detail(event){
        let detail = event.target.value;
        this.setState({detail});
    }
    
    star(event){
        let star = event.target.value;
        this.setState({star});
    }

    submit(){
        const review = {
            "book_id": this.props.book_id,
            "review_title" : this.state.title,
            "review_details": this.state.detail,
            "review_date" :"",
            "rating_start" : this.state.star
        }
        
        axios.post("api/Review/", review)
        .then(response=>{console(response)})
        .catch((error)=>{console.log(error)});
        
       //alert(review);
    }
    
    render(){
        return(
            <div className="write-a-review">
                <h4>Write a Review</h4>
                <hr/>
                
                    <div className="review-input">
                        <label for="title" className="form-label">Add a title</label>
                        <input type="text" className="form-control" id="title" onChange={this.title} />
                    </div>
                    <div className="review-input">
                        <label for="content" className="form-label">Details please! Your comment helps other Shoppers</label>
                        <input type="text" className="form-control" id="title" onChange={this.detail} />
                    </div>
                    <div className="review-input">
                        <label className="form-label" for="rating">Select a rating star</label>
                        <select class="select" id="rating" onChange={this.star}>
                            <optio selected value="0"></optio>
                            <option value="1">1 Star</option>
                            <option value="2">2 Star</option>
                            <option value="3">3 Star</option>
                            <option value="4">4 Star</option>
                            <option value="5">5 Star</option>
                        </select>
                    </div>
                    <div>
                        <button className="add-to-card-submit" type="submit" onClick={()=>this.submit()}><h5>Submit Review</h5></button>
                    </div>
                    
            </div>
        )
    }
    }