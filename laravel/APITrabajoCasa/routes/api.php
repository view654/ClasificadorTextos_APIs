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

/** --------------------------------USUARIOS ----------------------------------------------- */

Route::get('mostrarUsuarios', 'App\Http\Controllers\UsuarioController@mostrarUsuarios');
Route::get('mostrarUsuario/{user_id}', 'App\Http\Controllers\UsuarioController@mostrarUsuarioId');

Route::put('modificarUsuario/{user_id}', 'App\Http\Controllers\UsuarioController@modificarUsuarioId');
Route::delete('eliminarUsuario/{user_id}', 'App\Http\Controllers\UsuarioController@eliminarUsuario');

/** --------------------------------TRABAJOS ----------------------------------------------- */

Route::get('mostrarTrabajosJSON', 'App\Http\Controllers\TrabajosController@mostrarTrabajosJSON');
Route::get('mostrarTodosTrabajos', 'App\Http\Controllers\TrabajosController@mostrarTodosTrabajos');
Route::post('agregarTrabajos/{user_id}', 'App\Http\Controllers\TrabajosController@addTrabajo');
Route::get('scraperTrabajos', 'App\Http\Controllers\TrabajosController@ScraperTrabajos');


//Funciones de Filtros
Route::get('filtroProvincia/{provincia}', 'App\Http\Controllers\TrabajosController@filtroProvincia');
Route::get('filtroJornada/{jornada}', 'App\Http\Controllers\TrabajosController@filtroJornada');
Route::get('filtroContrato/{contrato}', 'App\Http\Controllers\TrabajosController@filtroContrato');
Route::get('filtroGeneral/{contrato}/{jornada}/{provincia}', 'App\Http\Controllers\TrabajosController@filtroGeneral');


//Funciones de Favoritos o tabla intermedia de usuarios y trabajos
Route::get('favoritosTrabajo/{user_id}', 'App\Http\Controllers\UsuarioController@favoritosTrabajo');

/** --------------------------------VIVIENDAS ----------------------------------------------- */

Route::get('mostrarViviendasJSON', 'App\Http\Controllers\ViviendasController@mostrarViviendasJSON');
Route::get('mostrarTodasViviendas', 'App\Http\Controllers\ViviendasController@mostrarTodosViviendas');
Route::post('agregarViviendas/{user_id}', 'App\Http\Controllers\ViviendasController@addVivienda');


//Funciones de Favoritos o tabla intermedia de usuarios y viviendas
Route::get('favoritosViviendas/{user_id}', 'App\Http\Controllers\UsuarioController@favoritasViviendas');

Route::get('mostrarTrabajos', 'App\Http\Controllers\TrabajosController@mostrarTrabajos');

Route::middleware(['cors'])->group(function () {
    Route::get('sendCode/{correoUser}', 'App\Http\Controllers\UsuarioController@sendCode');
});

