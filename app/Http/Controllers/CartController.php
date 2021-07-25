<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Book;

class CartController extends Controller
{
    public function index()
    {   
        $book = Book::join("authors", "author_id", "=", "authors.id")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->select(
            "books.id", "books.book_title", "books.book_cover_photo", "books.book_price",
            "authors.author_name",
            Book::raw("(CASE
            WHEN ((discounts.discount_start_date <= CURRENT_DATE) and (discounts.discount_end_date >= CURRENT_DATE)) or
            ((discounts.discount_start_date <= CURRENT_DATE) and (discounts.discount_end_date is null))
            THEN discount_price
            ELSE null
            END) as discount_price")
        )
        ->get();

        return response()->json($book, 200);
    }
}
