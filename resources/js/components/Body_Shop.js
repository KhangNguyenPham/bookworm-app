import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

export default class Body_Shop extends Component{
    
    constructor(props){
        super(props);
        this.show = this.show.bind(this);
        this.sort = this.sort.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    state = {
        books:[],
        authors:[],
        categorys:[],
        filtered_by:"",
        id_filter:"1",
        sort:"sale",
        per_page:"5",
        url:"/api/Book/filtered_by_category/1/per_page/5/sort/sale",
        activePage: 1,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        pageRangeDisplayed: 5,
        from:"1",
        to:"5"
    };

    componentDidMount(){
        axios.get(this.state.url).then(response => {
            const books = response.data.data;
            this.setState({
                books,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to
            });
        }).catch(error => console.log(error));
        
        axios.get("/api/Author").then(response => {
            const authors = response.data;
            this.setState({authors});
        }).catch(error => console.log(error));
       
        axios.get("/api/Category").then(response => {
            const categorys = response.data;
            this.setState({
                categorys,
                filtered_by:"category " + categorys[0].category_name
            });
        }).catch(error => console.log(error));
    }

    filtered_by_category(category_id, category_name){
        let sort = this.state.sort.split(" ");
        let sort_type = sort[sort.length-1];
        let url = "/api/Book/filtered_by_category/" + category_id + "/per_page/" + 
        this.state.per_page + "/sort/" + sort_type;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({
                books,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to,
                filtered_by:"category " + category_name,
                id_filter:category_id
            });
        }).catch(error => console.log(error)); 
        console.log(url);
    }

    filtered_by_author(author_id, author_name){
        let sort = this.state.sort.split(" ");
        let sort_type = sort[sort.length-1];
        let url = "/api/Book/filtered_by_author/" + author_id + "/per_page/" + 
        this.state.per_page + "/sort/" + sort_type;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({
                books, 
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to,
                filtered_by:"author " + author_name,
                id_filter:author_id
            });
        }).catch(error => console.log(error)); 
        console.log(url);
    }

    filtered_by_star(star){
        let sort = this.state.sort.split(" ");
        let sort_type = sort[sort.length-1];
        let url = "/api/Book/filtered_by_star/" + star + "/per_page/" + 
        this.state.per_page + "/sort/" + sort_type;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({
                books, 
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to,
                filtered_by:"star " + star + " star",
                id_filter:star
            });
        }).catch(error => console.log(error)); 
        console.log(url);
    }

    show(event){
        let type = this.state.filtered_by.split(" ");
        let sort = this.state.sort.split(" ");
        let sort_type = sort[sort.length-1];
        let url = "/api/Book/filtered_by_" + type[0] + "/" + this.state.id_filter + "/per_page/" + 
        event.target.value + "/sort/" + sort_type;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({
                books,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to,
                per_page : event.target.value
            });
        }).catch(error => console.log(error));
        console.log(url);
    }

    sort(event){
        let type = this.state.filtered_by.split(" ");
        let sort = event.target.value.split(" ");
        let sort_type = sort[sort.length-1];
        let url = "/api/Book/filtered_by_" + type[0] + "/" + this.state.id_filter + "/per_page/" + 
        this.state.per_page + "/sort/" + sort_type;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({
                books,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to,
                sort : event.target.value
            });
        }).catch(error => console.log(error));
        console.log(url);
    }

    handlePageChange(pageNumber) {
        let type = this.state.filtered_by.split(" ");
        let sort = this.state.sort.split(" ");
        let sort_type = sort[sort.length-1];
        let url = "/api/Book/filtered_by_" + type[0] + "/" + this.state.id_filter + "/per_page/" + 
        this.state.per_page + "/sort/" + sort_type + "?page=" + pageNumber;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({
                books, 
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                from:response.data.from,
                to:response.data.to
            });
        }).catch(error => console.log(error));
        console.log(url);
    }

    render(){
        return(
            <>
                <h4 className="header-shop">Books <span>(Filltered by {this.state.filtered_by})</span></h4>
                <hr className="hr-about-us"/>
                <div className="row body-shop">
                    <div className="col-lg-2 col-sm-12">
                        Fillter By
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="text-color-black btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Category
                                        </button>
                                    </h2>
                                </div>
    
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    {this.state.categorys.map((category, index)=>(
                                        <div key={index} className="card-body text-capitalize" onClick={() => this.filtered_by_category(category.id, category.category_name)}>
                                            {category.category_name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block text-left collapsed text-color-black" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Author
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    {this.state.authors.map((author, index)=>(
                                        <div key={index} className="card-body text-capitalize" onClick={()=>this.filtered_by_author(author.id, author.author_name)}>
                                            {author.author_name}
                                        </div>   
                                    ))}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block text-left collapsed text-color-black" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Rating Review
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body" onClick={()=> this.filtered_by_star(1)}>1 Star</div>
                                    <div className="card-body" onClick={()=> this.filtered_by_star(2)}>2 Star</div>
                                    <div className="card-body" onClick={()=> this.filtered_by_star(3)}>3 Star</div>
                                    <div className="card-body" onClick={()=> this.filtered_by_star(4)}>4 Star</div>
                                    <div className="card-body" onClick={()=> this.filtered_by_star(5)}>5 Star</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10 col-sm-12">
                        <div className="row mt-1">
                            <div className="col">Showing  {this.state.from} - {this.state.to} of {this.state.totalItemsCount} books</div>
                            <div className="col">
                                <select className="form-select"  onChange={this.sort}>
                                    <option>Sort by all sale</option>
                                    <option>Sort by popularity</option>
                                    <option>Sort by price: low to high</option>
                                    <option>Sort by price: high to low</option>
                                </select>
                                <select className="form-select" onChange={this.show}>
                                    <option value="5">Show 5</option>
                                    <option value="15">Show 15</option>
                                    <option value="20">Show 20</option>
                                    <option value="25">Show 25</option>
                                </select>
                            </div>
                        </div>
                        <div className="list-books">
                            <div className="row">
                                {this.state.books.map((book)=>(
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="card card-book">
                                            <Link to={"/Product/" + book.id}>
                                                <img className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.booktitle + " photo"} />
                                                <div className="card-body infbook">
                                                    <h5 className="card-title">{book.book_title}</h5>
                                                    <p className="card-text">{book.author_name}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <del>
                                                            {(book.discount_price != null ? "$" + book.book_price : "")} 
                                                        </del>
                                                        {(book.discount_price != null ? " $" + book.discount_price : " $" + book.book_price)}
                                                    </li>
                                                </ul>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <nav aria-label="Page navigation example">
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
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
}
