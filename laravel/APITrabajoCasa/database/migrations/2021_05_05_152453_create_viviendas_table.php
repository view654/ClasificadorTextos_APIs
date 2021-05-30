<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateViviendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('viviendas', function (Blueprint $table) {
            $table->increments('vivienda_ID');
            $table->string('link', 100)->nullable();
            $table->string('lugar', 100)->nullable();
            $table->integer('precio')->nullable();
            $table->integer('habitaciones')->nullable();
            $table->integer('banos')->nullable();
            $table->integer('metros2')->nullable();
            $table->string('planta', 100)->nullable();
            $table->string('tipo', 100)->nullable();
            $table->string('compr_alq_compar', 100)->nullable();
            $table->text('imagenes')->nullable();
            $table->string('contacto', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('viviendas');
    }
}
