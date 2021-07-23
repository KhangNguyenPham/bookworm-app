<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Review;

class ReviewActionController extends Controller
{
    function total_review($book_id){
        $total_reviews = Review::where("book_id", "=", $book_id)
        ->count();

        return response()->json( $total_reviews, 200);
    }

    function rating_star($book_id){
        $star = Review::select(
            Review::raw("AVG(cast(reviews.rating_start as float)) as avg_star") 
        )
        ->where("book_id" , "=", $book_id)
        ->get();

        return response()->json($star[0], 200);
    }

    function filltered($id,$star){
        switch ($star){
            case "1":
                return response()->json(1, 200);
                break;
            case "2":
                return response()->json(2, 200);
                break;
            case "3":
                return response()->json(3, 200);
                break;
            case "4":
                return response()->json(4, 200);
                break;
            case "5":
                return response()->json(5, 200);
                break;
            default:
                return "404-not found";
        } 
    }
}
