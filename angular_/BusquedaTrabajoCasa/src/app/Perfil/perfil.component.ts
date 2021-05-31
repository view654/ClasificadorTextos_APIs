import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import {FormControl} from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import jwt_decode from "jwt-decode";


//import { userInfo } from 'node:os';
//import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class perfil {
  title = 'Perfil';
  edit = false;
  idiomas;
  listaIdiomas: string[];
  contrasena:string;
  //@Input() item: string; // decorate the property with @Input()
  
  user: Usuario;
  //constructor(private rutaActiva: ActivatedRoute) { }
  
  constructor(private dataService:DataService) {
    this.user=Object.assign({},variablesdeidentificacion.user);
    this.idiomas = new FormControl();
    try{
      this.idiomas.value = this.user.idiomas.split(";");
    }catch(e){
      this.idiomas.value=null;
    }
    this.listaIdiomas = ['Español', 'Ingles', 'Italiano', 'Frances', 'Aleman', 'Portugues', 'Ruso'];
  }
  ngOnInit() {
    //console.log("Perfil");
    //console.log(this.user);
    //this.getUsersData();
    //this.user = this.rutaActiva.snapshot.params.user
  }

  resetValues(){
    console.log(variablesdeidentificacion.user);
    this.user = Object.assign({},variablesdeidentificacion.user);
    console.log(this.user);
  }
  
  sendValue(){    
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    //var decodedHeader = jwt_decode(res.data.token, { header: true });
    //console.log(decodedHeader);
    var id = decoded['user_id'];
    this.user.idiomas = this.idiomas.value.join(';');
    this.user.password=this.contrasena;
    this.dataService.modificarUsuario(id,this.user).subscribe((res:any) => {
      variablesdeidentificacion.iniciarSesion(this.user)
    });
  }
  /*getUsersData(){
    this.dataService.getData().subscribe(res => {
      console.log(res)
    })
  }*/
}
