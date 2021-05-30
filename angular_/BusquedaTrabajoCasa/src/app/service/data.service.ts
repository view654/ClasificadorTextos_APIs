import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpClient:HttpClient) {}
  //USUARIOS
  getData(){
    return this.httpClient.get('https://rejob-prueba.herokuapp.com/api/mostrarUsuarios');
  }
  log(datos){
    return this.httpClient.post('https://rejob-prueba.herokuapp.com/api/login',datos);
  }
  getUsuarios(){
    return this.httpClient.get('https://rejob-prueba.herokuapp.com/api/mostrarUsuarios');
  }

  getUsuarioByID(id){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/mostrarUsuario/';
    dir = dir.concat(id.toString());
    return this.httpClient.get(dir);
  }
  modificarUsuario(id,datos){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/modificarUsuario/';
    dir = dir.concat(id.toString());
    return this.httpClient.put(dir,datos);
  }
   
  registro(datos){
    return this.httpClient.post('https://rejob-prueba.herokuapp.com/api/registro',datos);
  }

  //MAIL
  sendCode(correo){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/sendCode/';
    dir = dir.concat(correo);
    console.log(dir);
    return this.httpClient.get(dir);
  }

  //Viviendas
  mostrarTodasViviendas(){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/mostrarViviendasJSON/';
    console.log(dir);
    return this.httpClient.get(dir);
  }

    //Viviendas
    mostrarTodosTrabajos(){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/mostrarTrabajosJSON/';
      console.log(dir);
      return this.httpClient.get(dir);
    }

    filtroBusquedaTrabajo(query){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/filtroBusquedaTrabajo/';
      query.replace('/', '');
      query.replace('%', '');
      dir = dir.concat(query);
      return this.httpClient.get(dir);
    }

    filtroBusquedaVivienda(query){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/filtroBusquedaVivienda/';
      dir = dir.concat(query);
      return this.httpClient.get(dir);
    }
}
