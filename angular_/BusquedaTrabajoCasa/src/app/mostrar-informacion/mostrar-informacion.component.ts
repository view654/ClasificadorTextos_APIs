import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Casa } from '../components/casa_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-mostrar-informacion',
  templateUrl: './mostrar-informacion.component.html',
  styleUrls: ['./mostrar-informacion.component.css'],
})


export class MostrarInformacionComponent implements OnInit, AfterViewInit, OnChanges {
  favoritos= false;
  public casa_selec: Casa;
  map: mapLeaflet;
  id:string;
  casas: Casa[] = variablesdeidentificacion.casas;
  
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/185/135`);
  
  constructor(private ngbCarouselConfig:NgbCarouselConfig,private _Activatedroute:ActivatedRoute) {

    /*this.ngbCarouselConfig.interval = 10000;
    this.ngbCarouselConfig.wrap = false;
    this.ngbCarouselConfig.keyboard = false;
    this.ngbCarouselConfig.pauseOnHover = false;
    */
    this.id =_Activatedroute.snapshot.paramMap.get('id');
    for (let i = 0; i < this.casas.length; i++) {
      if(this.casas[i].ID == parseInt(this.id, 10)){
        this.casa_selec=this.casas[i];

      }
    }
    
    /*
    this.casa_selec= {
      ID:2,
      Lugar:"Tokyo",
      Precio:30000795,
      Compr_alq_compar:"Alquilar",
      Tipo:"Loft",
      Link:"hhh.hhhhhh.hh",
      M2:134,
      Descripcion:"La descripción de la propiedad es el paso definitivo para convencer al potencial comprador para realizar una oferta por tu casa o al potencial inquilino para marcar tu número e interesarse por el alquiler que ofreces. \n Las fotografías y el video importan mucho, muchísmo, pero la descripción de un inmueble es imprescindible para darle fuerza al contenido visual. Estos tres elementos se complementan y unidos causan un efecto mayor.",
      Telefono:654654654,
      Email:"emailT@emailT.com"
    };*/
    
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
