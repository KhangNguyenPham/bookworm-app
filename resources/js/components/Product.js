import React, {useEffect, useState} from "react";
import Book_Information from "./Book_Information";
import Add_To_Cart from "./Add_To_Cart";
import Write_A_Review from "./Write_A_Reivew";
import Customer_Review from "./Customer_Review";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Product() {    

    const {id} = useParams();

    // const books = useState(()=>{
    //     axios.get("http://127.0.0.1:8000/api/Book/" + id).then(response => {
    //         return response.data;
    //     }).catch(error => console.log(error));
    // });

    // useEffect(()=>{
    //     axios.get("http://127.0.0.1:8000/api/Book/" + id).then(response => {
    //         setBook(response.data);
    //         this.setState({books});
    //         console.log(books);
    //     }).catch(error => console.log(error));
    // });
    
    return(
        <> 
            <h4 className="header-about-us">Category Name</h4>
            <hr className="hr-about-us"/>
            <div className="body-product">
                <div className="row">
                    <div className="col-8">
                        <Book_Information book_id={id}/>
                    </div>
                    <div className="col-4">
                        <Add_To_Cart />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <Customer_Review />
                    </div>
                    <div className="col-4">
                        <Write_A_Review />
                    </div>
                </div>
            </div>
        </>
    )
}
