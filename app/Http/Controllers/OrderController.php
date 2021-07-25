<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Book;

class OrderController extends Controller
{
    public function index(Request $request){

        DB::insert("insert into orders(order_date, order_amount) values (?,?)", [$request["order_date"], $request["order_amount"]]);
        $book_list = $request["list"];
        $id_order = DB::table("orders")->max("id");
        foreach($book_list as $index=>$value){
            DB::insert("insert into order_items(order_id, book_id, quantity, price) values (?,?,?,?)",
            [$id_order, $value["id"], $value["quantity"], (float)$value["price"]]);
        }
     
        return response()->json("You have ordered successfully", 200);           
    }
}
