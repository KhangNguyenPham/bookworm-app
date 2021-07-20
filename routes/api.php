<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\Sale;
use App\Http\Controllers\FeaturedBook;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("Book")->group(function(){
    
    Route::get("/filtered_by_category/{category_id}/per_page/{number}",[FilterController::class, "category"]);

    Route::get("/filtered_by_author/{author_id}/per_page/{number}",[FilterController::class, "author"]);

    Route::get("/filtered_by_star/{star}",[FilterController::class, "star"]);

    Route::apiResource("/sale", Sale::class);

    Route::prefix("/feature")->group(function(){

        Route::get("/recommend", [FeaturedBook::class, "recommend"]);

        Route::get("/popular", [FeaturedBook::class, "popular"]);
    });
});

Route::apiResource("Book", BookController::class);

Route::apiResource("Author", AuthorController::class);

Route::apiResource("Category", CategoryController::class);

Route::apiResource("Shop", ShopController::class);

/*
Route::get("/test", function(){
    return "test";
});

Route::get("/test/db", function(){
    $author = DB::table('authors')->get();
    return response()->json($author,200);
});

Route::get("test/eloquent", function(){
    return $book = Book::join("discounts", "discounts.book_id", "=", "books.id")->get();
});

Route::get("/book/nophoto", function(){
    return $book = Book::where("book_cover_photo",null)->get();
});

Route::get("/book/{id}", function($id){
    return $book = Book::select("books.author_id", "authors.author_name")->where("books.id",$id)->join("authors", "books.author_id", "=", "authors.id")->get();
});
*/


