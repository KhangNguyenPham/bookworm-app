import React, {useEffect, useState} from "react";
import Book_Information from "./Book_Information";
import Add_To_Cart from "./Add_To_Cart";
import Write_A_Review from "./Write_A_Reivew";
import Customer_Review from "./Customer_Review";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Product() {    

    const {id} = useParams();
    
    return(
        <> 
            <h4 className="header-about-us">Category Name</h4>
            <hr className="hr-about-us"/>
            <div className="body-product">
                <div className="row">
                    <div className="col-lg-8 col-md-6 col-sm-6 col-12">
                        <Book_Information book_id={id}/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <Add_To_Cart book_id={id} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-12">
                        <Customer_Review book_id={id}/>
                    </div>
                    <div className="col-lg-4 col-12">
                        <Write_A_Review book_id={id}/>
                    </div>
                </div>
            </div>
        </>
    )
}
