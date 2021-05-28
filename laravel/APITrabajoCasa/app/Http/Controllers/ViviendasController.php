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
        $path = '../python_scraper/ofertas_viviendas.json';
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
        $path = '../python_scraper/ofertas_viviendas.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($lugar) {
            return $val -> lugar == $lugar;
        });

        return response() -> json($filtrado);
    }

    //General
    public function filtroGeneralViviendas($lugar = null, $preciomax= null, $preciomin= null, $habitacionesmax = null, $habitacionesmin= null, $banosmax = null, $banosmin= null, $metros2max= null, $metros2min= null, $planta= null, $compr_alq_compar= null, $tipo= null){
        
        //dd($lugar, $preciomax, $preciomin, $habitacionesmax, $habitacionesmin, $banosmax, $banosmin);
        
        $path = '../python_scraper/ofertas_viviendas.json';
        $json = file_get_contents($path);
        $array = json_decode($json);
        $filtro = '';

        if (strcmp($lugar, "null")===0){
            
            $filtro = json_decode($json);
        }else{
            
            $filtro = array_filter($array, function($val) use ($lugar){
                return $val -> lugar == $lugar;});

        }
        if (strcmp($preciomax, "null")===0){
            
        }else{
            $filtro = array_filter($filtro, function($val) use ($preciomax){
                return $val -> precio <= (int)$preciomax;

            });
        }

        if (strcmp($preciomin, "null")===0){
        }else{
            $filtro = array_filter($filtro, function($val) use ($preciomin){
                return $val -> precio >= (int)$preciomin;
            });
        }

        if (strcmp($habitacionesmax, "null")===0){
        }else{
            $filtro = array_filter($filtro, function($val) use ($habitacionesmax){
                return $val -> habitaciones <= (int)$habitacionesmax;
            });
        }
        if (strcmp($habitacionesmin, "null")===0){}
        else{
            echo($habitacionesmin);
            $filtro = array_filter($filtro, function($val) use ($habitacionesmin){
                return $val -> habitaciones >= (int)$habitacionesmin;
            });
        }

        if (strcmp($banosmax, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($banosmax){

                return $val -> banos <= (int)$banosmax;

            });
        }
        if (strcmp($banosmin, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($banosmin){
                return $val -> banos >= (int)$banosmin;

            });
        }

        if (strcmp($metros2max, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($metros2max){
                return $val -> metros2 <= (int)$metros2max;

            });
        }
        if (strcmp($metros2min, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($metros2min){
                return $val -> metros2 >= (int)$metros2min;

            });
        }

        if (strcmp($planta, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($planta){
                return $val -> planta == (int)$planta;

            });
        }

        if (strcmp($compr_alq_compar, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($compr_alq_compar){

                return $val -> compr_alq_compar == $compr_alq_compar;

            });
        }

        if (strcmp($tipo, "null")===0){}
        else{
            $filtro = array_filter($filtro, function($val) use ($tipo){

                return $val -> tipo == $tipo;

            });
        }
        return response() -> json($filtro);
    }

}
