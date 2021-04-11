import { Component, OnInit } from '@angular/core';
import { Casa } from '../components/casa_interfaz';

@Component({
  selector: 'app-mostrar-informacion',
  templateUrl: './mostrar-informacion.component.html',
  styleUrls: ['./mostrar-informacion.component.css']
})
export class MostrarInformacionComponent implements OnInit {
  favoritos= false;
  casa_selec: Casa;
 
  
  constructor() {
    this.casa_selec= {
      ID:2,
      Lugar:"Tokyo",
      Precio:30000795,
      Compr_alq_compar:"Alquilar",
      Tipo:"Loft",
      Link:"hhh.hhhhhh.hh",
      M2:134,
      Descripcion:"La descripción de la propiedad es el paso definitivo para convencer al potencial comprador para realizar una oferta por tu casa o al potencial inquilino para marcar tu número e interesarse por el alquiler que ofreces. \n Las fotografías y el video importan mucho, muchísmo, pero la descripción de un inmueble es imprescindible para darle fuerza al contenido visual. Estos tres elementos se complementan y unidos causan un efecto mayor."
    };
   }

  ngOnInit(): void {
  }

}
