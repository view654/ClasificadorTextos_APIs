import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class login implements OnInit {
  public isLogged: boolean = false;
  public user
  public contr
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  iniciarSesion(): void{
    this.dataService.log(this.user,this.contr).subscribe(res => {
      console.log(res);
    })
  }

}
