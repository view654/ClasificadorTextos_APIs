import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import {mapLeaflet} from '../globalUse/mapLeaflet'
import { Trabajo } from '../components/trabajo_interfaz';
import { Casa } from '../components/casa_interfaz';
import { ActivatedRoute } from '@angular/router';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { DataService } from '../service/data.service';
import { Usuario } from '../components/usuario_interfaz';
import jwt_decode from "jwt-decode";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Filtro } from '../components/filtro_interfaz';
import { MostrarInformacionComponent } from '../mostrar-informacion/mostrar-informacion.component';


export interface DialogData {
  trabajo_selec: Trabajo;
}
export interface provincia{
  latitud: string
  longitud: string
  nombre: string
  provincia_id: string
}

@Component({
  selector: 'app-mostrar-trabajo',
  templateUrl: './mostrar-trabajo.component.html',
  styleUrls: ['./mostrar-trabajo.component.css']
})

export class MostrarTrabajoComponent implements OnInit, AfterViewInit, OnChanges{

  user: Usuario;
  isloged = false;
  favoritos= false;

  public trabajo_selec: Trabajo;
  map: mapLeaflet;
  id:string;
  trabajos: Trabajo[] = variablesdeidentificacion.trabajos;



  relacionados: any[];

  public arrayProvincias:string[][] = [['A Coruña','Coruña,%20A'],['Albacete','Albacete'],['Alicante','Alicante/Alacant'],['Almería','Almería'],['Álava','Araba/Álava'],
        ['Asturias','Asturias'],['Ávila','Ávila'], ['Badajoz','Badajoz'],['Balears','Balears, Illes'],['Barcelona','Barcelona'],['Bizkaia','Bizkaia'],['Burgos','Burgos'],
        ['Cáceres','Cáceres'], ['Cádiz','Cádiz'],['Cantabria','Cantabria'],['Castellón','Castellón/Castelló'],['Ciudad Real','Ciudad%20Real'],['Córdoba','Córdoba'],
        ['Cuenca','Cuenca'],['Gipuzkoa','Gipuzkoa'],['Girona','Girona'],['Granada','Granada'],['Guadalajara','Guadalajara'],['Huelva','Huelva'],['Huesca','Huesca'],
        ['Jaén','Jaén'],['León','León'],['Lleida','Lleida'],['Lugo','Lugo'],['Madrid','Madrid'],['Málaga','Málaga'],['Murcia','Murcia'],['Navarra','Navarra'],['Ourense','Ourense'],
        ['Palencia','Palencia'],['Las Palmas','Palmas,%20Las'],['Pontevedra','Pontevedra'],['La Rioja','Rioja,%20La'],['Salamanca','Salamanca'],['Santa Cruz de Tenerife','Santa%20Cruz%20de%20Tenerife'],
        ['Segovia','Segovia'],['Sevilla','Sevilla'],['Soria','Soria'],['Tarragona','Tarragona'],['Teruel','Teruel'],['Toledo','Toledo'],['Valencia','Valencia/València'],
        ['Valladolid','Valladolid'],['Zamora','Zamora'],['Zaragoza','Zaragoza'],['Ceuta','Ceuta'],['Melilla','Melilla']];

  /*
  public arrayProvincias:string[][] = [['A Coruña','A%20Coru&ntildea'],['Albacete','Albacete'],['Alicante','Alicante'],['Almería','Almer&iacutea'],['Álava','&Aacutelava'],
        ['Asturias','Asturias'],['Ávila','&Aacutevila'], ['Badajoz','Badajoz'],['Balears','Balears'],['Barcelona','Barcelona'],['Bizkaia'],['Burgos','Burgos'],['Cáceres','C&aacuteceres'],
        ['Cádiz','C&aacutediz'],['Cantabria','Cantabria'],['Castellón','Castell&oacuten'],['Ciudad Real','Ciudad%20Real'],'Córdoba','Cuenca','Gipuzkoa','Girona','Granada','Guadalajara','Huelva','Huesca','Jaén','León','Lleida','Lugo','Madrid',
        'Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria','Tarragona',
        'Teruel','Toledo','Valencia','Valladolid','Zamora','Zaragoza','Ceuta','Melilla'];
  */
  /*
  á -> &aacute;
  é -> &eacute;
  í -> &iacute;
  ó -> &oacute;
  ú -> &uacute;
  ñ -> &ntilde;
  */




  constructor(private _Activatedroute:ActivatedRoute, private service: DataService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<MostrarTrabajoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Trabajo) {
    this.deftrabajo_selec(data["trabajo_selec"]);

    this.id =_Activatedroute.snapshot.paramMap.get('id');

    this.ofertasRelacionadas(this.trabajo_selec.localidad);
    var provincia_ = this.trabajo_selec.localidad;
    var provincia;
    for(var prov in this.arrayProvincias){
      //console.log('this.trabajo_selec.localidad: ',this.trabajo_selec.localidad, ' prov: ',this.arrayProvincias[prov]);
      if(this.trabajo_selec.localidad.includes(this.arrayProvincias[prov][0])){

        provincia = this.arrayProvincias[prov][1];
      }
    }

    //console.log('this.trabajo_selec: ',this.trabajo_selec);
    //console.log(provincia);
    this.service.coordenadas(provincia).subscribe((res:any) => {
      //console.log('this.trabajo_selec: ',this.trabajo_selec);
      //console.log(provincia,': ',res);

      var prov:provincia[];
      prov = Object.values(res) as unknown as provincia[];
      //console.log('Object.values(res): ', Object.values(res));
      //console.log(provincia,': ',prov[0].latitud,', ', prov[0].longitud);
      this.map=new mapLeaflet('map_cont_id');
      this.map.update(parseInt(prov[0].latitud),parseInt(prov[0].longitud),provincia_);

    });
    //this.user=Object.assign({},variablesdeidentificacion.user);
  }


  deftrabajo_selec(trabajo_seleccionada:Trabajo): void{
    this.trabajo_selec = trabajo_seleccionada;
  }

  ofertasRelacionadas(localidad){
    this.service.filtroBusquedaVivienda(localidad, 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null').subscribe((res:any) => {
      this.relacionados = Object.values(res);
    })
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    if(token){
      var decoded = jwt_decode(token);
      var id = decoded['user_id'];
      if(id){
        this.existefavoritoTrabajo();
        this.isloged = true;
      }else{
        this.isloged = false;
      }
    }

  }

  abrirOferta(casa_selec:Casa){
    console.log(casa_selec.link);
    this.dialog.open(MostrarInformacionComponent,{
      data:{casa_selec}
    });
  }

  ngAfterViewInit(): void{
    //this.map=new mapLeaflet('map_cont_id');
    //this.map.update(40.373271,-3.921200,"UEM");
  }
  ngOnChanges(changes:SimpleChanges):void{
  }

  irOferta(){
    let url = this.trabajo_selec.enlace;
    window.open(url);
  }

  agregarFavoritoTrabajo(){
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];

    if(this.favoritos == false){
      this.favoritos= true;
      let trabajo_seleccionado = JSON.stringify(this.trabajo_selec);

      this.service.agregarFavoritoTrabajo(id,trabajo_seleccionado).subscribe((res:any) => {
      });
    }else{
      this.service.eliminarFavoritoTrabajo(id,this.trabajo_selec).subscribe((res:any) => {
      });
      this.favoritos= false;
    }
  }

  existefavoritoTrabajo(){
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var id = decoded['user_id'];
    this.service.existefavoritoTrabajo(id,this.trabajo_selec).subscribe(res => {
      if(res == null){
        this.favoritos = false;
      }else{
        this.favoritos = true;
      }
    });
  }
}
