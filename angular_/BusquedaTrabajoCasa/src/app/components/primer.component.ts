import { Component } from '@angular/core';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { Filtro } from '../components/filtro_interfaz';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { DataService } from 'src/app/service/data.service';

@Component({
    selector: 'primer',
    templateUrl:'./primer.component.html',
    styleUrls: ['./primer.component.css']

})

export class primer{
    
    public isSearch: boolean = false;

    public trabajo: 'trabajo' | 'vivienda' = 'trabajo';
    public parametro: number;

    public arrayProvincias:string[] = ['Albacete','Alicante','Almería','Álava','Asturias','Ávila','Badajoz','Balears','Barcelona','Bizkaia','Burgos','Cáceres','Cádiz','Cantabria',
        'Castellón','Ciudad Real','Córdoba','Coruña','Cuenca','Gipuzkoa','Girona','Granada','Guadalajara','Huelva','Huesca','Jaén','León','Lleida','Lugo','Madrid',
        'Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria','Tarragona',
        'Teruel','Toledo','Valencia','Valladolid','Zamora','Zaragoza','Ceuta','Melilla'];

    casas: Casa[] = variablesdeidentificacion.casas;
    trabajos: Trabajo[]
    filtros: Filtro[] = variablesdeidentificacion.filtros;

    request: string = '';

    autoTicks = false;
    invert = false;
    max = 100000;
    min = 1000;
    step = 1000;
    value = 0;
  
    constructor(private dataService:DataService){
        console.log("Componente primer cargado!!");        
    }
    ngOnInit() {
        //this.getjobs();
        //this.user = this.rutaActiva.snapshot.params.user
    }   /* 
    getjobs(){
        this.dataService.mostrarTodosTrabajos().subscribe((res:any) => {
          console.log(res);
          this.trabajos=res;
          console.log(this.trabajos);
          variablesdeidentificacion.getjobs(res); 
      });
    } */

    busqueda(request){
        this.isSearch = true;
        this.dataService.filtroBusquedaTrabajo(request).subscribe((res:any) => {
            this.trabajos = Object.values(res);
            variablesdeidentificacion.getjobs(Object.values(res));
        })
    }
     

}