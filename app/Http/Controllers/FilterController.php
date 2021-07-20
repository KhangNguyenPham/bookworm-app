<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Book;

class FilterController extends Controller
{
    public function category($category_id, $number){
        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->select("books.id", "book_title", "book_price", "book_cover_photo", "authors.author_name")
        ->where("category_id", $category_id)
        ->paginate($number);
        return response()->json($books, 200);
    }

    public function author($author_id, $number){
        $books = Book::join("authors", "books.author_id", "=", "authors.id")
        ->select("books.id", "book_title", "book_price", "book_cover_photo", "authors.author_name")
        ->where("author_id", $author_id)
        ->paginate($number);
        return response()->json($books, 200);
    }

    public function star($star){
        return response()->json($star, 200);
    }
}
