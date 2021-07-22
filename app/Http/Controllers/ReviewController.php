<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $date = getdate();  
        $month = $date["mon"] < 10 ? "0".$date["mon"] : $date["mon"];
        $day = $date["mday"] < 10 ? "0".$date["mday"] : $date["mday"];
        $today = $date["year"]."-".$month."-".$day;

        $review = new Review([
            "book_id" =>$request->book_id,
            "review_title" => $request->review_title,
            "review_details" => $request->review_details,
            "review_date" => $today,
            "rating_start" => $request->rating_start,
        ]);
        $review->save();

        return response()->json("Reviewed!!!", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //show review according to book_id
        /*
        $total_reviews = Review::where("book_id", "=", $id)
        ->count();

        $star = Review::select(
            Review::raw("AVG(cast(reviews.rating_start as float)) as avg_star") 
        )
        ->where("book_id" , "=", $id)
        ->get();
        
        $reviews = Review::where("book_id", "=", $id)
        ->get();
        
        $reviews = json_decode($reviews);
        $reviews = (array)($reviews);
        $reviews = [...$reviews, "total_reviews" => $total_reviews, "avg_star" => $star[0]["avg_star"]];
        */
        $reviews = Review::Where("book_id", "=", $id)
        ->paginate(5);
        #echo var_dump($reviews);
        return response()->json($reviews ,200); 
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
