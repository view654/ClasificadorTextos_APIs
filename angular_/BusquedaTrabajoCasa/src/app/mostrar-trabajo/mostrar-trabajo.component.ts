import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Trabajo } from '../components/trabajo_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { DataService } from '../service/data.service';
import { Usuario } from '../components/usuario_interfaz';
import jwt_decode from "jwt-decode";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Filtro } from '../components/filtro_interfaz';


export interface DialogData {
  trabajo_selec: Trabajo;
}

@Component({
  selector: 'app-mostrar-trabajo',
  templateUrl: './mostrar-trabajo.component.html',
  styleUrls: ['./mostrar-trabajo.component.css']
})

export class MostrarTrabajoComponent implements OnInit, AfterViewInit, OnChanges{
  
  user: Usuario;
  isLogged = false;
  favoritos= false;

  public trabajo_selec: Trabajo;
  map: mapLeaflet;
  id:string;
  trabajos: Trabajo[] = variablesdeidentificacion.trabajos;

  

  relacionados: any[];



  
  constructor(private _Activatedroute:ActivatedRoute, private service: DataService,
    public dialogRef: MatDialogRef<MostrarTrabajoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Trabajo) { 
    this.user=Object.assign({},variablesdeidentificacion.user); 
    this.deftrabajo_selec(data["trabajo_selec"]);

    this.id =_Activatedroute.snapshot.paramMap.get('id');
    for (let i = 0; i < this.trabajos.length; i++) {
      if(this.trabajos[i].enlace == this.id){
        console.log("Entro");
        this.trabajo_selec=this.trabajos[i];
      }
    }
  }

  
  deftrabajo_selec(trabajo_seleccionada:Trabajo): void{
    this.trabajo_selec = trabajo_seleccionada;
  }
  
  ofertasRelacionadas(localidad){
    this.service.filtroBusquedaVivienda(localidad, 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null').subscribe((res:any) => {
      this.relacionados = Object.values(res);
      console.log(this.relacionados.slice(0, 3));
    })
  }
  
  ngOnInit(): void {
    this.user = Object.assign({},variablesdeidentificacion.user);
    
    console.log("Usuario",this.user);
    this.existefavoritoTrabajo(); 
    console.log("ONINIT", this.favoritos);
    this.ofertasRelacionadas(this.trabajo_selec.localidad);
  }

  

  ngAfterViewInit(): void{
    this.map=new mapLeaflet('map_cont_id');
    this.map.update(40.373271,-3.921200,"UEM");
  }
  ngOnChanges(changes:SimpleChanges):void{
    /*
    if(!this.map){
        return;
    }
    if(changes.bridge.currentValue){
        const {lat,lng,name} = changes.bridge.currentValue;
        this.map.update(lat,lng,name);
    }
    */
  }

  irOferta(){
    let url = this.trabajo_selec.enlace
    console.log(url)
    window.open(url);
  }

  agregarFavoritoTrabajo(){
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    if(this.favoritos == false){
      this.favoritos= true;
      console.log("Entra función");
      let trabajo_seleccionado = JSON.stringify(this.trabajo_selec);

      this.service.agregarFavoritoTrabajo(id,trabajo_seleccionado).subscribe((res:any) => {
      console.log("Service hecho", trabajo_seleccionado);
      console.log("Al dar favoritos",this.favoritos);
      });
    }else{
      console.log(this.trabajo_selec);
      this.service.eliminarFavoritoTrabajo(id,this.trabajo_selec).subscribe((res:any) => {
        console.log(res);
        console.log("Eliminado");
      });
      this.favoritos= false;
    }
  }

  existefavoritoTrabajo(){
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    console.log(this.user);
    this.service.existefavoritoTrabajo(id,this.trabajo_selec).subscribe(res => {
      if(res == null){
        this.favoritos = false;
      }else{
        this.favoritos = true;
      }

      console.log("Al inicio",this.favoritos);
    });
  }
}


