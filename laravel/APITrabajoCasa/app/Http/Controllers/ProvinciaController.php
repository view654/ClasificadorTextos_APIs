<?php

namespace App\Http\Controllers;

use App\Models\Provincia;


use Illuminate\Http\Request;

use Illuminate\Support\Str;

class ProvinciaController extends Controller
{

    //Filtro por Provincia de Coordenadas
    public function coordenadas($provincia){
        $path = '../python_scraper/provincias.json';
        $json = file_get_contents($path);
        $array = json_decode($json);

        $filtrado = array_filter($array, function($val) use ($provincia) { 
            return $val -> nombre == $provincia;
        });
        $lat = $filtrado[0]->latitud;
        $long = $filtrado[0]->longitud;
        $lat .=' , ';
        $lat .= $long;
        return  $lat; 
    }

}
