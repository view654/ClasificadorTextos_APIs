import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';
import { titlebar } from '../titlebar/titlebar.component';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class login implements OnInit {
  public contrIncorrecta = false;
  constructor(private dataService:DataService, public router:Router) { }

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
        this.cargarUsuarios()

      }else{
        this.contrIncorrecta = true
      }
    },
    err => console.log(err)
    );
  }
  cargarUsuarios(){
    this.dataService.getUsuarios().subscribe((res:any) => {
      //console.log(res)
      variablesdeidentificacion.iniciarSesion(res[2])
      this.router.navigate(['/titlebar']);
    });

    
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
}
