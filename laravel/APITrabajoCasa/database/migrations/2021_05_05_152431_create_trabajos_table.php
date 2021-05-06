<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajos', function (Blueprint $table) {
            $table->increments('trabajo_ID');
            $table->string('titulo', 100)->nullable();
            $table->string('localidad', 100)->nullable();
            $table->string('enlace', 100)->nullable();
            $table->string('jornada', 100)->nullable();
            $table->string('contrato', 100)->nullable();
            $table->string('salario', 100)->nullable();
            $table->string('experiencia', 100)->nullable();
            $table->string('funciones', 100)->nullable();
            $table->string('requisitos', 100)->nullable();
            $table->string('ofrece', 100)->nullable();
            $table->string('area', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabajos');
    }
}
