<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajoUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajo_usuario', function (Blueprint $table) {
            $table->integer('trabajo_ID')->unsigned();
            $table->foreign('trabajo_ID')->references('trabajo_ID')->on('trabajos');
            $table->integer('user_ID')->unsigned();
            $table->foreign('user_ID')->references('user_ID')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabajo_usuario');
    }
}
