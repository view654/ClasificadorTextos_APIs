<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuarioViviendaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_vivienda', function (Blueprint $table) {
            $table->integer('user_ID')->unsigned();
            $table->foreign('user_ID')->references('user_ID')->on('usuarios');
            $table->integer('vivienda_ID')->unsigned();
            $table->foreign('vivienda_ID')->references('vivienda_ID')->on('viviendas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuario_vivienda');
    }
}
