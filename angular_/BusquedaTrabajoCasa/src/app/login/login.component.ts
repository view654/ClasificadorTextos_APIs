import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import { titlebar } from '../titlebar/titlebar.component';
import { Router, RouterLink } from '@angular/router';
import jwt_decode from "jwt-decode";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  //codigo:string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class login implements OnInit {
  public contrIncorrecta = false;
  codigo:string
  constructor(private dataService:DataService, public router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    

  }

  iniciarSesion(val): void{
    //console.log(new Date().getTime)
    //console.log("user = ", val)
    this.dataService.log(val).subscribe((res:any) => {
      //console.log(res)
      /*this.token = res['token'];*/
      if(res.mensaje=="Login correcto"){
        localStorage.setItem('token', res.data.token) 
        var decoded = jwt_decode(res.data.token);
        //var decodedHeader = jwt_decode(res.data.token, { header: true });
        //console.log(decodedHeader);
        var id = decoded['user_id'];
        this.cargarUsuarios(id);

      }else{
        this.contrIncorrecta = true
      }
    },
    err => console.log(err)
    );
  }
  cargarUsuarios(id){
    this.dataService.getUsuarioByID(id).subscribe((res:any) => {
      //console.log(res)
      variablesdeidentificacion.iniciarSesion(res)
      this.router.navigate(['/titlebar']);
    });    
  }

  sendEmail() {

    //var correo = 'patricia2291997@gmail.com'

    document.body.style.cursor = "progress";
    const dialogRef = this.dialog.open(sendEmail, {
      width: '250px',
      data: {}
      //data: {codigo: this.codigo}
    });
    document.body.style.cursor = "auto";
    dialogRef.afterClosed().subscribe(result => {
      if(result != 'Cancel'){
        this.router.navigate(['/password',result]);
      }
      
    });
  }
}
@Component({
  selector: 'sendEmail',
  templateUrl: 'sendEmail.html',
})
export class sendEmail {
  gotEmail = false;
  email=null;
  contrIncorrecta = false;
  codigo:string;
  codIntroducido:string;
  
  constructor(private dataService:DataService,
    public dialogRef: MatDialogRef<sendEmail>,
    @Inject(MAT_DIALOG_DATA) public cod: DialogData
    ) {
      //this.codigo = JSON.stringify(cod);
      //this.codigo.toString();
      //this.codigo=String(this.codigo);
      /*
      this.codigo=cod.codigo;
      console.log('codigo a introducir:');
      console.log(cod);
      console.log(this.codigo);
      */
 
    }
    sending(){
      try{
        document.body.style.cursor = "progress";
        this.dataService.mostrarUsuarioEmail(this.email).subscribe((res:any) => {
          var datosUs = res;
          console.log('datosUs: ',datosUs);
          //console.log('datosUs: ',datosUs[0]['user_ID']);
          //console.log('datosUs: ',datosUs[0]('user_id'));
          //console.log('datosUs: ',datosUs('user_id'));
          if(datosUs[0] == undefined){
            this.email = null;
            this.contrIncorrecta = true
          }
          if(this.email){
            this.contrIncorrecta = false
            this.dataService.sendCode(this.email).subscribe((res2:any) => {
              this.codigo = res2;
              console.log(this.codigo);
              this.gotEmail = true
              document.body.style.cursor = "auto";
            });
          }
        });
      }catch(e){
        document.body.style.cursor = "auto";
      }
    }

    onComprobarCod(){
      if(this.codigo != this.codIntroducido){
        this.contrIncorrecta = true;
      }else{
        this.dialogRef.close(this.email);
      }

    }

    onNoClick(): void {
      this.dialogRef.close('Cancel');
    }

}

  /*
  getUsuario(){
    let userData:{email:string; _token:string;expirationDate:string;localId:string}=JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    console.log(userData);
  }
  */

  /*
  variablesdeidentificacion.iniciarSesion(res);
  */
