<?php

namespace App\Http\Controllers;

use App\Models\Trabajo;
use App\Models\User;

use Illuminate\Http\Request;

class TrabajosController extends Controller
{
    
    //Mostrar Trabajos en datos generales
    public function mostrarTrabajosJSON(){
        $path = '../data_json/ofertas_trabajo.json';
        $json = file_get_contents($path);
        return $json;
    }

    //Añadir trabajos a la base de datos con relación a usuario
    public function addTrabajo(Request $request, $user_id){
        $enlace_trabajo = Trabajo::where('enlace', $request['enlace']) -> first();
        if($enlace_trabajo){
            $response['status'] = 0;
            $response['mensaje'] = "Trabajo ya existe";
            $response['codigo'] = 409;
            $usuario = User::find($user_id);
            $usuario -> trabajos() -> attach($enlace_trabajo -> trabajo_ID);
            $response['usuario_ID'] = $user_id;
            $response['trabajo_ID'] = $enlace_trabajo -> trabajo_ID;
        }else{
            $trabajo = Trabajo::create($request -> all());
            $usuario = User::find($user_id);
            $usuario -> trabajos() -> attach($trabajo -> trabajo_ID);
            $response['usuario_ID'] = $user_id;
            $response['trabajo_ID'] = $trabajo -> trabajo_ID;
        }
        
        return response() -> json($response); 
    }

    public function mostrarTodosTrabajos(){
        return Trabajo::all();
    }




}
