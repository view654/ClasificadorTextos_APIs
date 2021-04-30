<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Trabajo;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use DB;

class UsuarioController extends Controller
{   

    //Mostrar favoritos de usuario
    public function favoritosTrabajo($user_id){
        $usuario = User::find($user_id);
        /* 
        foreach ($usuario -> trabajos as $trabajo) {

        } */
        return response() -> json($usuario -> trabajos);
    }

    //Obtener todos los usuarios raw
    function getData(){
        return User::all();
    }

    //Mostrar información de usuarios sin contraseña
    public function mostrarUsuarios(){
        $usuarios = DB::select('select user_id, email, nombre, apellidos, fecha_nacimiento, sector, estudios, experiencia_laboral from usuarios');
        return response()->json($usuarios);
    }

    //Mostrar Información de Usuario determinado
    public function mostrarUsuarioId($user_id){
        $usuario = User::find($user_id);
        if (is_null($usuario)) {
            return response() -> json(
                ['message' => 'Usuario no encontrado'], 404
            );
        }
        return response() -> json($usuario::find($user_id), 200);
    }

    //Modificar información de Usuario
    public function modificarUsuarioId(Request $request, $user_id){
        $usuario = User::find($user_id);
        if (is_null($usuario)) {
            return response() -> json(
                ['message' => 'Usuario no encontrado'], 404
            );
        }
        if ($request -> password) {
            echo "con CONTRASEÑA";
            $usuario -> update([
                'nombre'    => $request -> nombre,
                'apellidos' => $request -> apellidos,
                'email'     => $request -> email,
                'password'  => bcrypt($request -> password),
                'fecha_nacimiento' => $request -> fecha_nacimiento,
                'sector'    => $request -> sector,
                'estudios'    => $request -> estudios,
                'experiencia_laboral'    => $request -> experiencia_laboral
            ]);
            
        }else{
            $usuario -> update([
                'nombre'    => $request -> nombre,
                'apellidos' => $request -> apellidos,
                'email'     => $request -> email,
                'fecha_nacimiento' => $request -> fecha_nacimiento,
                'sector'    => $request -> sector,
                'estudios'    => $request -> estudios,
                'experiencia_laboral'    => $request -> experiencia_laboral
            ]);
        }
        
        return response($usuario, 200);
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
                'password'  => bcrypt($request -> password),
                'fecha_nacimiento' => $request -> fecha_nacimiento
            ]);
    
            $response['status'] = 1;
            $response['mensaje'] = "Usuario registrado correctamente";
            $response['codigo'] = 200;
        }

        return response() -> json($response);
    }

    //Login
    public function login(Request $request){
        $credentials = $request -> only('email', 'password');

        try {
            if(!JWTAuth::attempt($credentials)){
                $response['data'] = null;
                $response['status'] = 0;
                $response['codigo'] = 401;
                $response['mensaje'] = "Email o contraseña incorrectos";
                return response() -> json($response);
            }
        } catch (JWTException $e) {
            $response['data'] = null;
            $response['codigo'] = 500;
            $response['mensaje'] = "No se pudo crear el token";
            return response() -> json($response);
        }

        $usuario = auth() -> user();
        $data['token'] = auth() -> claims([
            'user_id' => $usuario -> user_ID,
            'email' => $usuario -> email
        ]) -> attempt($credentials);

        $response['data'] = $data;
        $response['status'] = 1;
        $response['codigo'] = 200;
        $response['mensaje'] = "Login correcto";
        return response() -> json($response);
    }


}