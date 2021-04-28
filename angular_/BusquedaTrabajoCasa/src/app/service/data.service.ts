import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) {}
  getData(){
    return this.httpClient.get('http://127.0.0.1:8000/api/mostrarUsuarios');
  }
  log(datos){
    return this.httpClient.post('http://127.0.0.1:8000/api/login',datos);
  }
  getUsuarios(){
    return this.httpClient.get('http://127.0.0.1:8000/api/mostrarUsuarios');
  }
  registro(datos){
    return this.httpClient.get('http://127.0.0.1:8000/api/register',datos);
  }
}
