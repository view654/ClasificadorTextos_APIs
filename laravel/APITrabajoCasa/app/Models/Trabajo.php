<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trabajo extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $table = "trabajos";
    public $primaryKey = 'trabajo_ID';

    protected $fillable = [
        'titulo',
        'localidad',
        'enlace',
        'jornada',
        'contrato',
        'salario',
        'experiencia',
        'funciones',
        'requisitos',
        'ofrece',
        'area'
    ];


}
