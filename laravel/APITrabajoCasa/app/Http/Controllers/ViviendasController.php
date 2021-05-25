<?php

namespace App\Http\Controllers;

use App\Models\Vivienda;
use App\Models\User;

use Illuminate\Http\Request;


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
        $path = '../python_scraper/ofertas_viviendas.json';
        $json = file_get_contents($path);
        $array = json_decode($json);
        $filtro = '';

        if ($lugar){
            $filtro = array_filter($array, function($val) use ($lugar){
                return $val -> lugar == $lugar;
                
            });
        }else{
            $filtro = json_decode($json);
        }

        if ($preciomax){
            $filtro = array_filter($filtro, function($val) use ($preciomax){
                $preciosinsimbolo = rtrim($preciomax, " €");
                $intprecio = intval($preciosinsimbolo);
                return $val -> precio <= $intprecio;

            });
        }

        if ($preciomin){
            $filtro = array_filter($filtro, function($val) use ($preciomin){
                $preciosinsimbolo = rtrim($preciomin, " €");
                $intprecio = intval($preciosinsimbolo);  
                return $val -> precio >= $intprecio;

            });
        }

        if ($habitacionesmax){
            $filtro = array_filter($filtro, function($val) use ($habitacionesmax){
                return $val -> habitaciones <= $habitacionesmax;
            });
        }
        if ($habitacionesmin){
            echo($habitacionesmin);
            $filtro = array_filter($filtro, function($val) use ($habitacionesmin){
                $preciosinsimbolo = rtrim($habitacionesmin, " habs.");
                $intprecio = intval($preciosinsimbolo);  
                echo($intprecio);
                return $val -> habitaciones >= $intprecio;

            });
        }

        if ($banosmax){
            $filtro = array_filter($filtro, function($val) use ($banosmax){
                $preciosinsimbolo = rtrim($banosmax, " baños");
                $intprecio = intval($preciosinsimbolo);  
                return $val -> banos <= $intprecio;

            });
        }
        if ($banosmin){
            $filtro = array_filter($filtro, function($val) use ($banosmin){
                $preciosinsimbolo = rtrim($banosmin, " baños");
                $intprecio = intval($preciosinsimbolo);  
                return $val -> banos >= $intprecio;

            });
        }

        if ($metros2max){
            $filtro = array_filter($filtro, function($val) use ($metros2max){
                $preciosinsimbolo = rtrim($metros2max, " m²");
                $intprecio = intval($preciosinsimbolo);  
                return $val -> metros2 <= $intprecio;

            });
        }
        if ($metros2min){
            $filtro = array_filter($filtro, function($val) use ($metros2min){
                $preciosinsimbolo = rtrim($metros2min, " m²");
                $intprecio = intval($preciosinsimbolo);  
                return $val -> metros2 >= $intprecio;

            });
        }

        if ($planta){
            $filtro = array_filter($filtro, function($val) use ($planta){
                return $val -> planta == $planta;

            });
        }

        if ($compr_alq_compar){
            $filtro = array_filter($filtro, function($val) use ($compr_alq_compar){

                return $val -> compr_alq_compar == $compr_alq_compar;

            });
        }

        if ($tipo){
            $filtro = array_filter($filtro, function($val) use ($tipo){

                return $val -> tipo == $tipo;

            });
        }
        return response() -> json($filtro);
    }

}
