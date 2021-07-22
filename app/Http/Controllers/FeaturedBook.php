<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Book;
use App\Models\Author;
use App\Models\Review;
use App\Models\Discount;

class FeaturedBook extends Controller
{
    function recommend(){
        
        $id = Book::join("reviews", "books.id", "=", "reviews.book_id")
        ->select( 
            "reviews.book_id",
            Review::raw("AVG(cast(reviews.rating_start as float)) as avg_star")
        )
        ->groupBy("reviews.book_id")
        ->orderBy("avg_star","desc")
        ->take(8)
        ->get();

        $id = json_decode($id);
        $id = (array)$id;
        $id_collection=[];
        
        foreach($id as $key=>$value){
            foreach($value as $x=>$y){
                $id_collection = [...$id_collection, $y];
            }
        }

        foreach($id_collection as $key=>$value){
            if($key % 2 != 0){
                unset($id_collection[$key]);
            }
        }

        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select(
            "books.id", "books.book_title", "books.book_price", "books.book_cover_photo",
            "authors.author_name",
            "discounts.discount_price"
         )
        ->whereIn("books.id", $id_collection)->get();

        return response()->json($books ,200);
    }

    function popular(){
        $id = Book::join("reviews", "books.id", "=", "reviews.book_id")
        ->select( 
            "reviews.book_id",
            Review::raw("count(reviews.book_id) as total")
        )
        ->groupBy("reviews.book_id")
        ->orderBy("total","desc")
        ->take(8)
        ->get();

        $id = json_decode($id);
        $id = (array)$id;
        $id_collection=[];
        
        foreach($id as $key=>$value){
            foreach($value as $x=>$y){
                $id_collection = [...$id_collection, $y];
            }
        }

        foreach($id_collection as $key=>$value){
            if($key % 2 != 0){
                unset($id_collection[$key]);
            }
        }
        
        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select(
            "books.id", "books.book_title", "books.book_price", "books.book_cover_photo",
            "authors.author_name",
            "discounts.discount_price"
         )
        ->whereIn("books.id", $id_result)->get();

        return response()->json($books ,200);
    }

}
