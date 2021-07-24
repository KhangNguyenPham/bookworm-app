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
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReviewActionController;
use App\Http\Controllers\IdBookController;
use App\Http\Controllers\CartController;


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

Route::prefix("/Book")->group(function(){
    
    Route::get("/filtered_by_category/{category_id}/per_page/{number}/sort/{sort_by}",[FilterController::class, "category"]);

    Route::get("/filtered_by_author/{author_id}/per_page/{number}/sort/{sort_by}",[FilterController::class, "author"]);

    Route::get("/filtered_by_star/{star}/per_page/{number}/sort/{sort_by}",[FilterController::class, "star"]);

    Route::apiResource("/sale", Sale::class);

    Route::get("/id_list", [IdBookController::class, "index"]);

    Route::prefix("/feature")->group(function(){

        Route::get("/recommend", [FeaturedBook::class, "recommend"]);

        Route::get("/popular", [FeaturedBook::class, "popular"]);
    });
});

Route::post("/Review/add", [ReviewActionController::class, "add_review"]);

Route::prefix("/Review/{book_id}")->group(function(){
    Route::get("/total_reviews", [ReviewActionController::class, "total_review"]);

    Route::get("/rating_star", [ReviewActionController::class, "rating_star"]);

    Route::get("/list_star/{star}", [ReviewActionController::class, "list_star"]);

    Route::get("/filltered_by_star/{star}/sort/{sort}/per_page/{number}", [ReviewActionController::class, "filltered"]);
});

Route::apiResource("/Book", BookController::class);

Route::apiResource("/Author", AuthorController::class);

Route::apiResource("/Category", CategoryController::class);

Route::apiResource("/Shop", ShopController::class);

Route::get("/Cart", [CartController::class, "index"]);

Route::get("/test", function(){
    return (12-null);
});


