import React from "react";

function Write_A_Review(){
    return(
        <div className="write-a-review">
            <h4>Write a Review</h4>
            <hr/>
            <form>
                <div className="review-input">
                    <label for="title" className="form-label">Add a title</label>
                    <input type="text" className="form-control" id="title"/>
                </div>
                <div className="review-input">
                    <label for="content" className="form-label">Details please! Your comment helps other Shoppers</label>
                    <input type="text" className="form-control" id="title"/>
                </div>
                <div className="review-input">
                    <label className="form-label" for="rating">Select a rating star</label>
                    <select class="select" id="rating">
                        <option value="0">1 Star</option>
                        <option value="1">2 Star</option>
                        <option value="2">3 Star</option>
                        <option value="3">4 Star</option>
                        <option selected value="4">5 Star</option>
                    </select>
                </div>
                <div>
                    <button className="add-to-card-submit" type="submit"><h5>Submit Review</h5></button>
                </div>
            </form>
        </div>
    )
}

export default Write_A_Review;