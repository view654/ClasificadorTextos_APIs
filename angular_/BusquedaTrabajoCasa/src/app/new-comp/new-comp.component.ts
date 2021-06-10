import { Component, OnInit } from '@angular/core';
import { variablesdeidentificacion } from '../globalUse/variablesidentificacion';
import { Filtro } from '../components/filtro_interfaz';
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { DataService } from 'src/app/service/data.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { newArray } from '@angular/compiler/src/util';
import { ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MostrarTrabajoComponent} from '../mostrar-trabajo/mostrar-trabajo.component';
import { MostrarInformacionComponent } from '../mostrar-informacion/mostrar-informacion.component'; 
import { Usuario } from '../components/usuario_interfaz';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-new-comp',
  templateUrl: './new-comp.component.html',
  styleUrls: ['./new-comp.component.css']
})
export class NewCompComponent implements OnInit {

    user: Usuario;
    
    public isSearch: boolean = false;

    public trabajo: 'trabajo' | 'vivienda' = 'trabajo';
    public parametro: number;

    public arrayProvincias:string[] = ['Todas las Provincias','A Coruña','Albacete','Alicante','Almería','Álava','Asturias','Ávila','Badajoz','Balears','Barcelona','Bizkaia','Burgos','Cáceres','Cádiz','Cantabria',
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
    
  
    constructor(private dataService:DataService, public router:Router, public dialog: MatDialog){
        this.user=Object.assign({},variablesdeidentificacion.user);
        console.log("Componente new-comp!!");  
        console.log(this.user);
        localStorage.getItem('token')
    }
    
    ngOnInit() {
        this.maxP= this.filtros.Vpreciomax+this.filtros.Vpreciomax;
        this.maxM= this.filtros.Vmetros2max+this.filtros.Vmetros2max;
        console.log("wuenas");
        this.user=variablesdeidentificacion.user;
        var token = localStorage.getItem('token'); 
        if(token){
            var decoded = jwt_decode(token);
            var id = decoded['user_id'];
            if(id){
            this.dataService.getUsuarioByID(id).subscribe((res:any) => {
                //console.log(res)
                variablesdeidentificacion.iniciarSesion(res)
                this.user = variablesdeidentificacion.user;
            });
            }
        console.log("wuenasx2");
        console.log(this.user);
        console.log("wuenasx3");
        
        }

    }   
    ngAfterViewInit(): void {
    }
    
    abrirOferta(trabajo_selec:Trabajo){
        console.log(trabajo_selec.enlace);
        this.dialog.open(MostrarTrabajoComponent,{
            data:{trabajo_selec}
        });
    }

    abrirCasa(casa_selec:Casa){
        console.log(casa_selec.link);
        this.dialog.open(MostrarInformacionComponent,{
            data:{casa_selec}
        });
    }

    busqueda(request){
        console.log(this.filtros.Tprovincia);
        document.body.style.cursor = "progress";
        if(this.paginator){
            this.paginator.pageIndex = 0;
        }else{
            console.log('No existe paginator');
        }

        /*-----------TRABAJOS -------------------*/
        this.isSearch = true;
        if(this.filtros.Tprovincia == 'Todas las Provincias'){
            this.filtros.Tprovincia = 'null';
        }

        this.dataService.filtroGeneral(request, this.filtros.Tprovincia, this.filtros.Tcontrato, this.filtros.Tjornada).subscribe((res:any) => {
            
            this.trabajos = Object.values(res);
            this.todosTrabajos=Object.values(res);
            
            variablesdeidentificacion.getjobs(Object.values(res));
            
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
            
            
        })

        /*-----------VIVIENDAS -------------------*/
        console.log(this.filtros.Vlugar);
        if(this.filtros.Vlugar == 'Todas las Provincias'){
            this.filtros.Vlugar = 'null';
        }

        this.dataService.filtroBusquedaVivienda(request, this.filtros.Vlugar, this.filtros.Vpreciomax, this.filtros.Vpreciomin, this.filtros.Vhabitacionesmax, this.filtros.Vhabitacionesmin, this.filtros.Vbanosmax, this.filtros.Vbanosmin, this.filtros.Vmetros2max, this.filtros.Vmetros2min, this.filtros.Vplanta, this.filtros.Vcompr_alq_compar, this.filtros.Vtipo).subscribe((res:any) => {

            this.todasCasas=new Array(res.length);
            var cont = 0
            for(let key in res){
                this.todasCasas[cont] = res[key];
                cont = cont + 1;
            }

            this.casas = Object.values(res);
            console.log(this.casas);
            variablesdeidentificacion.getcasas(Object.values(res));
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
        })
        document.body.style.cursor = "auto";
    }

   
    
    pageEventT(event){
       
        this.pageSizeT = event.pageSize;
        var primerElem = (event.pageSize*event.pageIndex);
        var longitud = event.pageSize;
        if((primerElem+longitud) >=this.todosTrabajos.length){
            longitud = this.todosTrabajos.length-primerElem;
        }
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
        if(primerElem+longitud >=this.todasCasas.length){
            longitud = primerElem+longitud-this.todasCasas.length
        }
        var viv = new Array(longitud);
        for(let i = primerElem; i<(primerElem+longitud); i++){
            viv[(i-primerElem)] = this.todasCasas[i];
        }
        this.casas = Object.assign([], viv);
    }

}