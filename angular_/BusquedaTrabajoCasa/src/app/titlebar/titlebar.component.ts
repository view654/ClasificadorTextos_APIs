import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class titlebar implements OnInit {
  /*
  public user:Usuario = <Usuario>
    {
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
  */

  constructor() { }

  ngOnInit(): void {
  }

}
