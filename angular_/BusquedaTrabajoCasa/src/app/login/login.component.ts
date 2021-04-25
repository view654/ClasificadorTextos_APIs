import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { variablesdeidentificacion} from '../globalUse/variablesIdentificacion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class login implements OnInit {
  public user
  public contr
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  iniciarSesion(): void{
    console.log("user = ", this.user, " contr = ", this.contr)
    this.dataService.log(this.user,this.contr).subscribe(res => {
      console.log(res);
      variablesdeidentificacion.iniciarSesion(res);
    })
  }

}
