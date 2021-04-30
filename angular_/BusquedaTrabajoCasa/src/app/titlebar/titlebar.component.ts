import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import { Router, RouterLink } from '@angular/router';

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

  user: Usuario;
  isLogged = false;
  constructor(public router:Router) {

  }

  ngOnInit(): void {
    this.user = variablesdeidentificacion.user;
    if(this.user != null){
      this.isLogged = true;
    }

  }
  logOut(){
    this.isLogged = false;
    variablesdeidentificacion.cerrarSesion();
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/titlebar']);
  }
  /*
  static amILoged(){
    this.user = variablesdeidentificacion.user;
    if(this.user != null){
      this.isLogged = true
    }
    console.log("title");
    console.log(this.user)
  }*/

}
