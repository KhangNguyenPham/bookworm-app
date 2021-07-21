import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Body_Shop extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            books:[],
            authors:[],
            categorys:[],
            filtered_by:"",
            per_page:"5",
            id_filter:"1",
            sort:"sale",
            url:"/api/Book/filtered_by_category/1/per_page/5/sort/sale"
        };
        this.show = this.show.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount(){
        axios.get(this.state.url).then(response => {
            const books = response.data.data;
            this.setState({books});
        }).catch(error => console.log(error));
        
        axios.get("/api/Author").then(response => {
            const authors = response.data;
            this.setState({authors});
        }).catch(error => console.log(error));
       
        axios.get("/api/Category").then(response => {
            const categorys = response.data;
            this.setState({categorys});
            this.setState({filtered_by:"category " + categorys[0].category_name})
        }).catch(error => console.log(error));
    }

    filtered_by_category(category_id, category_name){
        axios.get("/api/Book/filtered_by_category/" + category_id + "/per_page/" + this.state.per_page + "/sort/" + this.state.sort).then(response => {
            const books = response.data.data;
            this.setState({books});
            this.setState({filtered_by:"category " + category_name});
            this.setState({id_filter:category_id});
        }).catch(error => console.log(error)); 
    }

    filtered_by_author(author_id, author_name){
        axios.get("/api/Book/filtered_by_author/" + author_id + "/per_page/" + this.state.per_page + "/sort/" + this.state.sort).then(response => {
            const books = response.data.data;
            this.setState({books});
            this.setState({filtered_by:"author " + author_name});
            this.setState({id_filter:author_id});
        }).catch(error => console.log(error)); 
    }

    filtered_by_star(star){
        this.setState({filtered_by:star});
    }

    show(event){
        this.setState({per_page: event.target.value});
        let type = this.state.filtered_by.split(" ");
        let url = "/api/Book/filtered_by_" + type[0] + "/" + this.state.id_filter + "/per_page/" + this.state.per_page + "/sort/" + this.state.sort;
        axios.get(url).then(response => {
            const books = response.data.data;
            this.setState({books});
        }).catch(error => console.log(error));
        console.log(url);
    }

    sort(event){
        let sort = event.target.value.split(" ");
        let sort_type = sort[sort.length-1];
        let type = this.state.filtered_by.split(" ");
        this.setState({sort:sort_type});
        let url = "/api/Book/filtered_by_" + type[0] + "/" + this.state.id_filter + "/per_page/" + this.state.per_page + "/sort/" + this.state.sort;
        console.log(url);
    }

    getData(){
        console.log(this.state.url);
    }

    render(){
        return(
            <>
                <h1>sort by {this.state.sort}</h1>
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
                                        <div key={index} className="card-body" onClick={() => this.filtered_by_category(category.id, category.category_name)}>
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
                                        <div key={index} className="card-body" onClick={()=>this.filtered_by_author(author.id, author.author_name)}>
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
                        <div className="row">
                            <div className="col">Showing 1-12 of 126 books</div>
                            <div className="col">
                                <button className="sort-by-all-sale btn btn-shop">
                                    <select className="form-select"  onChange={this.sort}>
                                        <option>Sort by all sale</option>
                                        <option>Sort by popularity</option>
                                        <option>Sort by price: low to high</option>
                                        <option>Sort by price: high to low</option>
                                    </select>
                                </button>
                                <button className="btn-show btn btn-shop">
                                    <select className="form-select" onChange={this.show}>
                                        <option selected value="5">Show 5</option>
                                        <option value="15">Show 15</option>
                                        <option value="20">Show 20</option>
                                        <option value="25">Show 25</option>
                                    </select>
                                </button>
                            </div>
                        </div>
                        <div className="list-books">
                            <div className="row">
                                {this.state.books.map((book)=>(
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div className="card card-book">
                                            <Link to={"/Product/" + book.id}>
                                                <img className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.booktitle + " photo"} />
                                                <div className="card-body">
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
                                <ul className="pagination">
                                    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                    <li className="page-item"><Link className="page-link">Next</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
}
