import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';

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
  user: Usuario = variablesdeidentificacion.user;
  public isLogged = false;
  constructor() {
    if(this.user != null){
      this.isLogged = true
    }
  }

  ngOnInit(): void {
  }

}
