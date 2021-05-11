<?php

namespace App\Http\Controllers;

use App\Models\Trabajo;
use App\Models\User;

use Illuminate\Http\Request;

class TrabajosController extends Controller
{
    private $provincia;
    
    //Mostrar Trabajos en datos generales
    public function mostrarTrabajosJSON(){
        $path = '../python_scraper/ofertas_trabajo.json';
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

    public function ScraperTrabajos(){
        $python = "C:\Python39\python.exe";

        $cmd = $python." \"".base_path('python_scraper\scraper_infoempleo.py')."\"";
        //dd($cmd);
        $respuesta = shell_exec($cmd);

        return $respuesta;
    } 

    public function filtroProvincia($provincia){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($provincia) { 
            return $val -> localidad == $provincia;
        });

        return response() -> json($filtrado); 
    }

    public function filtroJornada($jornada){
        $jornada = $jornada . ' ';
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($jornada) { 
            return $val -> jornada == $jornada;
        });

        return response() -> json($filtrado); 
    }

    public function filtroContrato($contrato){
        $contrato = ' '. $contrato . ' ';
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($contrato) { 
            return $val -> contrato == $contrato;
        });

        return response() -> json($filtrado); 
    }

    public function filtroGeneral($contrato, $jornada, $provincia){
        $contrato = ' '. $contrato . ' ';
        $jornada = $jornada . ' ';
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($contrato, $jornada, $provincia) { 
            return  $val -> contrato == $contrato && 
                    $val -> jornada == $jornada &&
                    $val -> localidad == $provincia;
        });

        return response() -> json($filtrado); 
    }




}
