<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Funciones de login y registro
Route::post('registro', 'App\Http\Controllers\UsuarioController@registro');
Route::post('login', 'App\Http\Controllers\UsuarioController@login');

//Funciones de Usuarios
Route::get('mostrarUsuarios', 'App\Http\Controllers\UsuarioController@mostrarUsuarios');
Route::get('mostrarUsuario/{user_id}', 'App\Http\Controllers\UsuarioController@mostrarUsuarioId');

Route::put('modificarUsuario/{user_id}', 'App\Http\Controllers\UsuarioController@modificarUsuarioId');

//Funciones de Trabajos
Route::get('mostrarTrabajosJSON', 'App\Http\Controllers\TrabajosController@mostrarTrabajosJSON');
Route::get('mostrarTodosTrabajos', 'App\Http\Controllers\TrabajosController@mostrarTodosTrabajos');
Route::post('agregarTrabajos/{user_id}', 'App\Http\Controllers\TrabajosController@addTrabajo');

//Funciones de Favoritos o tabla intermedia de usuarios y trabajos
Route::get('favoritosTrabajo/{user_id}', 'App\Http\Controllers\UsuarioController@favoritosTrabajo');
