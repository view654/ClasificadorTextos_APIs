<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

use App\Mail\sendCode;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('usuarios', [UsuarioController::class,'getData']);
Route::get('sendCode', function(){
    $correo = new sendCode;
    Mail::to('patricia2291997@gmail.com')->send($correo);
    return "Mensaje enviado";
});
