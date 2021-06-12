import { Component } from '@angular/core';
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

@Component({
    selector: 'primer',
    templateUrl:'./primer.component.html',
    styleUrls: ['./primer.component.css']

})

export class primer{

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
    primerElemT = 0
    //pageIndexT = 0;
    //pageSizeOptionsT="[5, 10, 25, 100]";
    paglengthV=100;
    pageSizeV=10;
    primerElemV = 0
    //pageIndexV = 0;


    constructor(private dataService:DataService, public router:Router, public dialog: MatDialog){

        //console.log("Componente primer cargado!!");
    }

    ngOnInit() {
        this.maxP= this.filtros.Vpreciomax+this.filtros.Vpreciomax;
        this.maxM= this.filtros.Vmetros2max+this.filtros.Vmetros2max;
        //this.user = this.rutaActiva.snapshot.params.user

    }
    ngAfterViewInit(): void {
    }

    abrirOferta(trabajo_selec:Trabajo){
        //console.log(trabajo_selec.enlace);
        this.dialog.open(MostrarTrabajoComponent,{
            data:{trabajo_selec}
        });
    }

    abrirCasa(casa_selec:Casa){
        //console.log(casa_selec.link);
        this.dialog.open(MostrarInformacionComponent,{
            data:{casa_selec}
        });
    }

    busqueda(request){
        //console.log(this.filtros.Tprovincia);
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
            console.log('this.trabajos: ',this.trabajos)
            variablesdeidentificacion.getjobs(Object.values(res));

            var longitud = this.pageSizeT;

            if(this.todosTrabajos.length<longitud){
                longitud = this.todosTrabajos.length
            }
            this.paglengthT=this.todosTrabajos.length;

            this.trabajos = new Array(longitud);
            for(let i = 0; i<longitud; i++){
                this.trabajos[i] = this.todosTrabajos[i];
            }


        })

        /*-----------VIVIENDAS -------------------*/
        //console.log(this.filtros.Vlugar);
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
            console.log('this.casas: ',this.casas);
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
            }
            this.paglengthV=this.todasCasas.length;
            this.casas = new Array(longitud);
            for(let i = 0; i<longitud; i++){
                this.casas[i] = this.todasCasas[i];
            }
        })
        document.body.style.cursor = "auto";
    }



    pageEventT(event){

        this.pageSizeT = event.pageSize;
        this.primerElemT = (event.pageSize*event.pageIndex);

        var longitud = event.pageSize;
        if((this.primerElemT+longitud) >=this.todosTrabajos.length){
            longitud = this.todosTrabajos.length-this.primerElemT;
        }
        var tra = new Array(longitud);
        for(let i = this.primerElemT; i<(this.primerElemT+longitud); i++){
            tra[(i-this.primerElemT)] = this.todosTrabajos[i];
        }
        this.trabajos = Object.assign([], tra);
    }
    pageEventV(event){
        this.pageSizeV = event.pageSize;
        this.primerElemV = event.pageSize*event.pageIndex;
        var longitud = event.pageSize;
        if(this.primerElemV+longitud >=this.todasCasas.length){
            longitud = this.primerElemV+longitud-this.todasCasas.length
        }
        var viv = new Array(longitud);
        for(let i = this.primerElemV; i<(this.primerElemV+longitud); i++){
            viv[(i-this.primerElemV)] = this.todasCasas[i];
        }
        this.casas = Object.assign([], viv);
    }

}
