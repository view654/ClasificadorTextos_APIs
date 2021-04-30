import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService:DataService, public router:Router) { }

  ngOnInit(): void {
  }

  registro(val): void {
    val.fecha_nacimiento.applyPattern("yyyy-MM-dd");
    if(this.datosOK(val)){
      this.dataService.registro(val).subscribe((res:any) =>{
        this.router.navigate(['/titlebar']);
      },
      err => console.log(err)
      );
    }

  }

  datosOK(val): boolean{

    return true;
  }
  

}
