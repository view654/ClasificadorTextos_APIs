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
            $table->string('link')->nullable();
            $table->string('lugar')->nullable();
            $table->integer('precio')->nullable();
            $table->integer('habitaciones')->nullable();
            $table->integer('banos')->nullable();
            $table->integer('metros2')->nullable();
            $table->string('planta')->nullable();
            $table->string('tipo')->nullable();
            $table->string('compr_alq_compar')->nullable();
            $table->text('imagenes', 300)->nullable();
            $table->string('contacto')->nullable();
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
