<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Book;
use App\Models\Category;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $book = Book::join("authors", "author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select(
            "books.id", "books.book_title", "books.book_cover_photo", "books.book_price",
            "authors.author_name",
            "discounts.discount_price",
        )
        ->get();

        return response()->json($book, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select(
            "books.id", "books.book_title", "books.book_price", "books.book_cover_photo", "books.book_summary",
            "authors.author_name",
            Book::raw("(CASE
            WHEN ((discounts.discount_start_date <= CURRENT_DATE) and (discounts.discount_end_date >= CURRENT_DATE)) or
            ((discounts.discount_start_date <= CURRENT_DATE) and (discounts.discount_end_date is null))
            THEN discount_price
            ELSE null
            END) as discount_price")
         )
        ->where("books.id", $id)
        ->get();
        return response()->json($books, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function filterd_by_category($category_id){
        $books = Book::where("books.category_id", $category_id);
        return response()->json($category,200);
    }
    
}
