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
    return this.httpClient.get('http://127.0.0.1:8000/api/mostrarUsuarios');
  }
  log(datos){
    return this.httpClient.post('http://127.0.0.1:8000/api/login',datos);
  }
  getUsuarios(){
    return this.httpClient.get('http://127.0.0.1:8000/api/mostrarUsuarios');
  }

  getUsuarioByID(id){
    var dir:string = 'http://127.0.0.1:8000/api/mostrarUsuario/';
    dir = dir.concat(id.toString());
    return this.httpClient.get(dir);
  }
  modificarUsuario(id,datos){
    var dir:string = 'http://127.0.0.1:8000/api/modificarUsuario/';
    dir = dir.concat(id.toString());
    return this.httpClient.put(dir,datos);
  }
   
  registro(datos){
    return this.httpClient.post('http://127.0.0.1:8000/api/registro',datos);
  }

  mostrarUsuarioEmail(email){
    var dir:string = 'http://127.0.0.1:8000/api/mostrarUsuarioEmail/';
    dir = dir.concat(email.toString());
    return this.httpClient.get(dir);
  }

  modificarContrasena(id,datos){
    var dir:string = 'http://127.0.0.1:8000/api/modificarContrasena/';
    dir = dir.concat(id.toString());
    return this.httpClient.put(dir,datos);
  }

  //modificarContrasena(Request $request, $user_id)

  //MAIL
  sendCode(correo){
    var dir:string = 'http://127.0.0.1:8000/api/sendCode/';
    dir = dir.concat(correo);
    console.log(dir);
    return this.httpClient.get(dir);
  }

  //Viviendas
  mostrarTodasViviendas(){
    var dir:string = 'http://127.0.0.1:8000/api/mostrarViviendasJSON/';
    console.log(dir);
    return this.httpClient.get(dir);
  }

  //Trabajos
  mostrarTodosTrabajos(){
    var dir:string = 'http://127.0.0.1:8000/api/mostrarTrabajosJSON/';
    console.log(dir);
    return this.httpClient.get(dir);
  }


  filtroGeneral(provincia, contrato, jornada){
    var dir:string = 'http://127.0.0.1:8000/api/filtroGeneral/';
    if(!provincia){
      provincia='?'
    }
    if(!contrato){
      contrato='?'
    }
    if(!jornada){
      jornada ='?'
    }
    dir = dir.concat(provincia,'/',contrato,'/',jornada);
    dir=dir.replace(/ /g,'%20')
    return this.httpClient.get(dir);
  }

  filtroGeneralViviendas(lugar, preciomax, preciomin, habitacionesmax, habitacionesmin, banosmax, banosmin, metros2max, metros2min, planta, compr_alq_compar, tipo){
    var dir:string = 'http://127.0.0.1:8000/api/filtroGeneralViviendas/';
    if(!lugar){
      lugar='?'
    }
    if(!preciomax){
      preciomax='?'
    }
    if(!preciomin){
      preciomin ='?'
    }
    if(!habitacionesmax){
      habitacionesmax='?'
    }
    if(!preciomax){
      preciomax='?'
    }
    if(!habitacionesmin){
      habitacionesmin ='?'
    }
    if(!banosmax){
      banosmax='?'
    }
    if(!banosmin){
      banosmin='?'
    }
    if(!metros2max){
      metros2max ='?'
    }
    if(!metros2min){
      metros2min ='?'
    }
    if(!planta){
      planta='?'
    }
    if(!compr_alq_compar){
      compr_alq_compar='?'
    }
    if(!tipo){
      tipo ='?'
    }
    dir = dir.concat(lugar,'/', preciomax,'/', preciomin,'/', habitacionesmax,'/', habitacionesmin,'/', banosmax,'/', banosmin,'/', metros2max,'/', metros2min,'/', planta,'/', compr_alq_compar,'/', tipo);
    dir=dir.replace(/ /g,'%20')
    console.log('filtroGeneral Vivienda: ',dir)
    return this.httpClient.get(dir);
  }
  filtroBusquedaTrabajo(query){
    var dir:string = 'http://127.0.0.1:8000/api/filtroBusquedaTrabajo/';
    query.replace('/', '');
    query.replace('%', '');
    dir = dir.concat(query);
    return this.httpClient.get(dir);
  }

  filtroBusquedaVivienda(query){
    var dir:string = 'http://127.0.0.1:8000/api/filtroBusquedaVivienda/';
    dir = dir.concat(query);
    return this.httpClient.get(dir);
  }
  //Funciones de Filtros
 


  filtroBusqueda(query){
    var dir:string = 'http://127.0.0.1:8000/api/filtroBusqueda/';
    query.replace('/', '');
    query.replace('%', '');
    dir = dir.concat(query);
    console.log(dir)
    return this.httpClient.get(dir);
  }
}
