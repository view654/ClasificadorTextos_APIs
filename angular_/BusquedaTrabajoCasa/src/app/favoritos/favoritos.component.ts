import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import {FormControl} from '@angular/forms';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class favoritos implements OnInit {

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
    this.getUsersData();
    //this.user = this.rutaActiva.snapshot.params.user
  }
  getUsersData(){
    this.dataService.getData().subscribe(res => {
      console.log(res)
    })
  }
}

