import { Component, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';


const ontario = {
    coords: new Leaflet.LatLng(51.2538, -85.3232),
    zoom:5
};
export class mapLeaflet{
    map: Leaflet.Map;
    popup: Leaflet.Popup;
    constructor(id: string){
        this.map=Leaflet.map(id);
        Leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

        .addTo(this.map);
        this.map.setView(ontario.coords, ontario.zoom);
    }
    
    update(lat:number,lng:number,name:string): void{
        const coords = new Leaflet.LatLng(lat,lng);
        this.map.setView(coords,14);

        if(this.popup){
            this.popup.setLatLng(coords);
            this.popup.setContent(name);
        }else{
            this.popup = Leaflet
                .popup({
                    closeButton: false,
                    closeOnEscapeKey: false,
                    closeOnClick: false
            })
            .setLatLng(coords)
            .setContent(name)
            .openOn(this.map);
        }
    }
    

}
