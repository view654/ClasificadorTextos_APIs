<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('user_ID');
            $table->string('password', 100);
            $table->string('email', 100) -> unique('email');
            $table->string('nombre', 100);
            $table->string('apellidos', 100);
            $table->date('fecha_nacimiento');
            $table->string('sector', 100)->nullable();
            $table->string('estudios', 100)->nullable();
            $table->string('experiencia_laboral', 100)->nullable();
            $table->text('idiomas')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
