<?php

namespace App\Http\Controllers;

use App\Models\Trabajo;

use Illuminate\Http\Request;

class TrabajosController extends Controller
{
    
    public function mostrarTrabajos(){
        $path = '../data_json/ofertas_trabajo.json';
        $json = file_get_contents($path);
        return $json;
    }

    public function addTrabajo(Request $request){
        $trabajo = Trabajo::create($request -> all());
        return response($trabajo, 201);
    }
}
