<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Book;
use App\Models\Discount;
use App\Models\Review;

class FilterController extends Controller
{
    function category_sale($category_id, $number){
        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->join("discounts", "books.id", "=", "discounts.book_id")
        ->select("books.id", "book_title", "book_price", "book_cover_photo", "books.category_id",
            "authors.author_name", 
            "discounts.discount_price",
            Book::raw("(books.book_price - discounts.discount_price) as price")
        )
        ->where("category_id", $category_id)
        ->orderBy("price", "desc")
        ->paginate($number);
        return $books;
    }

    function category_popularity($category_id, $number){
        $id = Book::join("reviews", "books.id", "=", "reviews.book_id")
        ->select( 
            "reviews.book_id",
            Review::raw("count(reviews.book_id) as total")
        )
        #->where("books.category_id", $category_id)
        ->groupBy("reviews.book_id")
        ->orderBy("total","desc")
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
            "books.id", "books.book_title", "books.book_price", "books.book_cover_photo", "books.category_id",
            "authors.author_name",
            "discounts.discount_price"
        )
        ->where("books.category_id", $category_id)
        ->whereIn("books.id", $id_collection)
        ->paginate($number);

        return $books;
    }

    function category_high($category_id, $number){
        $books = Book::where("category_id", $category_id)
        ->join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select("books.id", "book_title", "book_price", "book_cover_photo", "books.category_id",
            "authors.author_name", 
            "discounts.discount_price",
            Discount::raw("(books.book_price - discounts.discount_price) as price")
        )
        ->orderBy("book_price", "asc")
        ->paginate($number);
        return $books;
    }

    function category_low($category_id, $number){
        $books = Book::where("category_id", $category_id)
        ->join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select("books.id", "book_title", "book_price", "book_cover_photo", "books.category_id",
            "authors.author_name", 
            "discounts.discount_price",
            Discount::raw("(books.book_price - discounts.discount_price) as price")
        )
        ->orderBy("book_price", "desc")
        ->paginate($number);
        return $books;
    }

    public function category($category_id, $number, $sort_by){
        $fillter = new FilterController();
        switch ($sort_by){
            case "sale": 
                return response()->json($fillter->category_sale($category_id, $number), 200);
                break;
            case "popularity":
                return response()->json($fillter->category_popularity($category_id, $number), 200);
                break;
            case "high":
                return response()->json($fillter->category_high($category_id, $number), 200);
                break;
            case "low":
                return response()->json($fillter->category_low($category_id, $number), 200);
                break;
            default:
                return "";
        }
        
    }

    public function author($author_id, $number, $sort_by){
        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select("books.id", "book_title", "book_price", "book_cover_photo", "authors.author_name", "discounts.discount_price")
        ->where("author_id", $author_id)
        ->paginate($number);
        return response()->json($books, 200);
    }

    public function star($star, $number, $sort_by){
        $id = Book::join("reviews", "books.id", "=", "reviews.book_id")
        ->select( 
            "reviews.book_id",
            Review::raw("AVG(cast(reviews.rating_start as float)) as avg_star")
        )
        ->groupBy("reviews.book_id")
        ->orderBy("avg_star","desc")
        ->get();

        $id = json_decode($id);
        $id = (array)$id;
        $id_collection=[];
        $id_result=[];
        
        foreach($id as $key=>$value){
            foreach($value as $x=>$y)
            {
                if(($y>=$star) && ($x!="book_id")){
                    $id_collection = [...$id_collection, $value];
                }
            }
        }

        foreach($id_collection as $key=>$value){
            foreach($value as $x=>$y)
            {
                if(($x=="book_id")){
                    $id_result = [...$id_result, $y];
                }
            }
        }

        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select(
            "books.id", "books.book_title", "books.book_price", "books.book_cover_photo",
            "authors.author_name",
            "discounts.discount_price"
         )
        ->whereIn("books.id", $id_result)
        ->paginate($number);

        return response()->json($books, 200);
    }
}
