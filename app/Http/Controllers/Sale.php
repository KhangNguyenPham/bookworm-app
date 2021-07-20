<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Discount;
use App\Models\Author;

class Sale extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $date = getdate();  
        $month = $date["mon"] < 10 ? "0".$date["mon"] : $date["mon"];
        $day = $date["mday"] < 10 ? "0".$date["mday"] : $date["mday"];
        $today = $date["year"]."-".$month."-".$day;

        $books = Discount::join("books", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->select(
            "books.id", "books.book_title", "books.book_price", "books.book_cover_photo", 
            "discounts.discount_price", "authors.author_name", "discounts.discount_start_date", 
            "discounts.discount_end_date", 
            Discount::raw("books.book_price - discounts.discount_price as price")
        )
        ->where("discounts.discount_start_date", "<=", $today)
        ->where("discounts.discount_end_date", ">=", $today) 
        ->orwhere(function($query){
            $date = getdate();  
            $month = $date["mon"] < 10 ? "0".$date["mon"] : $date["mon"];
            $day = $date["mday"] < 10 ? "0".$date["mday"] : $date["mday"];
            $today = $date["year"]."-".$month."-".$day;
            $query->where("discounts.discount_start_date", "<=", $today)
            ->where("discounts.discount_end_date", "=", null); 
        })
        ->orderBy("price", "desc")
        ->take(10)
        ->paginate(4);
        return response()->json($books,200);
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
        //
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
}
