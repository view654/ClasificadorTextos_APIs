import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class password implements OnInit {
  public contrIncorrecta = "";
  email = null;
  id = null;

  constructor(public router:Router,private dataService:DataService,private _Activatedroute:ActivatedRoute) {
    this.email =_Activatedroute.snapshot.paramMap.get('correo');
    this.dataService.sendCode(this.email).subscribe((res2:any) => {
      console.log(res2);
      this.id = res2;
      
    });
   }

  ngOnInit(): void {
  }
  cambiarContra(val){
    if(val.contra1!=val.contra2){
      this.contrIncorrecta="Contraseñas no coinciden";
    }else{
      this.cumpleSeg(val.contra1);
    }
  }
  cumpleSeg(contra){
    //this.contrIncorrecta =!(/\d/.test(contra));
    if(contra.length < 4){
      this.contrIncorrecta="Contraseña debe tener un minimo 4 caracteres";
    }else{
      if(!((/\d/.test(contra))&&!(/^\d+$/.test(contra))&&!(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(contra)))){
        this.contrIncorrecta="La contraseña debe incluir numeros y letras. No se permiten caracteres especiales.";
      }else{
        this.dataService.modificarContrasena(this.id,contra).subscribe(result => {
          this.router.navigate(['/login']);
        });
        
      }
    }
  }

}
