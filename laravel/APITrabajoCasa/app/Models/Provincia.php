<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'provincia_id',
        'nombre',
        'latitud',
        'longitud'
    ];

}
