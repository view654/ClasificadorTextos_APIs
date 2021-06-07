import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import {FormControl} from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import jwt_decode from "jwt-decode";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MostrarTrabajoComponent} from '../mostrar-trabajo/mostrar-trabajo.component';
import { MostrarInformacionComponent } from '../mostrar-informacion/mostrar-informacion.component'; 


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class favoritos implements OnInit {

  //@Input() item: string; // decorate the property with @Input()
  
  user: Usuario = variablesdeidentificacion.user;
  casas: Casa[] = variablesdeidentificacion.casas;
  trabajos: Trabajo[] = variablesdeidentificacion.trabajos;
  //constructor(private rutaActiva: ActivatedRoute) { }
  
  constructor(private dataService:DataService, public dialog: MatDialog) {
  }
  ngOnInit() {

    this.getFavoritosTrabajo();
    this.getFavoritosVivienda();
    
    //this.getUsersData();
    //this.user = this.rutaActiva.snapshot.params.user

  }
  /* getUsersData(){
    this.dataService.getData().subscribe(res => {
      console.log(res)
    })
  } */

  getFavoritosTrabajo(){
    this.user = Object.assign({},variablesdeidentificacion.user);
    console.log(this.user);
    console.log("Entra función");
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    this.dataService.getFavoritosTrabajo(id).subscribe((res:any) => {
      this.trabajos = Object.values(res);
      variablesdeidentificacion.getjobs(Object.values(res));
  })
  }

  getFavoritosVivienda(){
    this.user = Object.assign({},variablesdeidentificacion.user);
    console.log(this.user);
    console.log("Entra función");
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    this.dataService.getFavoritosVivienda(id).subscribe((res:any) => {
      this.casas = Object.values(res);
      variablesdeidentificacion.getcasas(Object.values(res));
  })

  }

  abrirOferta(trabajo_selec:Trabajo){
    console.log(trabajo_selec.enlace);
    this.dialog.open(MostrarTrabajoComponent,{
        data:{trabajo_selec}
    });
  }

  abrirCasa(casa_selec:Casa){
    console.log(casa_selec.link);
    this.dialog.open(MostrarInformacionComponent,{
        data:{casa_selec}
    });
}

}
