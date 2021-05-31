import { Component } from '@angular/core';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { Filtro } from '../components/filtro_interfaz';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { DataService } from 'src/app/service/data.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { newArray } from '@angular/compiler/src/util';
import { ViewChild } from '@angular/core';

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
    todasCasas: Casa[];
    trabajos: Trabajo[];
    todosTrabajos: Trabajo[];
    filtros: Filtro = variablesdeidentificacion.filtros;
    images: string[][];

    request: string = '';
    autoTicks = false;
    invert = false;
    maxP =0;
    stepP = 1000;
    maxM =0;
    stepM = 1000;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    paglengthT=100;
    pageSizeT=10;
    //pageIndexT = 0;
    //pageSizeOptionsT="[5, 10, 25, 100]";
    paglengthV=100;
    pageSizeV=10;
    //pageIndexV = 0;
    
  
    constructor(private dataService:DataService){
        console.log("Componente primer cargado!!");        
    }
    ngOnInit() {
        this.maxP= this.filtros.Vpreciomax+this.filtros.Vpreciomax;
        this.maxM= this.filtros.Vmetros2max+this.filtros.Vmetros2max;
        //this.user = this.rutaActiva.snapshot.params.user
    }   
    ngAfterViewInit(): void {
        this.getjobs();
        this.getcasas();
    }
    getjobs(){
        if(this.paginator){
            this.paginator.pageIndex = 0;
        }else{
            console.log('No existe paginator');
        }
        this.dataService.filtroGeneral(this.filtros.Tprovincia, this.filtros.Tcontrato, this.filtros.Tjornada).subscribe((res:any) => {
            //console.log(res);
            this.todosTrabajos=Object.values(res);
            
            variablesdeidentificacion.getjobs(res);
            
            var longitud = this.pageSizeT; 
            
            if(this.todosTrabajos.length<longitud){
                longitud = this.todosTrabajos.length
                this.paglengthT = 1;
            }else{
                this.paglengthT=this.todosTrabajos.length;
            }
            this.trabajos = new Array(longitud);
            for(let i = 0; i<longitud; i++){
                this.trabajos[i] = this.todosTrabajos[i];
            }
            
        });
    }
        
        /*
        this.dataService.mostrarTodosTrabajos().subscribe((res:any) => {
          //console.log(res);
          this.trabajos=res;
          console.log(this.trabajos);
          variablesdeidentificacion.getjobs(res); 
      });
    } */

    busqueda(request){
        this.isSearch = true;
        this.dataService.filtroBusquedaTrabajo(request).subscribe((res:any) => {
            this.trabajos = Object.values(res);
            console.log(this.trabajos);
            variablesdeidentificacion.getjobs(Object.values(res));
        })

        this.dataService.filtroBusquedaVivienda(request).subscribe((res:any) => {
            this.casas = Object.values(res);
            console.log(this.casas);
            variablesdeidentificacion.getcasas(Object.values(res));
            this.images=new Array(this.casas.length);
            for (let i = 0; i < (this.casas.length-1); i++) { 
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
        })
    }

    /* getcasas(){
        this.dataService.mostrarTodasViviendas().subscribe((res:any) => {
            //console.log(res);
            this.trabajos=res;
            console.log(this.trabajos);
            variablesdeidentificacion.getjobs(res);
        });*/
    
    getcasas(){
        if(this.paginator){
            this.paginator.pageIndex = 0;
        }else{
            console.log('No existe paginator');
        }
        this.dataService.filtroGeneralViviendas(this.filtros.Vlugar, this.filtros.Vpreciomax, this.filtros.Vpreciomin, this.filtros.Vhabitacionesmax, this.filtros.Vhabitacionesmin, this.filtros.Vbanosmax, this.filtros.Vbanosmin, this.filtros.Vmetros2max, this.filtros.Vmetros2min, this.filtros.Vplanta, this.filtros.Vcompr_alq_compar, this.filtros.Vtipo).subscribe((res:any) => {
            //console.log(res);
            this.todasCasas=new Array(res.length);
            var cont = 0
            for(let key in res){
                this.todasCasas[cont] = res[key];
                cont = cont + 1;
            }
            
            variablesdeidentificacion.getcasas(res);
            this.images=new Array(this.todasCasas.length);
            for (let i = 0; i < (this.todasCasas.length-1); i++) { 
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
         
            var longitud = this.pageSizeV; 
            if(this.todasCasas.length<longitud){
                longitud = this.todasCasas.length
                this.paglengthV = 1;
            }else{
                this.paglengthV=this.todasCasas.length;
            }
            this.casas = new Array(longitud);
            for(let i = 0; i<longitud; i++){
                this.casas[i] = this.todasCasas[i];
            }
      });
    } 
     
      
    
    pageEventT(event){
       
        this.pageSizeT = event.pageSize;
        var primerElem = (event.pageSize*event.pageIndex);
        var longitud = event.pageSize;
        if((primerElem+longitud) >=this.todosTrabajos.length){
            longitud = this.todosTrabajos.length-primerElem;
        }
        /*
        console.log('primerElem: ',primerElem);
        console.log('UltimoElement: ',primerElem+longitud);
        console.log('Total de elementos: ', this.todosTrabajos.length);
        */
        var tra = new Array(longitud);
        for(let i = primerElem; i<(primerElem+longitud); i++){
            tra[(i-primerElem)] = this.todosTrabajos[i];
        }
        this.trabajos = Object.assign([], tra);
    }
    pageEventV(event){
        this.pageSizeV = event.pageSize;
        var primerElem = event.pageSize*event.pageIndex;
        var longitud = event.pageSize;
        if(primerElem+longitud >=this.todosTrabajos.length){
            longitud = primerElem+longitud-this.todosTrabajos.length
        }
        var viv = new Array(longitud);
        for(let i = primerElem; i<(primerElem+longitud); i++){
            viv[(i-primerElem)] = this.todosTrabajos[i];
        }
        this.casas = Object.assign([], viv);
    }

}