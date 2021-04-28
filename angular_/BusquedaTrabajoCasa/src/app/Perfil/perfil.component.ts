import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import {FormControl} from '@angular/forms';
import { DataService } from 'src/app/service/data.service';


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
  //@Input() item: string; // decorate the property with @Input()
  
  user: Usuario = variablesdeidentificacion.user;
  //constructor(private rutaActiva: ActivatedRoute) { }
  
  constructor(private dataService:DataService) {
    this.idiomas = new FormControl();
    this.idiomas.value = this.user.Idiomas;
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
    this.user = variablesdeidentificacion.user;
    console.log(this.user);
  }
  sendValue(){

  }
  /*getUsersData(){
    this.dataService.getData().subscribe(res => {
      console.log(res)
    })
  }*/
}
