import { Component } from '@angular/core';


@Component({
    selector: 'primer',
    templateUrl:'./primer.component.html',
    styleUrls: ['./primer.component.css']

})

export class primer{
    public isLogged: boolean = false;
    public isSearch: boolean = false;

    public busqueda: string;
    public trabajo: boolean = true;
    public parametro: number;


    constructor(){
        console.log("Componente primer cargado!!");
        
    }

}