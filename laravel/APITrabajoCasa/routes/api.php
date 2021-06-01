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
Route::put('modificarContrasena/{user_id}', 'App\Http\Controllers\UsuarioController@modificarContrasena');
Route::delete('eliminarUsuario/{user_id}', 'App\Http\Controllers\UsuarioController@eliminarUsuario');

/** --------------------------------TRABAJOS ----------------------------------------------- */

Route::get('mostrarTrabajosJSON', 'App\Http\Controllers\TrabajosController@mostrarTrabajosJSON');
Route::get('mostrarTodosTrabajos', 'App\Http\Controllers\TrabajosController@mostrarTodosTrabajos');
Route::get('scraperTrabajos', 'App\Http\Controllers\TrabajosController@ScraperTrabajos');
Route::get('ActualizarTrabajos', 'App\Http\Controllers\TrabajosController@ActualizarTrabajos');

//Funciones de Filtros
Route::get('filtroProvincia/{provincia}', 'App\Http\Controllers\TrabajosController@filtroProvincia');
Route::get('filtroJornada/{jornada}', 'App\Http\Controllers\TrabajosController@filtroJornada');
Route::get('filtroContrato/{contrato}', 'App\Http\Controllers\TrabajosController@filtroContrato');
Route::get('filtroGeneral/{provincia?}/{contrato?}/{jornada?}', 'App\Http\Controllers\TrabajosController@filtroGeneral');


//Funciones de Favoritos o tabla intermedia de usuarios y trabajos
Route::get('favoritosTrabajo/{user_id}', 'App\Http\Controllers\UsuarioController@favoritosTrabajo');
Route::post('agregarTrabajos/{user_id}', 'App\Http\Controllers\TrabajosController@addTrabajo');
Route::delete('eliminarFavoritoTrabajo/{user_id}/{trabajo_id}', 'App\Http\Controllers\TrabajosController@eliminarFavoritoTrabajo');


/** --------------------------------VIVIENDAS ----------------------------------------------- */

Route::get('mostrarViviendasJSON', 'App\Http\Controllers\ViviendasController@mostrarViviendasJSON');

Route::get('mostrarTodasViviendas', 'App\Http\Controllers\ViviendasController@mostrarTodasViviendas');
Route::get('ActualizarViviendas', 'App\Http\Controllers\ViviendasController@ActualizarViviendas');

//Funciones filtros
Route::get('filtroLugar/{lugar}', 'App\Http\Controllers\ViviendasController@filtroLugar');
Route::get('filtroGeneralViviendas/{lugar}/{preciomax}/{preciomin}/{habitacionesmax}/{habitacionesmin}/{banosmax}/{banosmin}/{metros2max}/{metros2min}/{planta}/{compr_alq_compar}/{tipo}', 'App\Http\Controllers\ViviendasController@filtroGeneralViviendas');

//Funciones de modificacion de la tabla de favoritos
Route::post('agregarViviendas/{user_id}', 'App\Http\Controllers\ViviendasController@addVivienda');
Route::get('favoritosViviendas/{user_id}', 'App\Http\Controllers\UsuarioController@favoritasViviendas');
Route::delete('eliminarFavoritoVivienda/{user_id}/{vivienda_id}', 'App\Http\Controllers\ViviendasController@eliminarFavoritoVivienda');


Route::middleware(['cors'])->group(function () {
    Route::get('sendCode/{correoUser}', 'App\Http\Controllers\UsuarioController@sendCode');
});

/** --------------------------------COORDENADAS ----------------------------------------------- */

Route::get('coordenadas/{provincia}', 'App\Http\Controllers\ProvinciaController@coordenadas');