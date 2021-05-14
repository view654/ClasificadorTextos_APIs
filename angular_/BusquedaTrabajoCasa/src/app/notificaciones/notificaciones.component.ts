import { Component, ContentChild, OnInit } from '@angular/core';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']

})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notification[]
  constructor() { }

  ngOnInit(): void {

  }

}
