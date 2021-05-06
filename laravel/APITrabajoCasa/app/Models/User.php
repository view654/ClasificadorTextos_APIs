<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject 
{
    use HasFactory, Notifiable;
    public $timestamps = false;
    public $table = "usuarios";
    public $primaryKey = 'user_ID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'apellidos',
        'email',
        'password',
        'fecha_nacimiento',
        'sector',
        'estudios',
        'experiencia_laboral'
    ];

    public function trabajos(){
        return $this->belongsToMany(Trabajo::class, 'trabajo_usuario', 
        'user_ID', 'trabajo_ID');
    }

    public function viviendas(){
        return $this->belongsToMany(Trabajo::class, 'users_viviendas', 
        'user_ID', 'vivienda_ID');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    

    
}
