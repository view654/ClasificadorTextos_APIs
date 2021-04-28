import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router, RouterLink } from '@angular/router';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService:DataService, public router:Router) { }

  ngOnInit(): void {
  }

  registro(val): void{
    this.dataService.log(val).subscribe((res:any) =>{

    },
    err => console.log(err)
    );
  }


}
