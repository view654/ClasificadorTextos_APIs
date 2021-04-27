import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import {FormControl} from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Casa } from '../components/casa_interfaz';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class favoritos implements OnInit {

  //@Input() item: string; // decorate the property with @Input()
  
  user: Usuario = variablesdeidentificacion.user;
  casas: Casa[] = variablesdeidentificacion.casas;
  //constructor(private rutaActiva: ActivatedRoute) { }
  
  constructor(private dataService:DataService) {
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

