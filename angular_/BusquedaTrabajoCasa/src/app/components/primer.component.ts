import { Component } from '@angular/core';
import {variablesdeidentificacion} from '../globalUse/variablesidentificacion';
import { Casa } from '../components/casa_interfaz';


@Component({
    selector: 'primer',
    templateUrl:'./primer.component.html',
    styleUrls: ['./primer.component.css']

})

export class primer{
    
    public isSearch: boolean = false;

    public busqueda: string;
    public trabajo: 'trabajo' | 'vivienda' = 'trabajo';
    public parametro: number;

    casas: Casa[] = variablesdeidentificacion.casas;

    constructor(){
        console.log("Componente primer cargado!!");        
    }

}