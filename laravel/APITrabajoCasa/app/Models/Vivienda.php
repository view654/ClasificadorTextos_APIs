<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Casa extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $table = "viviendas";
    public $primaryKey = "vivienda_ID";

    protected $fillable = [
        'link',
        'lugar',
        'precio',
        'habitaciones',
        'banos',
        'metros2',
        'planta',
        'compr_alq_compar',
        'tipo',
        'contacto',
        'imagenes'
    ];
    public function usuarios(){
        return $this->belongsToMany(User::class, 'users_viviendas', 
        'vivienda_ID', 'user_ID');
    }
}
