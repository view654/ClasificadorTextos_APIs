import { Component } from '@angular/core';
import { Usuario } from './usuario_interfaz';

@Component({
    selector: 'primer',
    templateUrl:'./primer.component.html',
    styleUrls: ['./primer.component.css']

})

export class primer{
    public isLogged: boolean = false;
    public isSearch: boolean = false;

    public busqueda: string;
    public trabajo: boolean = true;
    public parametro: string;

    public user:Usuario = <Usuario>{
        ID:1,
        Nombre:"John",
        Apellidos:"Smith",
        Fecha_nacimiento:new Date(3/4/20),        
        Email:"JohnSmith@gmail.com",
        Contraseña:"string",
        Sector:"Informatica",
        Estudios:"Ingenieria Informatica",
        Esperiencia_laboral:"Nop",
        idiomas:["Español","Ingles","Italiano"]
    }

    constructor(){
        console.log("Componente primer cargado!!");
        console.log(this.user.Fecha_nacimiento);
        
    }

}