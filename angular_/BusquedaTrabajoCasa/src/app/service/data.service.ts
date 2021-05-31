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

  mostrarUsuarioEmail(email){
    var dir:string = 'http://127.0.0.1:8000/api/mostrarUsuarioEmail/';
    dir = dir.concat(email.toString());
    return this.httpClient.get(dir);
  }

  modificarContrasena(id,datos){
    var dir:string = 'http://127.0.0.1:8000/api/modificarContrasena/';
    dir = dir.concat(id.toString());
    console.log('dir: ',dir,' datos: ',datos);
    return this.httpClient.put(dir,datos);
  }

  //modificarContrasena(Request $request, $user_id)

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

    filtroGeneral(trabajobusqueda,provincia, contrato, jornada){
      console.log(trabajobusqueda);
      var dir:string = 'https://127.0.0.1:8000/api/filtroGeneral/';
      if(!provincia){
        provincia='null'
      }
      if(!contrato){
        contrato='null'
      }
      if(!jornada){
        jornada ='null'
      }
      dir = dir.concat(provincia,'/',contrato,'/',jornada);
      dir=dir.replace(/ /g,'%20')
      console.log(dir);
      return this.httpClient.get(dir, trabajobusqueda);
    }

    filtroBusquedaVivienda(query){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/filtroBusquedaVivienda/';
      dir = dir.concat(query);
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

    eliminarFavoritoTrabajo(idUsuario, idTrabajo){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/eliminarFavoritoTrabajo/';
      dir = dir.concat(idUsuario.toString());
      dir  = dir.concat("/");
      dir = dir.concat(idTrabajo.toString());
      return this.httpClient.delete(dir);
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

    eliminarFavoritoVivienda(idUsuario, idVivienda){
      var dir:string = 'https://rejob-prueba.herokuapp.com/api/eliminarFavoritoVivienda/';
      dir = dir.concat(idUsuario.toString());
      dir  = dir.concat("/");
      dir = dir.concat(idVivienda.toString());
      return this.httpClient.delete(dir);
    }

  filtroGeneralViviendas(lugar, preciomax, preciomin, habitacionesmax, habitacionesmin, banosmax, banosmin, metros2max, metros2min, planta, compr_alq_compar, tipo){
    var dir:string = 'https://rejob-prueba.herokuapp.com/api/filtroGeneralViviendas/';
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
    dir = dir.concat(lugar,'/', preciomax,'/', preciomin,'/', habitacionesmax,'/', habitacionesmin,'/', banosmax,'/', banosmin,'/', metros2max,'/', metros2min,'/', planta,'/', compr_alq_compar,'/', tipo);
    dir=dir.replace(/ /g,'%20')
    console.log('filtroGeneral Vivienda: ',dir)
    return this.httpClient.get(dir);
  }
 
}
