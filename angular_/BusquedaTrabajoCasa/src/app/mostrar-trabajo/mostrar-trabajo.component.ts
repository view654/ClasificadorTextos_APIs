import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Trabajo } from '../components/trabajo_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';

@Component({
  selector: 'app-mostrar-trabajo',
  templateUrl: './mostrar-trabajo.component.html',
  styleUrls: ['./mostrar-trabajo.component.css']
})

export class MostrarTrabajoComponent implements OnInit, AfterViewInit, OnChanges{
  favoritos= false;
  public trabajo_selec: Trabajo;
  map: mapLeaflet;
  id:string;
  trabajos: Trabajo[] = variablesdeidentificacion.trabajos;
  
  constructor(private _Activatedroute:ActivatedRoute) { 
    this.id =_Activatedroute.snapshot.paramMap.get('id');
    for (let i = 0; i < this.trabajos.length; i++) {
      if(this.trabajos[i].ID == parseInt(this.id, 10)){
        this.trabajo_selec=this.trabajos[i];

      }
    }
  }

  
  deftrabajo_selec(trabajo_seleccionada:Trabajo): void{
  this.trabajo_selec = trabajo_seleccionada;
  }

  ngOnInit(): void {
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
}
