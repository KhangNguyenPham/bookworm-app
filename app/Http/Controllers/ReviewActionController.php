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

    function list_star($book_id, $star){
        $counting_star = Review::where("book_id", $book_id)
        ->where("rating_start", $star)
        ->count();
        return response()->json($counting_star, 200);
    }

    function sort_by_nto($id, $star, $number){
        $reviews = Review::where("book_id",$id)
        ->where("rating_start", $star)
        ->orderBy("review_date", "desc")
        ->paginate($number);
        return $reviews;
    }

    function sort_by_otn($id, $star, $number){
        $reviews = Review::where("book_id",$id)
        ->where("rating_start", $star)
        ->orderBy("review_date", "asc")
        ->paginate($number);
        return $reviews;
    }

    function filltered($id, $star, $sort, $number){
        $fillter = new ReviewActionController();
        switch ($sort){
            case "oldest":
                return response()->json($fillter->sort_by_nto($id, $star, $number), 200);
                break;
            case "newest":
                return response()->json($fillter->sort_by_otn($id, $star, $number), 200);
                break;
            default:
                return "404-not found";
        } 
    }

    public function add_review(Request $request){
        $date = getdate();  
        $month = $date["mon"] < 10 ? "0".$date["mon"] : $date["mon"];
        $day = $date["mday"] < 10 ? "0".$date["mday"] : $date["mday"];
        $today = $date["year"]."-".$month."-".$day;

        $data = $request->json()->all();
        $data = (array)$data;
        // $review = new Review([
        //     "book_id" =>$request->"book_id",
        //     "review_title" => $request->"review_title",
        //     "review_details" => $request->"review_details",
        //     "review_date" => $today,
        //     "rating_start" => $request->get("rating_start"),
        // ]);
        // $review->save();

        //return response()->json("Reviewed!!!", 200);
        return $data;
    }
}
