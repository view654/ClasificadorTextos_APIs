import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router, RouterLink } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService:DataService, public router:Router) { }
  contrIncorrecta=""
  ngOnInit(): void {
  }

  registro(val): void {

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    val.fecha_nacimiento = formatDate(val.fecha_nacimiento, format, locale);

    if(this.datosOK(val)){
      this.dataService.registro(val).subscribe((res:any) =>{
        this.router.navigate(['/titlebar']);
      },
      err => console.log(err)
      );
    }

  }
  cumpleSeg(contra){
    if(contra.length < 4){
      this.contrIncorrecta="Contraseña debe tener un minimo 4 caracteres";
    }else{
      if(!((/\d/.test(contra))&&!(/^\d+$/.test(contra))&&!(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(contra)))){
        this.contrIncorrecta="La contraseña debe incluir numeros y letras. No se permiten caracteres especiales.";
      }
    }
  }
  datosOK(val): boolean{

    return true;
  }
  

}
