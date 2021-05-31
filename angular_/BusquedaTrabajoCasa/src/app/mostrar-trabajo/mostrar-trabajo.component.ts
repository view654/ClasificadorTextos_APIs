import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Trabajo } from '../components/trabajo_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { DataService } from '../service/data.service';
import { Usuario } from '../components/usuario_interfaz';
import jwt_decode from "jwt-decode";

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



  
  constructor(private _Activatedroute:ActivatedRoute, private service: DataService) {
    this.user=Object.assign({},variablesdeidentificacion.user); 
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

  ofertasRelacionadas(titulo){
    this.service.filtroBusquedaTrabajo(titulo.substring(0,8)).subscribe((res:any) => {
      this.relacionados = Object.values(res);
    })
  }

  ngOnInit(): void {    
    this.ofertasRelacionadas(this.trabajo_selec.titulo)
    
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
    console.log(variablesdeidentificacion.user);
    this.user = Object.assign({},variablesdeidentificacion.user);
    console.log(this.user);
    this.favoritos= true;
    console.log("Entra función");
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    let trabajo_seleccionado = JSON.stringify(this.trabajo_selec);
    console.log(trabajo_seleccionado);

    this.service.agregarFavoritoTrabajo(id,trabajo_seleccionado).subscribe((res:any) => {
      console.log("Service hecho", trabajo_seleccionado);
    });

  }

  
}


