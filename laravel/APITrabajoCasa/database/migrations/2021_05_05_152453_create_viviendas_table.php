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
            $table->string('link', 100);
            $table->string('lugar', 100);
            $table->integer('precio');
            $table->string('habitaciones', 100);
            $table->string('banos', 100);
            $table->string('metros2', 100);
            $table->string('planta', 100);
            $table->string('tipo', 100);
            $table->string('compr_alq_compar', 100);
            $table->text('imagenes');
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
