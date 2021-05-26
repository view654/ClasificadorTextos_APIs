<?php

namespace App\Http\Controllers;

use App\Models\Vivienda;
use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

class ViviendasController extends Controller
{

    //Mostrar Viviendas en datos en el json

    public function mostrarViviendasJSON(){
        $path = '../python_scraper/ofertas_vivienda.json';
        $json = file_get_contents($path);
        return $json;
    }

    //Viviendas en BBDD
    public function mostrarTodasViviendas(){
        return Vivienda::all();
    }

    public function filtroBusquedaVivienda($request = null){
        $path = '../python_scraper/ofertas_vivienda.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($request) { 
            $comprobar = Str::contains(strtolower($val -> lugar), strtolower($request));
            if ($comprobar) {
                return $val -> lugar;
            }
            
        });

        return response() -> json($filtrado); 

    }
  
    //Añadir vivienda a la base de datos, tabla viviendas y a favoritos

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

    //Eliminar la relación entre user y vivienda de favoritos
    public function eliminarFavoritoVivienda ($vivienda_id, $user_id){
        $usuario = User::find($user_id);
        $usuario -> viviendas() -> detach($vivienda_id);
    }
  
    public function ActualizarViviendas(){
        $python = "C:\Python39\python.exe";

        $cmd = $python." \"".base_path('python_scraper\actualizarjsonviviendas.py')."\"";

        //dd($cmd);
        $respuesta = shell_exec($cmd);

        return $respuesta; 
    }

    //filtros
    //filtro provincia
    public function filtroLugar($lugar){
        $path = '../python_scraper/ofertas_vivienda.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($lugar) {
            return $val -> lugar == $lugar;
        });

        return response() -> json($filtrado);
    }


}
