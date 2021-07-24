<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Book;

class IdBookController extends Controller
{
    function index(){
        $id_list = Book::select("id")
        ->get();

        $id_list = json_decode($id_list);
        $id_list = (array)($id_list);
        $id_result = [];

        foreach($id_list as $index=>$value){
            foreach($value as $x=>$y){
                $id_result = [...$id_result, $y];
            }
        }

        return response()->json($id_result, 200);
    }
}
