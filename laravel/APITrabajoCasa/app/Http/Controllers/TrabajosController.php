<?php

namespace App\Http\Controllers;

use App\Models\Trabajo;
use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

class TrabajosController extends Controller
{
    /** ------------------- MOSTRAR DATOS DESCARGADOS POR WEBSCRAPING -----------------------------------------*/
    
    public function mostrarTrabajosJSON(){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        return $json;
    }

    /** ------------------- MOSTRAR DATOS ALMACENADOS EN LA BASE DE DATOS -----------------------------------------*/
    
    public function mostrarTodosTrabajos(){
        return Trabajo::all();
    }

    /** ------------------- FAVORITOS - RELACION CON USUARIOS-----------------------------------------*/

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
            $trabajo = Trabajo::create($request->json()->all());
            $usuario = User::find($user_id);
            $usuario -> trabajos() -> attach($trabajo -> trabajo_ID);
            $response['usuario_ID'] = $user_id;
            $response['trabajo_ID'] = $trabajo -> trabajo_ID;
        }
        return response() -> json($response); 
    }

    //Eliminar la relación entre usuario y trabajo, para mostrar en favoritos
    public function eliminarFavoritoTrabajo($trabajo_id, $user_id){
        $usuario = User::find($user_id);
        $usuario -> trabajos() -> detach($trabajo_id);
    }

    /** ------------------- REALIZAR SCRIPTS DE PYTHON -----------------------------------------*/

    //Scrapper de Python para descargar los trabajos
    public function ScraperTrabajos(){
        $python = "C:\Python39\python.exe";

        $cmd = $python." \"".base_path('python_scraper\scraper_infoempleo.py')."\"";
        //dd($cmd);
        $respuesta = shell_exec($cmd);

        return $respuesta;
    } 

    //Scrapper de Python para eliminar los trabajos que estan descontinuados
    public function ActualizarTrabajos(){
        $python = "C:\Python39\python.exe";

        $cmd = $python." \"".base_path('python_scraper\actualizarTrabajos.py')."\"";
        //dd($cmd);
        $respuesta = shell_exec($cmd);

        return $respuesta;
    } 

    /** ------------------- FILTROS DE TRABAJOS -----------------------------------------*/
    
    //Filtro por Provincias de Trabajos
    public function filtroProvincia($provincia){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($provincia) { 
            return $val -> localidad == $provincia;
        });

        return response() -> json($filtrado); 
    }

    //Filtro por Jornada de Trabajos
    public function filtroJornada($jornada){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($jornada) { 
            return $val -> jornada == $jornada;
        });

        return response() -> json($filtrado); 
    }

    //Filtro por Contrato de Trabajos
    public function filtroContrato($contrato){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($contrato) { 
            return $val -> contrato == $contrato;
        });

        return response() -> json($filtrado); 
    }

    //Filtro de Jornada, Provincia y Contrato de Trabajos
    public function filtroGeneral($provincia = null, $contrato = null, $jornada = null){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);
        $filtro = '';

        if (strcmp($provincia, "null")===0){
            $filtro = json_decode($json);
        }else{
            $filtro = array_filter($array, function($val) use ($provincia){
                return $val -> localidad == $provincia;});
        }

        if(strcmp($contrato, "null")===0){
            
        }else{
            $filtro = array_filter($filtro, function($val) use ($contrato) { 
                return  $val -> contrato == $contrato;
            });
        }

        if(strcmp($jornada, "null")===0){
            
        }else{
            $filtro = array_filter($filtro, function($val) use ($jornada) { 
                return  $val -> jornada == $jornada;
            });
        }

        return response() -> json($filtro); 
        
    }

    public function filtroBusqueda($request = null){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($request) { 
            $titulo = Str::contains(strtolower($val -> titulo), strtolower($request));
            $descripcion = Str::contains(strtolower($val -> funciones), strtolower($request));
            if ($titulo | $descripcion) {
                return $val -> titulo || $val -> funciones;
            }
            
        });

        return response() -> json($filtrado); 

    }

}
