import { Component } from '@angular/core';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { Filtro } from '../components/filtro_interfaz';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { DataService } from 'src/app/service/data.service';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

@Component({
    selector: 'primer',
    templateUrl:'./primer.component.html',
    styleUrls: ['./primer.component.css']

})

export class primer{
    
    public isSearch: boolean = false;

    public trabajo: 'trabajo' | 'vivienda' = 'trabajo';
    public parametro: number;

    public arrayProvincias:string[] = ['A Coruña','Albacete','Alicante','Almería','Álava','Asturias','Ávila','Badajoz','Balears','Barcelona','Bizkaia','Burgos','Cáceres','Cádiz','Cantabria',
        'Castellón','Ciudad Real','Córdoba','Cuenca','Gipuzkoa','Girona','Granada','Guadalajara','Huelva','Huesca','Jaén','León','Lleida','Lugo','Madrid',
        'Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria','Tarragona',
        'Teruel','Toledo','Valencia','Valladolid','Zamora','Zaragoza','Ceuta','Melilla'];

    casas: Casa[];
    trabajos: Trabajo[];
    filtros: Filtro = variablesdeidentificacion.filtros;
    images: string[][];

    request: string = '';
    autoTicks = false;
    invert = false;
    maxP =0;
    stepP = 1000;
    maxM =0;
    stepM = 1000;
  
    constructor(private dataService:DataService){
        console.log("Componente primer cargado!!");        
    }
    ngOnInit() {
        this.maxP= this.filtros.Vpreciomax+this.filtros.Vpreciomax;
        this.maxM= this.filtros.Vmetros2max+this.filtros.Vmetros2max;
        this.getjobs();
        this.getcasas();
        //this.user = this.rutaActiva.snapshot.params.user
    }   
    getjobs(){
        this.dataService.filtroGeneral(this.filtros.Tprovincia, this.filtros.Tcontrato, this.filtros.Tjornada).subscribe((res:any) => {
            //console.log(res);
            this.trabajos=Object.values(res);
            console.log(this.trabajos);
            variablesdeidentificacion.getjobs(res);
        });
        /*
        this.dataService.mostrarTodosTrabajos().subscribe((res:any) => {
            //console.log(res);
            this.trabajos=res;
            console.log(this.trabajos);
            variablesdeidentificacion.getjobs(res);
        });*/
    }
    getcasas(){
        this.dataService.filtroGeneralViviendas(this.filtros.Vlugar, this.filtros.Vpreciomax, this.filtros.Vpreciomin, this.filtros.Vhabitacionesmax, this.filtros.Vhabitacionesmin, this.filtros.Vbanosmax, this.filtros.Vbanosmin, this.filtros.Vmetros2max, this.filtros.Vmetros2min, this.filtros.Vplanta, this.filtros.Vcompr_alq_compar, this.filtros.Vtipo).subscribe((res:any) => {
            //console.log(res);
            this.casas=new Array(res.length);
            var cont = 0
            for(let key in res){
                this.casas[cont] = res[key];
                cont = cont + 1;
            }
            console.log(this.casas);
            variablesdeidentificacion.getcasas(res);
            this.images=new Array(this.casas.length);
            for (let i = 0; i < (this.casas.length-1); i++) { 
            //var cont = 0;
            //for(let key in this.casas){
                //console.log('casa: ', this.casas[i])    
                this.images[i]=this.casas[i].imagenes.split('\[\'');
                //console.log('imagenes1: ', this.images[i])
                if(this.images[i][1]){
                    this.images[i]=this.images[i][1].split('\'\]');
                    //console.log('imagenes2: ', this.images[i])
                    this.images[i] =this.images[i][0].split('\', \''); 
                    //console.log('imagenes3: ', this.images[i])
                }            
        
            }
            console.log('images: ')    
            console.log(this.images)
      });
    }
     

}