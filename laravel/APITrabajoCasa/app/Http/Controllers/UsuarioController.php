<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsuarioController extends Controller
{
    //Obtener data
    function getData(){
        return User::all();
    }

    //Registro
    public function registro(Request $request){
        $usuario = User::where('email', $request['email']) -> first();

        if($usuario) {
            $response['status'] = 0;
            $response['mensaje'] = "Email en uso";
            $response['codigo'] = 409;
        }else{
            $usuario = User::create([
                'nombre'    => $request -> nombre,
                'apellidos' => $request -> apellidos,
                'email'     => $request -> email,
                'password'  => bcrypt($request -> password)
            ]);
    
            $response['status'] = 1;
            $response['mensaje'] = "Usuario registrado correctamente";
            $response['codigo'] = 200;
        }

        

        return response() -> json($response);
    }

}