import axios from "axios";
import React from "react";
import { Component } from "react";
import { Toast } from "react-bootstrap";

export default class Write_A_Review extends Component{

    constructor(props){
        super(props);
        this.state = {
            title:"",
            detail:"",
            star:"",
            toast:"",
            show:false,
        }
        this.title = this.title.bind(this);
        this.detail = this.detail.bind(this);
        this.star = this.star.bind(this);
    }   

    title(event){
        const title = event.target.value;
        this.setState({title});
    }

    detail(event){
        const detail = event.target.value;
        this.setState({detail});
    }
    
    star(event){
        const star = event.target.value;
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
        if(this.state.title){
            axios.post("/api/Review/add", review)
            .then((response)=>{this.setState({
                toast:response.data,
                show:true
            })})
            .catch((error)=>{console.log(error)});
            document.getElementById("warning").innerHTML = "";
            document.getElementById("title").value = "";
            document.getElementById("detail").value = "";
        }else{
            document.getElementById("warning").innerHTML = "Don't miss this title please!";
        }
    }
    
    render(){
        return(
            <div className="write-a-review">
                <Toast className={"mb-2 bg-info"} show={this.state.show} onClose={()=>{this.setState({show:false})}}>
                    <Toast.Header>
                        <strong className="me-auto">BookWorm</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.toast}</Toast.Body>
                </Toast>
                <h4>Write a Review</h4>
                <hr/>
                    <p className="warning1" id="warning"></p>
                    <div className="review-input">
                        <label for="title" className="form-label">Add a title</label>
                        <input type="text" className="form-control" id="title" onChange={this.title} maxlength="120"/>
                    </div>
                    <div className="review-input">
                        <label for="content" className="form-label">Details please! Your comment helps other Shoppers</label>
                        <input type="text" className="form-control" id="detail" onChange={this.detail} />
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
                    <button onClick={()=> this.submit()} className="add-to-card-submit"><h5>Submit Review</h5></button>   
            </div>
        )
    }
}