import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Casa } from '../components/casa_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../components/usuario_interfaz';
import jwt_decode from "jwt-decode";
import { DataService } from '../service/data.service';





@Component({
  selector: 'app-mostrar-informacion',
  templateUrl: './mostrar-informacion.component.html',
  styleUrls: ['./mostrar-informacion.component.css'],
})


export class MostrarInformacionComponent implements OnInit, AfterViewInit, OnChanges {
  favoritos= false;
  user: Usuario;
  isLogged = false;

  public casa_selec: Casa;
  map: mapLeaflet;
  id:string;
  casas: Casa[] = variablesdeidentificacion.casas;

  
  
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/185/135`);
  images:string[]
  constructor(private ngbCarouselConfig:NgbCarouselConfig,private _Activatedroute:ActivatedRoute, private service: DataService) {
    this.user=Object.assign({},variablesdeidentificacion.user); 

    /*this.ngbCarouselConfig.interval = 10000;
    this.ngbCarouselConfig.wrap = false;
    this.ngbCarouselConfig.keyboard = false;
    this.ngbCarouselConfig.pauseOnHover = false;
    */
    this.id =_Activatedroute.snapshot.paramMap.get('id');
    for (let i = 0; i < this.casas.length-1; i++) {
      if(this.casas[i].link == this.id){
        //parseInt(this.id, 10)
        this.casa_selec=this.casas[i];
        this.images=this.casa_selec.imagenes.split('\[\'');
        this.images=this.images[1].split('\'\]');
        this.images = this.images[0].split('\', \'');
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

  agregarFavoritoVivienda(){
    console.log(variablesdeidentificacion.user);
    this.user = Object.assign({},variablesdeidentificacion.user);
    console.log(this.user);
    this.favoritos= true;
    console.log("Entra función");
    var token = localStorage.getItem('token'); 
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    let vivienda_seleccionada = JSON.stringify(this.casa_selec);
    console.log(this.casa_selec);

    this.service.agregarFavoritoVivienda(id,vivienda_seleccionada).subscribe((res:any) => {
      console.log("Service hecho", vivienda_seleccionada);
    });

  }

}
