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

    public function ActualizarTrabajos(){
        $python = "C:\Python39\python.exe";

        $cmd = $python." \"".base_path('python_scraper\actualizarTrabajos.py')."\"";
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

    public function filtroGeneral($provincia = null, $contrato = null, $jornada = null){
        $path = '../python_scraper/ofertas_trabajo.json';
        $json = file_get_contents($path);
        $array = json_decode($json);
        $filtro = '';

        if($provincia){
            $filtro = array_filter($array, function($val) use ($provincia) { 
                return  $val -> localidad == $provincia;
            });
        }

        if($contrato){
            $contrato = ' '. $contrato . ' ';
            $filtro = array_filter($filtro, function($val) use ($contrato) { 
                return  $val -> contrato == $contrato;
            });
        }

        if($jornada){
            $jornada = $jornada . ' ';
            $filtro = array_filter($filtro, function($val) use ($jornada) { 
                return  $val -> jornada == $jornada;
            });
        }

        

        return response() -> json($filtro); 
        
    }




}
