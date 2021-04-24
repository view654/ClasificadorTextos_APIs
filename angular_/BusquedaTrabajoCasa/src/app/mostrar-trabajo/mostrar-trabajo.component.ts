import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Casa } from '../components/casa_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';

@Component({
  selector: 'app-mostrar-trabajo',
  templateUrl: './mostrar-trabajo.component.html',
  styleUrls: ['./mostrar-trabajo.component.css']
})

export class MostrarTrabajoComponent implements OnInit, AfterViewInit, OnChanges{
  favoritos= false;
  public casa_selec: Casa;
  map: mapLeaflet;
  id:string;
  casas: Casa[] = variablesdeidentificacion.casas;
  
  constructor(private _Activatedroute:ActivatedRoute) { 
    this.id =_Activatedroute.snapshot.paramMap.get('id');
    for (let i = 0; i < this.casas.length; i++) {
      if(this.casas[i].ID == parseInt(this.id, 10)){
        this.casa_selec=this.casas[i];

      }
    }
  }

  
  defcasa_selec(casa_selecionada:Casa): void{
  this.casa_selec = casa_selecionada;
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
