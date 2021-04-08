import { Component, OnInit } from '@angular/core';
import { Usuario } from '../components/usuario_interfaz';
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class perfil {
  title = 'Perfil';
  user: Usuario;
  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.rutaActiva.snapshot.params.user
  }
}
