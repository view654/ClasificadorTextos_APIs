<?php

namespace App\Http\Controllers;

use App\Models\Vivienda;
use App\Models\User;

use Illuminate\Http\Request;

class ViviendasController extends Controller{

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
    //Script
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

    //General
    public function filtroGeneral($lugar, $preciomax, $preciomin, $habitacionesmax , $habitacionesmin, $banosmax , $banosmin, $metros2max, $metros2min, $planta, $compr_alq_compar, $tipo){

        $path = '../python_scraper/ofertas_vivienda.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        if (!empty($lugar)){
            $array = array_filter($array, function($val) use ($lugar){
                return $val -> lugar == $lugar
            });
        }

        if (!empty($preciomax)){
            $array = array_filter($array, function($val) use ($preciomax){
                return $val -> precio <= $preciomax
            });
        }

        if (!empty($preciomin)){
            $array = array_filter($array, function($val) use ($preciomin){
                return $val -> precio >= $preciomin
            });
        }

        if (!empty($habitacionesmax)){
            $array = array_filter($array, function($val) use ($habitacionesmax){
                return $val -> habitaciones <= $habitacionesmax
            });
        }
        if (!empty($habitacionesmin)){
            $array = array_filter($array, function($val) use ($habitacionesmax){
                return $val -> habitaciones >= $habitacionesmin
            });
        }

        if (!empty($banosmax)){
            $array = array_filter($array, function($val) use ($banosmax){
                return $val -> banos <= $banosmax
            });
        }
        if (!empty($banosmin)){
            $array = array_filter($array, function($val) use ($banosmin){
                return $val -> banos >= $banosmin
            });
        }

        if (!empty($metros2max)){
            $array = array_filter($array, function($val) use ($metros2max){
                return $val -> metros2 <= $metros2max
            });
        }
        if (!empty($metros2min)){
            $array = array_filter($array, function($val) use ($metros2min){
                return $val -> metros2 >= $metros2min
            });
        }

        if (!empty($planta)){
            $array = array_filter($array, function($val) use ($planta){
                return $val -> planta == $planta
            });
        }

        if (!empty($compr_alq_compar)){
            $array = array_filter($array, function($val) use ($compr_alq_compar){
                return $val -> compr_alq_compar == $compr_alq_compar
            });
        }

        if (!empty($tipo)){
            $array = array_filter($array, function($val) use ($tipo){
                return $val -> tipo == $tipo
            });
        }
        return response() -> json($array);
    }
