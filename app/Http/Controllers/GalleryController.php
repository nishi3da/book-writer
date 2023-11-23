<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    //

    function index(){
        $gallery_list = Gallery::all();
        return view("gallery", [
            "gallery_list" => $gallery_list
        ]);
    }

    function store(Request $request){

        $image = $request->file("image");
        $path = $image->store("image");


        $gallery = new Gallery();
        $gallery->file_path = $path;
        $gallery->save();


        return redirect("/gallery");
    }

    function preview($id){
        $gallery = Gallery::find($id);
        $path = $gallery->file_path;

        return response()->file(storage_path("app/" . $path));


    }
}
