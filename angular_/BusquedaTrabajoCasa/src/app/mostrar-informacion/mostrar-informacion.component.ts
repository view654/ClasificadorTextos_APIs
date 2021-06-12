import { Component, OnInit, HostListener, AfterViewInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Casa } from '../components/casa_interfaz';
import { Trabajo } from '../components/trabajo_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../components/usuario_interfaz';
import jwt_decode from "jwt-decode";
import { DataService } from '../service/data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MostrarTrabajoComponent} from '../mostrar-trabajo/mostrar-trabajo.component';




@Component({
  selector: 'app-mostrar-informacion',
  templateUrl: './mostrar-informacion.component.html',
  styleUrls: ['./mostrar-informacion.component.css'],
})


export class MostrarInformacionComponent implements OnInit, AfterViewInit, OnChanges {
  favoritos= false;
  user: Usuario;

  public casa_selec: Casa;
  map: mapLeaflet;
  id:string;
  casas: Casa[] = variablesdeidentificacion.casas;
  todasCasas: Casa[]

  relacionados: any[];
  isloged = false;
  screenWidth:number;

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/185/135`);
  images:string[]
  constructor(private ngbCarouselConfig:NgbCarouselConfig,private _Activatedroute:ActivatedRoute, public dialog: MatDialog, private service: DataService,
    public dialogRef: MatDialogRef<MostrarInformacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Casa) {
    console.log(data)
    this.user=Object.assign({},variablesdeidentificacion.user);
    this.defcasa_selec(data["casa_selec"]);
    console.log(this.casa_selec.link);

    this.id = this.casa_selec.link;
    console.log(this.id);

    this.images=this.casa_selec.imagenes.split('\[\'');
    this.images=this.images[1].split('\'\]');
    this.images = this.images[0].split('\', \'');

   }

   defcasa_selec(casa_selecionada:Casa): void{
    this.casa_selec = casa_selecionada;
   }

   ofertasRelacionadas(localidad){
    this.service.filtroGeneral(localidad, 'null', 'null', 'null').subscribe((res:any) => {
      this.relacionados = Object.values(res);
      console.log('this.relacionados: ',this.relacionados)
      //console.log(this.relacionados.slice(0, 3));
    })
  }

  irOferta(){
    let url = this.casa_selec.link
    console.log(url)
    window.open(url);
  }

  ngOnInit(): void {

    var token = localStorage.getItem('token');
    if(token){
      var decoded = jwt_decode(token);
      var id = decoded['user_id'];
      if(id){
        this.existefavoritoVivienda();
        this.isloged = true;
      }else{
        this.isloged = false;
      }
    }
    //console.log('this.images: ',this.images);
    this.ofertasRelacionadas(this.casa_selec.lugar);
    this.screenWidth = window.innerWidth;

}



@HostListener('window:resize', ['$event'])
onResize(event) {

  this.screenWidth = window.innerWidth;
  console.log('this.screenWidth: ',this.screenWidth);

}

  ngAfterViewInit(): void{
    this.map=new mapLeaflet('map_cont_id');
    this.map.update(40.373271,-3.921200,"UEM");
  }
  ngOnChanges(changes:SimpleChanges):void{

  }

  agregarFavoritoVivienda(){
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];

    if(this.favoritos == false){
      this.favoritos= true;
      console.log("Entra función");

      let vivienda_seleccionada = JSON.stringify(this.casa_selec);

      this.service.agregarFavoritoVivienda(id,vivienda_seleccionada).subscribe((res:any) => {
        console.log("Service hecho", vivienda_seleccionada);
      });
    }else{
      this.service.eliminarFavoritoVivienda(id,this.casa_selec).subscribe((res:any) => {
        console.log("Eliminada");
      });
      this.favoritos= false;
    }


  }

  compartir(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    window.alert("Enlace de oferta copiado");
  }

  abrirOferta(trabajo_selec:Trabajo){
    console.log(trabajo_selec.enlace);
    this.dialog.open(MostrarTrabajoComponent,{
        data:{trabajo_selec}
    });
  }

  existefavoritoVivienda(){
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    console.log(this.user);
    this.service.existefavoritoVivienda(id,this.casa_selec).subscribe(res => {
      if(res == null){
        this.favoritos = false;
      }else{
        this.favoritos = true;
      }

      console.log("Al inicio",this.favoritos);
    });
  }

}
