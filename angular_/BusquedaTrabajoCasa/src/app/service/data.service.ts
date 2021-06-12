import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpClient:HttpClient) {}
  /*----------------------USUARIOS-----------------------------*/
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

  eliminarUsuario(id){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/eliminarUsuario/';
    dir = dir.concat(id.toString());
    return this.httpClient.delete(dir);
  }

  mostrarUsuarioEmail(email){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/mostrarUsuarioEmail/';
    dir = dir.concat(email.toString());
    return this.httpClient.get(dir);
  }

  modificarContrasena(id,datos){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/modificarContrasena/';
    dir = dir.concat(id.toString());
    return this.httpClient.put(dir,datos);
  }

  /*----------------------MAIL-----------------------------*/
  sendCode(correo){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/sendCode/';
    dir = dir.concat(correo);
    return this.httpClient.get(dir);
  }

  /*----------------------VIVIENDAS-----------------------------*/
  mostrarTodasViviendas(){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/mostrarViviendasJSON/';
    return this.httpClient.get(dir);
  }

  filtroBusquedaVivienda(query,lugar, preciomax, preciomin, habitacionesmax, habitacionesmin, banosmax, banosmin, metros2max, metros2min, planta, compr_alq_compar, tipo){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/filtroBusquedaVivienda/';
    if(!query){
      query='null'
    }
    if(!lugar){
      lugar='null'
    }
    if(!preciomax){
      preciomax='null'
    }
    if(!preciomin){
      preciomin ='null'
    }
    if(!habitacionesmax){
      habitacionesmax='null'
    }
    if(!preciomax){
      preciomax='null'
    }
    if(!habitacionesmin){
      habitacionesmin ='null'
    }
    if(!banosmax){
      banosmax='null'
    }
    if(!banosmin){
      banosmin='null'
    }
    if(!metros2max){
      metros2max ='null'
    }
    if(!metros2min){
      metros2min ='null'
    }
    if(!planta){
      planta='null'
    }
    if(!compr_alq_compar){
      compr_alq_compar='null'
    }
    if(!tipo){
      tipo ='null'
    }
    dir = dir.concat(query, '/',lugar,'/', preciomax,'/', preciomin,'/', habitacionesmax,'/', habitacionesmin,'/', banosmax,'/', banosmin,'/', metros2max,'/', metros2min,'/', planta,'/', compr_alq_compar,'/', tipo);
    dir=dir.replace(/ /g,'%20');
    return this.httpClient.get(dir);
  }

  agregarFavoritoVivienda(id, datos){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/agregarViviendas/';
    dir = dir.concat(id.toString());
    return this.httpClient.post(dir,datos);
  }

  getFavoritosVivienda(id){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/favoritosViviendas/';
    dir = dir.concat(id.toString());
    return this.httpClient.get(dir);
  }

  eliminarFavoritoVivienda(idUsuario, datos){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/eliminarFavoritoViviendas/';
    dir = dir.concat(idUsuario.toString());
    return this.httpClient.post(dir, datos);
  }

  existefavoritoVivienda(idUsuario, datos){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/existefavoritoVivienda/';
    dir = dir.concat(idUsuario.toString());
    return this.httpClient.post(dir, datos);
  }

  /*----------------------TRABAJOS-----------------------------*/

    mostrarTodosTrabajos(){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/mostrarTrabajosJSON/';
      return this.httpClient.get(dir);
    }

    filtroGeneral(request ,provincia, contrato, jornada){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/filtroBusquedaTrabajo/';
      if(!request){
        request='null'
      }
      if(!provincia){
        provincia='null'
      }
      if(!contrato){
        contrato='null'
      }
      if(!jornada){
        jornada ='null'
      }
      dir = dir.concat(request ,'/',provincia.toString(),'/',contrato.toString(),'/',jornada.toString());
      dir=dir.replace(/ /g,'%20');
      return this.httpClient.get(dir);
    }

    agregarFavoritoTrabajo(id, datos){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/agregarTrabajos/';
      dir = dir.concat(id.toString());
      return this.httpClient.post(dir,datos);
    }


    getFavoritosTrabajo(id){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/favoritosTrabajo/';
      dir = dir.concat(id.toString());
      return this.httpClient.get(dir);
    }

    eliminarFavoritoTrabajo(idUsuario, datos){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/eliminarFavoritoTrabajos/';
      dir = dir.concat(idUsuario.toString());
      return this.httpClient.post(dir, datos);
    }

    existefavoritoTrabajo(idUsuario, datos){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/existefavoritoTrabajo/';
      dir = dir.concat(idUsuario.toString());
      return this.httpClient.post(dir, datos);
    }

    coordenadas(provincia){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/coordenadas/';
      dir = dir.concat(provincia.toString());
      console.log('coordenadas: ', dir);
      return this.httpClient.get(dir);
    }

}
