<?php

namespace App\Http\Controllers;

use App\Models\Vivienda;
use App\Models\User;

use Illuminate\Http\Request;

class ViviendasController extends Controller{
    
    //Mostrar Viviendas en datos generales
    public function mostrarViviendasJSON(){
        $path = '../data_json/ofertas_vivienda.json';
        $json = file_get_contents($path);
        return $json;
    }

//Añadir viviendas a la base de datos
public function addVivienda(Request $request, $user_id){
    $enlace_vivienda = Vivienda::where('link', $request['link']) -> first();
    if($enlace_vivienda){
        $response['status'] = 0;
        $response['mensaje'] = "Trabajo ya existe";
        $response['codigo'] = 409;
        $usuario = User::find($user_id);
        $usuario -> viviendas() -> attach($enlace_vivienda -> vivienda_ID);
        $response['usuario_ID'] = $user_id;
        $response['vivienda_ID'] = $enlace_vivienda -> vivienda_ID;
    }else{
        $vivienda = Vivienda::create($request -> all());
        $usuario = User::find($user_id);
        $usuario -> viviendas() -> attach($vivienda -> vivienda_ID);
        $response['usuario_ID'] = $user_id;
        $response['vivienda_ID'] = $vivienda -> vivienda_ID;
    }
    
    return response() -> json($response); 
}

public function mostrarTodasViviendas(){
    return Vivienda::all();
}
}
